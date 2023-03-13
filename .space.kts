job("Build PyCharm Guide") {
    compileAndDeployToSpace("pycharm", "PyCharm Guide", "pycharm-guide")
}

job("Build WebStorm Guide") {
    compileAndDeployToSpace("webstorm", "WebStorm Guide", "webstorm-guide")
}

job("Cleanup obsolete Space Hosting") {
    startOn {
        gitPush { enabled = false }
        gitBranchDeleted { enabled = true }
        codeReviewClosed { enabled = true }
    }

    container(image = "amazoncorretto:17", displayName = "Remove site") {
        resources {
            cpu = 2.cpu
            memory = 8.gb
        }

        kotlinScript { api ->
            val gitBranch = api.gitBranch()
            if (gitBranch.startsWith("refs/heads/") && !gitBranch.startsWith("refs/heads/main")) {
                val cleanGitBranch = gitBranch.replace("refs/heads/", "").replace("/", "-")
                val siteName = "preview-$siteShortName-$cleanGitBranch"

                api.space().experimentalApi.hosting.deleteSite(
                    siteName = siteName
                )
            }
        }
    }
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

fun Job.compileAndDeployToSpace(siteShortName: String, siteLongName: String, siteDirectory: String) {
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
                val cleanGitBranch = gitBranch.replace("refs/heads/", "").replace("/", "-")
                val siteName = "preview-" + if (cleanGitBranch == "main") {
                    siteShortName
                } else {
                    "$siteShortName-$cleanGitBranch"
                }

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