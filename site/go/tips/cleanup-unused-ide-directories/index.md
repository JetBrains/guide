---
date: 2025-05-05
title: Cleanup Unused IDE Directories
topics:
  - platform
author: dlsniper
subtitle: >-
  If you stopped using an older version of the IDE, it's the right time to do some cleanup.
thumbnail: ./thumbnail.png
video: "./tip.webm"
---

Whenever you upgrade your IDE to a new major version, it leaves behind all its configuration, caches, logs, and other directories so you can return to it any time you want. However, you might not want to keep those old caches or logs for too long, as they can slowly add up. Don't worry, the IDE will help you do all the cleanup.

The IDE will automatically clean up any cache and log directories that were last updated more than 180 days ago. To trigger this process manually, go to _Help | Delete Leftover IDE Directories..._.

**Note:** The system settings and plugins directories will stay intact.
