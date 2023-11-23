---
date: 2023-11-22
title: Improve Code Readability and Navigation
topics:
  - customizing
  - editing
  - go
  - settings
author: ap
subtitle: Discover how to manage code visibility with code folding in Go
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
---

Try a code folding feature to enhance the readability and navigability of your Go code. This feature is especially useful for managing large codebases and focusing on the overall structure of your code.

**Target Code Blocks for Folding:**

- One-line `if` blocks with a single `return`
- One-line `if` blocks with a single `panic`
- One-line `if` blocks for error handling
- One-line functions with a single `return`
- One-line `case` clauses
- Formatted strings

**How to use:**

To fold or unfold a code block, simply click on the fold marker next to the line number or use a keyboard shortcut. For Windows/Linux, press `Ctrl` + `-` to fold and `Ctrl` + `+` to unfold. On macOS, use `⌘` + `-` to fold and `⌘` + `+` to unfold. Hovering over a folded code block will display a tooltip with a preview of the hidden content. This feature can be customized in settings to choose which types of blocks are foldable according to user preference.

<img src="screenshot.png" alt="Alt text for screenshot" title="Title of the image" width="706"/>

<span class="tag is-rounded">New in 2023.3</span>
