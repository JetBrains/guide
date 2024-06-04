---
type: TutorialStep
date: 2021-04-09
title: "Elevate to Production Standards"
topics:
  - django
  - python
author: mm
subtitle: ""
thumbnail: thumbnail.png
---

> From this section onwards, the code is pushed into the production [branch](https://github.com/mukulmantosh/dockerizing_django/tree/production).

## Gunicorn

For a production environment, it's advisable to use a production-grade WSGI server like [Gunicorn](https://gunicorn.org/), as Django's default server is not suitable for production settings.

Moreover, it's advisable to integrate Nginx as a reverse proxy for Gunicorn, which will also manage the serving of static files.

Open _Python Packages Tool → Window View | Tool Windows | Python Packages_ and install “gunicorn”

![step1](./images/gunicorn.png)

Make sure to add gunicorn to requirements.txt

## Environment Variables

Ensure that secret information is passed via environment variables rather than hardcoding it, to avoid compromising security.

![step2](./images/22.png)

Create a `.env` file and add the following information, make sure you don’t commit this file into git.

![step3](./images/23.png)

Next, update the docker compose file and run it to check everything is working fine as expected.

![step4](./images/24.png)

Cool! Everything seems to be working fine, without any hiccups.

![step5](./images/25.png)

## PostgreSQL

Install psycopg2 binary. After installation make sure to update the `requirements.txt` file

Before proceeding, make sure you have installed the `libpq` driver in your machine.

References:

- [https://formulae.brew.sh/formula/libpq](https://formulae.brew.sh/formula/libpq)
- [https://www.postgresql.org/docs/16/libpq.html](https://www.postgresql.org/docs/16/libpq.html)

```bash
pip install psycopg2-binary
```

Next, navigate to the `DATABASES` section in `settings.py` and modify the configuration to receive data from environment variables.

![step6](./images/26.png)

Next, create a `db.env` file which contains environment variables for the postgres container.

![step7](./images/27.png)

Update the `.env` file with postgres environment variables.

![step7](./images/28.png)

Update the compose.yaml file with the postgres configuration.

![step8](./images/29.png)

Also, make sure to add this line in your Dockerfile

```bash
RUN apt-get update && apt-get install -y libpq-dev
```

![step9](./images/30.png)

Once done, run the docker compose.
