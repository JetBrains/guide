job("Build PyCharm Guide") {
    runJobForSite("pycharm", "PyCharm Guide", "pycharm-guide")
}

job("Build WebStorm Guide") {
    runJobForSite("webstorm", "WebStorm Guide", "webstorm-guide")
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
            val cleanGitBranch = gitBranch.replace("refs/heads/", "").replace("/", "-")
            val siteName = if (cleanGitBranch == "main") {
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