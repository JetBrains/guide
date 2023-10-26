---
date: 2021-07-29
title: Connect from the IDE to a MongoDB database
topics:
  - databases
  - mongodb
author: dlsniper
subtitle: >-
  Gain access to the database from the IDE and do all the work in the same
  window.
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
video: "https://youtu.be/ZdaWB9C4UdU?list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW"
obsoletes:
  - /goland/tips/mongodb-connect-from-ide
---

To connect to a MongoDB database, head over to the _Database_ tool window on the the right side of the IDE and click on the **+** (_New_) button. Select _Data Source_ then _MongoDB_ as the data source type. Customize the name of the data source, connection details, then click on the _Test_ link to ensure everything is ok.

Once everything is done, a _Console_ tab will appear and you can now query the database from the IDE. You can also explore it from the _Database_ tool window, and select which parts to hide or show from it.

**Note:** You may need to download a database driver for the IDE first. If you see a _Download driver_ link, you'll need to click on that before you can connect to the database.
