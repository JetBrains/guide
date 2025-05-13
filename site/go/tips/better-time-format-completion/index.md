---
date: 2025-05-13
title: Better Time Format in Completion
topics:
  - completion
  - editing
  - go
author: dlsniper
subtitle: >-
  Use the commonly known date/time formatting strings while writing time formatting in Go.
thumbnail: ./thumbnail.png
video: "./time_parse.webm"
---

It's no secret that Go uses different references for formatting date/time. When coming from other programming languages, you may try to use _YYYY_ instead of Go's _2006_ string to format the year. This is where GoLand can help you by suggesting the common date/time formats, such as _YYYY_ or _DD_ and converting them to Go's formatting directives.

Start typing any common date/time formatting strings, such as _YYYY_ or _DD_ and the IDE will convert them automatically. You can also use other identifiers, such as _year_ or _day_, to activate this feature. This works for both `time.Time.Format` and `time.Parse` functions.
