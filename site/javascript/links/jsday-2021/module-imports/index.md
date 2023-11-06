---
date: 2023-10-03
title: Documentation Playgrounds With Module Imports Support
author: pwe
subtitle: Andrey Grandilevskiy
thumbnail: ./thumbnail.png
video: "https://www.youtube.com/watch?v=7X8uLQZUzu0"
linkURL: "https://www.youtube.com/watch?v=7X8uLQZUzu0"
---

It is impossible to develop the UI-library on React and its documentation without usage examples with source code. Even
better if this code can be changed in-place and look at the component in the different situations - change the values,
props, the surrounding layout. And it looks easy - there are ready-to-use libraries for such playgrounds. But the
difficulties arise when the examples should support the imports of external dependencies. In this talk, we’ll explain
how we implemented the live code-sandboxes inside markdown content with supporting imports for our new RescUI library.

### Outline

- 00:00 Introduction
- 05:05 Plan overview
- 06:10 Parsing Markdown and examples
- 07:12 Extracting dependencies
- 09:31 Resolving dependencies
- 12:38 Frontend part
- 13:08 Demo
- 15:46 Brief summary
- 16:33 Limitations
- 17:05 Conclusion

### About the Presenter

Andrey Grandilevskiy, Frontend Developer at JetBrains
