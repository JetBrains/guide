import java.io.File

val nodeJsContainerImage = "node:18-bullseye"
val jdkContainerImage = "amazoncorretto:17"

job("Build .NET Guide") {
    runJobForSite("dotnet", ".NET Tools Guide", "dotnet-guide", "dotnet")
}

job("Build IntelliJ Guide") {
    runJobForSite("intellij", "IntelliJ Guide", "intellij-guide", "idea")
}

job("Build GoLand Guide") {
    runJobForSite("goland", "GoLand Guide", "goland-guide", "go")
}

job("Build PyCharm Guide") {
    runJobForSite("pycharm", "PyCharm Guide", "pycharm-guide", "pycharm")
}

job("Build WebStorm Guide") {
    runJobForSite("webstorm", "WebStorm Guide", "webstorm-guide", "webstorm")
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

        host {
            dockerBuildPush {
                context = "."
                file = ".devcontainer/Dockerfile"
                labels["vendor"] = "JetBrains"
                tags {
                    +"registry.jetbrains.team/p/jetbrains-guide/guide-containers/guide-devcontainer-ws:latest"
                }
            }
        }
    }
}

fun Job.runJobForSite(siteShortName: String, siteLongName: String, siteDirectory: String, siteWebPath: String) {
    startOn {
        gitPush {
            enabled = true

            branchFilter {
                -"refs/merge/*"
                -"refs/pull/*"
            }
            
            pathFilter {
                +"sites/$siteDirectory/**"
                +"_includes/**"
                +"src/**"
                +"public/assets/**"
                +"package.json"
                +"package-lock.json"
            }
        }
    }

    parallel {
        runTests()
        buildSite(siteShortName, siteDirectory, siteWebPath)
    }
    deploySite(siteShortName, siteLongName, siteDirectory, siteWebPath)
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

fun StepsScope.buildSite(siteShortName: String, siteDirectory: String, siteWebPath: String) {
    container(image = nodeJsContainerImage, displayName = "Build site") {
        resources {
            cpu = 4.cpu
            memory = 8.gb
        }

        cache {
            storeKey = "assets-$siteDirectory"
            localPath = "sites/$siteDirectory/_site/assets/"
        }

        shellScript {
            content = """
                ## Capture working directory
                cwd=${'$'}(pwd)

                ## Fix permissions on cached assets
                chmod 0666 -R sites/$siteDirectory/_site/assets/

                ## Build site
                npm install
                npm run build:$siteShortName
                cd ${'$'}cwd

                ## Move site to share
                mkdir -p /mnt/space/share/_site/$siteWebPath
                cp -r sites/$siteDirectory/_site/ /mnt/space/share/_site/$siteWebPath
                mv /mnt/space/share/_site/$siteWebPath/_site /mnt/space/share/_site/$siteWebPath/guide
            """.trimIndent()
        }
    }
}

fun StepsScope.deploySite(siteShortName: String, siteLongName: String, siteDirectory: String, siteWebPath: String) {
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
                    siteShortName
                } else {
                    "$siteShortName-$cleanGitBranch"
                }

                File("/mnt/space/share/_site/index.html")
                        .writeText("<html><body><a href=\"/$siteWebPath/guide\">$siteLongName</a></body></html>")

                api.space().experimentalApi.hosting.publishSite(
                        siteSource = "_site",
                        siteName = siteName,
                        siteSettings = HostingSiteSettings(
                                public = true,
                                labels = listOf(siteShortName, cleanGitBranch),
                                description = siteLongName
                        )
                )
            }
        }
    }
}