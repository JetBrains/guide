job("Build PyCharm Guide") {
    runJobForSite("pycharm", "PyCharm Guide", "pycharm-guide")
}

job("Build WebStorm Guide") {
    runJobForSite("webstorm", "WebStorm Guide", "webstorm-guide")
}

job("Remote development images") {
    startOn {
        gitPush {
            enabled = true

            branchFilter {
                +"refs/heads/main"
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

fun Job.runJobForSite(siteShortName: String, siteLongName: String, siteDirectory: String) {
    startOn {
        gitPush {
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

    container(image = "node:18-bullseye", displayName = "Build site") {
        resources {
            cpu = 2.cpu
            memory = 4.gb
        }

        shellScript {
            content = """
                ## Build site
                npm install
                npm run build:$siteShortName

                ## Copy site to share
                mkdir -p /mnt/space/share/_site/$siteShortName
                cp -r sites/$siteDirectory/_site/ /mnt/space/share/_site/$siteShortName
                mv /mnt/space/share/_site/$siteShortName/_site /mnt/space/share/_site/$siteShortName/guide
            """.trimIndent()
        }
    }

    container(image = "amazoncorretto:17", displayName = "Publish site") {
        resources {
            cpu = 2.cpu
            memory = 8.gb
        }

        kotlinScript { api ->
            val gitBranch = api.gitBranch()
            if (gitBranch.startsWith("refs/heads/")) {
                val cleanGitBranch = gitBranch.replace("refs/heads/", "").replace("/", "-").replace("_", "-")
                val siteName = "preview-" + if (cleanGitBranch == "main") {
                    siteShortName
                } else {
                    "$siteShortName-$cleanGitBranch"
                }

                java.io.File("/mnt/space/share/_site/index.html")
                	.writeText("<html><body><a href=\"/$siteShortName/guide\">$siteLongName</a></body></html>")

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