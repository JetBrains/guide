---
date: 2023-01-16
title: Connect to a postgreSQL database
topics:
  - databases
  - postgreSQL
author: vb
subtitle: Access a postgreSQL database from your JetBrains IDE and do the work in the same window.
thumbnail: ./thumbnail.png
seealso:
  - title: IntelliJ IDEA - Database Tool Window
    href: "https://www.jetbrains.com/help/idea/database-tool-window.html"
video: "https://youtu.be/k2aEBenPTnM"
obsoletes:
  - /java/tips/postgres-connect-from-ide
---

Use <kbd>⇧⇧</kbd> (macOS) / <kbd>Shift+Shift</kbd> (Windows/Linux), to bring up the Search Everywhere dialog. You can now search for _Database_ to open the **Database** tool window which helps you to connect to multiple databases and DDL data sources.

You click on the **+** (macOS) / **New** (Windows/Linux). Select _Data Source_ then _Postgres_ as the data source type. Customize the name of the data source, connection details, then click on the **Test** link to ensure everything is ok.

Once everything is done, a _Console_ tab will appear and you can now query the database from the IDE. You can also explore it from the _Database_ tool window, and select which parts to hide or show from it.

**Note:** You may need to download a database driver for the IDE first. If you see a **Download driver** link, you'll need to click on that before you can connect to the database.

Alternately, you can open _Database_ tool window from the Sidebar of the IDE:

![Open Database Tool Window from Sidebar](database-tool-from-sidebar.png)
