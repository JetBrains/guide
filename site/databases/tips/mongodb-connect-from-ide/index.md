---
date: 2025-05-05
title: Connect to a MongoDB database
topics:
  - databases
  - mongodb
author: dlsniper
subtitle: Access a MongoDB database from your JetBrains IDE and do the work in the same window.
thumbnail: ./thumbnail.png
video: "./tip.webm"
obsoletes:
  - /go/tips/mongodb-connect-from-ide
---

To connect to a MongoDB database, head over to the _Database_ tool window on the right side of the IDE and click **+** (macOS) / **New** (Windows/Linux). Select _Data Source_ then _MongoDB_ as the data source type. Customize the name of the data source, connection details, then click on the _Test_ link to ensure everything is ok.

Once everything is done, a _Console_ tab will appear, and you can now query the database from the IDE. You can also explore it from the _Database_ tool window, and select which parts to hide or show from it.

**Note:** You may need to download a database driver for the IDE first. If you see a **Download driver** link, you'll need to click on that before you can connect to the database.
