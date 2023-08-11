---
date: 2020-02-27
title: Occurrence Selection
topics:
  - .net
  - editing
  - rider
author: matkoch
subtitle: Poor man’s manipulation to the rescue!
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
animatedGif:
  file: ./guide.webm
  width: 500
  height: 262
leadin: "**Where we go, we don’t need _Find & Replace_!** \U0001F6F9⚡️\n\nUsing actions for occurrence selection is a powerful way to transform and manipulate all kinds of texts. We start by making a selection for our text. With every call to `Add Selection for Next Occurrence` we get another multicaret that can be moved around, insert and delete text, expand or shrink its individual selection, or toggle the casing of its text. This is exactly what we need if we have to fix only a couple of similar invocations or change the format of our data! \U0001F3AD\U0001F4D0\n\nRemember to always use meaningful names! \U0001F3F7\nInvoking `Unselect Occurrence` removes the previously added selection; `Select All Occurrences` scans the whole document for occurrences and selects them.\n\nBut remember: always give refactorings a try first! \U0001F527\U0001F913\n\n### See Also\n- https://www.jetbrains.com/help/rider/Multicursor.html\n- https://www.jetbrains.com/help/rider/Toggling_Case.html\n"
---

