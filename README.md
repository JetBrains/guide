[![official project](https://jb.gg/badges/official-flat-square.svg)](https://github.com/JetBrains)

# JetBrains Guide

The JetBrains Guide is a collection of resources for learning JetBrains IDEs.

## Technology

- Content is created as Markdown files.
- It's rendered to a static site using Eleventy.
- All is available as open source.

## Contributing

Want to create content? Awesome! We like content. In this section, we'll cover some of the practical details involved.

### Installation and Running the Guide

Here's what you need to get started:

- Make sure you have installed NodeJS 18.\*
- Clone this repository
  - As a JetBrains employee, clone from Space and [enjoy some additional infrastructure](https://jetbrains.team/p/jetbrains-guide/documents/Docs/a/Contributing-on-Space).
  - As an external contributor, clone from GitHub.
- Work on a branch that you create based on `main`
- Open it with any JetBrains IDE (we tested with [WebStorm](https://www.jetbrains.com/webstorm/) and [Fleet](https://www.jetbrains.com/fleet/))
- Run an `npm install` to ensure all dependencies are available on your machine
- Run the `Run Guide` run configuration to launch the Guide (top toolbar, see [web help for more info](https://www.jetbrains.com/help/webstorm/running-applications.html))
- Wait until the application is up and running
- Connect the browser to `http://localhost:8080/`
- Start authoring (content is located in [`site/`](site/)), and see reloads in the browser

### Create a pull request

Changes ready? Great! Ideally, you have been working on a separate branch (from `main`), and you can send your changes as a pull request.

Make sure to add some JetBrains folks like @paulweveritt @khalidabuhakmeh @maartenba as reviewers, so we can work on getting your content ready to go!

## License

The content of this repository are under two licenses. The software is covered by
the Apache 2 license and the content is covered by the Creative Common license.
See the [LICENSE.txt](LICENSE.txt) file for the detail.

When non-JetBrains contributor join, they needed to acknowledge consent by
adding a comment on [the ticket](https://github.com/JetBrains/guide/issues/7) in the repository.
