import java.io.File

val nodeJsContainerImage = "node:18-alpine"
val jdkContainerImage = "amazoncorretto:17"

job("Build Guide") {
    startOn {
        gitPush {
            enabled = true

            anyRefMatching {
                +"refs/heads/*"
                -"refs/deploys/*"
                -"refs/merge/*"
                -"refs/pull/*"
            }
            
            pathFilter {
                +"site/**"
                +"_includes/**"
                +"src/**"
                +"public/assets/**"
                +"package.json"
                +"package-lock.json"
            }
        }
    }
    
    buildAndDeployStaging()
}

job("Build Guide (Docker)") {
    startOn {
        gitPush {
            enabled = false
        }
    }

    buildSiteDockerImage("Dockerfile",
        imageName = "registry.jetbrains.team/p/jetbrains-guide/guide-containers/guide-dev-nginx",
        copySiteFromShare = false,
        pushToRegistry = false)
}

job("Run lint") {
    startOn {
        gitPush {
            enabled = true

            anyRefMatching {
                +"refs/heads/*"
                -"refs/deploys/*"
                -"refs/merge/*"
                -"refs/pull/*"
            }
        }
    }

    runLint()
}

job("Run tests") {
    startOn {
        gitPush {
            enabled = true

            anyRefMatching {
                +"refs/heads/*"
                -"refs/deploys/*"
                -"refs/merge/*"
                -"refs/pull/*"
            }
        }
    }

    runTests()
}

job("Run link checker") {
    startOn {
        gitPush {
            enabled = false
        }

        schedule {
            cron("0 13 * * 1")
        }
    }

    failOn {
        timeOut {
            runningTimeOutInMinutes = 45
        }
    }

    runLinkChecker("https://www.jetbrains.com/dotnet/guide/ https://www.jetbrains.com/go/guide/ https://www.jetbrains.com/idea/guide/ https://www.jetbrains.com/pycharm/guide/ https://www.jetbrains.com/webstorm/guide/")
}

job("Remote development images") {
    startOn {
        gitPush {
            enabled = true

            anyRefMatching {
                +"refs/heads/main"
                -"refs/deploys/*"
                -"refs/merge/*"
                -"refs/pull/*"
            }

            pathFilter {
                +".space/*.devfile.yml"
                +".space/webstorm/Dockerfile"
                +".space/fleet/Dockerfile"
            }
        }
    }

    parallel {
        host {
            dockerBuildPush {
                context = "."
                file = ".space/webstorm/Dockerfile"
                labels["vendor"] = "JetBrains"
                tags {
                    +"registry.jetbrains.team/p/jetbrains-guide/guide-containers/guide-rd-ws:latest"
                }
            }
        }

        host {
            dockerBuildPush {
                context = "."
                file = ".space/fleet/Dockerfile"
                labels["vendor"] = "JetBrains"
                tags {
                    +"registry.jetbrains.team/p/jetbrains-guide/guide-containers/guide-rd-fleet:latest"
                }
            }
        }
    }
}

fun Job.buildAndDeployStaging() {
    parallel {
        runLint()
        runTests()
        buildSite()
    }
    parallel {
        deploySite()
    }
}

fun StepsScope.runLinkChecker(targetUrl: String) {
    container(image = nodeJsContainerImage, displayName = "Run link checker - $targetUrl") {
        resources {
            cpu = 4.cpu
            memory = 4.gb
        }

        shellScript {
            content = """
            ## Run tests
            npm install
            npm run broken-link-checker $targetUrl
            """.trimIndent()
        }
    }
}

fun StepsScope.runTests() {
    container(image = nodeJsContainerImage, displayName = "Run tests") {
        resources {
            cpu = 4.cpu
            memory = 4.gb
        }

        shellScript {
            content = """
                ## Run tests
                npm install
                npm run test
            """.trimIndent()
        }
    }
}

fun StepsScope.runLint() {
    container(image = nodeJsContainerImage, displayName = "Run lint") {
        resources {
            cpu = 4.cpu
            memory = 4.gb
        }

        shellScript {
            content = """
                ## Run linting
                npm install
                npm run lint
            """.trimIndent()
        }
    }
}

fun StepsScope.buildSite() {
    container(image = nodeJsContainerImage, displayName = "Build site") {
        resources {
            cpu = 4.cpu
            memory = 8.gb
        }

        cache {
            storeKey = "guide-assets-cache"
            localPath = ".assets-cache/"
        }

        shellScript {
            content = """
                ## Capture working directory
                cwd=${'$'}(pwd)

                ## Fix permissions on cached assets
                chmod 0666 -R .assets-cache/

                ## Build site
                npm install
                npm run build
                cd ${'$'}cwd

                ## Move site to share
                rm -rf _site/.assets-cache/
                mkdir -p ${'$'}JB_SPACE_FILE_SHARE_PATH/_site
                cp -r _site/ ${'$'}JB_SPACE_FILE_SHARE_PATH/_site
                mv ${'$'}JB_SPACE_FILE_SHARE_PATH/_site/_site ${'$'}JB_SPACE_FILE_SHARE_PATH/_site/guide
            """.trimIndent()
        }
    }
}

fun StepsScope.deploySite() {
    container(image = jdkContainerImage, displayName = "Publish site") {
        resources {
            cpu = 2.cpu
            memory = 8.gb
        }

        env["SPACE_AUTOMATION_SCRIPT_RUNNER_OPTS"] = "-Xms512m -Xmx7192m"

        kotlinScript { api ->
            val gitBranch = api.gitBranch()
            if (gitBranch.startsWith("refs/heads/")) {
                val cleanGitBranch = gitBranch.replace("refs/heads/", "").replace("/", "-").replace("_", "-")
                val siteName = if (cleanGitBranch == "main") {
                    "unified"
                } else {
                    "unified-$cleanGitBranch"
                }

                File("/mnt/space/share/_site/index.html")
                    .writeText("<html><body><a href=\"/guide\">Explore JetBrains Guides</a></body></html>")

                api.space().experimentalApi.hosting.publishSite(
                        siteSource = "_site",
                        siteName = siteName,
                        siteSettings = HostingSiteSettings(
                                public = true,
                                labels = listOf("unified", cleanGitBranch),
                                description = "JetBrains Guide"
                        )
                )
            }
        }
    }
}

fun StepsScope.buildSiteDockerImage(dockerfile: String, imageName: String, copySiteFromShare: Boolean, pushToRegistry: Boolean) {
    host(displayName = "Build application container") {
        if (copySiteFromShare) {
          	shellScript {
                content = """
                     ## Copy site from share
                     mkdir -p _site
                     cp -r ${'$'}JB_SPACE_FILE_SHARE_PATH/_site/ ./
                """
        	}
        }

        dockerBuildPush {
            push = pushToRegistry
            context = "."
            file = dockerfile
            labels["vendor"] = "JetBrains"

            tags {
                +"$imageName:0.0.${"$"}JB_SPACE_EXECUTION_NUMBER"
                +"$imageName:latest"
            }
        }
    }
}