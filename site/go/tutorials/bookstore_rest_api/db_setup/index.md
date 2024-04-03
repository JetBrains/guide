---
type: TutorialStep
date: 2024-03-20
title: "Database Setup"
topics:
  - go
  - web
author: mm
subtitle: "Configuring Your PostgreSQL Database"
thumbnail: ./thumbnail.png
---

## PostgreSQL

For this tutorial, I will be using postgres as my preferred database.
I will use Docker Desktop to spin up a container, which will be quite easy and straightforward.

Open Terminal, and type the following command.

```bash
docker run --name bookstore -p 5432:5432 -e POSTGRES_PASSWORD=******** -d postgres
```

Or you can directly search for the postgres image in Docker Desktop.

![docker1](./images/docker1.png)

Once the database is up and running, you will see it appearing in the list of containers.

![docker2](./images/docker2.png)
