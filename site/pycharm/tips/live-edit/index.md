---
date: 2018-11-07
title: LiveEdit HTML and CSS
topics:
  - editing
author: pwe
subtitle: >-
  With the LiveEdit plugin, open HTML and CSS in Chrome, over HTTP, and see
  updates as you save.
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: 'https://youtu.be/xf90Ko64hRc'
---

PyCharm Professional bundles WebStorm and, with the optional LiveEdit plugin,
makes it easy to see HTML and CSS updates as you save them.

One you install the LiveEdit plugin, go to an HTML file and create a Debug
configuration. You can do this with a right-click. This opens a private
Chrome session with the flag to turn on Chrome's DevTools protocol. This lets
PyCharm Professional "remote control" the browser, using an actual HTTP
URL.

As you type and save HTML and CSS, you'll see the changes in the browser.

In previous versions, PyCharm needed a special extension in Chrome to allow
this remote-control feature. That's no longer true.
