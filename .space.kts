import java.io.File

val nodeJsContainerImage = "node:18-bullseye"
val jdkContainerImage = "amazoncorretto:17"

job("Build Guide") {
    buildAndDeployStaging()
}

job("Run lint") {
    startOn {
        gitPush {
            enabled = true

            branchFilter {
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

            branchFilter {
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

            branchFilter {
                +"refs/heads/main"
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
    startOn {
        gitPush {
            enabled = true

            branchFilter {
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

    parallel {
        runLint()
        runTests()
        buildSite()
    }
    deploySite()
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
                cp -r _site/ /mnt/space/share
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

        kotlinScript { api ->
            val gitBranch = api.gitBranch()
            if (gitBranch.startsWith("refs/heads/")) {
                val cleanGitBranch = gitBranch.replace("refs/heads/", "").replace("/", "-").replace("_", "-")
                val siteName = if (cleanGitBranch == "main") {
                    "unified"
                } else {
                    "unified-$cleanGitBranch"
                }

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