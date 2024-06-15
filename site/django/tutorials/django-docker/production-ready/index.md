---
type: TutorialStep
date: 2024-06-07
title: "Making your deployment production-ready"
topics:
  - docker
  - django
author: mm
subtitle: Additional tools for your Django app production environment.
thumbnail: thumbnail.png
---

> From this section onwards, the code is pushed into the production [branch](https://github.com/mukulmantosh/dockerizing_django/tree/production).

## Gunicorn

For a production environment, it's advisable to use a production-grade WSGI server like [Gunicorn](https://gunicorn.org/), as Django's default server is not suitable for production settings.

Moreover, it's advisable to integrate Nginx as a reverse proxy for Gunicorn, which will also manage the serving of static files.

Open _Python Packages Tool → Window View | Tool Windows | Python Packages_ and install “gunicorn”

![step1](./images/gunicorn.png)

Make sure to add `gunicorn` to `requirements.txt`.

## Environment Variables

Ensure that secret information is passed via environment variables rather than hardcoding it, to avoid compromising security.

![step2](./images/22.png)

Create a `.env` file and add the following information, make sure you don’t commit this file into git.

![step3](./images/23.png)

Next, update the Docker Compose file and run it to check everything is working fine as expected.

On line 5, I included `dockerfile: Dockerfile`. This indicates the specific Dockerfile to build the image. In this scenario, it's titled "Dockerfile" and resides in the same directory. Although not mandatory, if you are using a different name for the Dockerfile, then you must specify it.

![step4](./images/24.png)

Cool! Everything seems to be working fine, without any hiccups.

![step5](./images/25.png)

## PostgreSQL

When considering setting something up in production, we undoubtedly prioritize employing a robust, battle-tested database. [Postgres](https://www.postgresql.org/) is unquestionably one of the most popular relational databases.

If you are considering trying out Postgres on your local machine before moving ahead with Docker, then run the following command.

I will show you how to do it with Docker shortly.

First, install the [psycopg2](https://pypi.org/project/psycopg2/) binary. After installation make sure to update the `requirements.txt` file

```bash
pip install psycopg2-binary
```

Before proceeding, make sure you have installed the `libpq` driver in your machine.

References:

- [libpq - Homebrew](https://formulae.brew.sh/formula/libpq)
- [libpq -- C Library](https://www.postgresql.org/docs/16/libpq.html)

Next, navigate to the `DATABASES` section in `settings.py` and modify the configuration to receive data from environment variables.

![step6](./images/26.png)

Next, create a `db.env` file which contains environment variables for the postgres container.

![step7](./images/27.png)

Update the `.env` file with postgres environment variables.

![step7](./images/28.png)

Update the `compose.yaml` file with the postgres configuration.

![step8](./images/29.png)

```dockerfile
services:
  server:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8000
    volumes:
      - static_files:/app/staticfiles
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    networks:
      - django_docker_net
  db:
    image: postgres:16.1
    restart: always
    expose:
      - 5432
    healthcheck:
      test: [ "CMD", "pg_isready" ]
      interval: 10s
      timeout: 5s
      retries: 5
    env_file:
      - db.env
    networks:
      - django_docker_net
  nginx:
    image: nginx:1.25
    ports:
      - "8080:80"
    volumes:
      - ./nginx/custom-nginx.conf:/etc/nginx/conf.d/default.conf
      - static_files:/app/staticfiles
    depends_on:
      - server
    networks:
      - django_docker_net

networks:
  django_docker_net:
    driver: bridge

volumes:
    db-data:
    static_files:


```

Also, make sure to add this line in your `Dockerfile`.

```bash
RUN apt-get update && apt-get install -y libpq-dev
```

> **NOTE**: `libpq-dev` is Psycopg2 binary dependencies. These files are necessary for compiling and linking applications that use PostgreSQL.

![step9](./images/30.png)

Make sure to expose the gunicorn in `Dockerfile` so NGINX can proxy the request. We'll delve into NGINX shortly.

![step-gunicorn-nginx](./images/38.png)

Once done, update [_Run Configuration_](https://www.jetbrains.com/help/pycharm/run-debug-configuration.html) for Docker Compose.

![step10](./images/docker-compose-1.png)

![docker-compose-2](./images/docker-compose-2.png)

We are making sure that the container should always build whenever we run through Docker Compose.

![docker-compose-3](./images/docker-compose-3.png)

Provide the path to the `compose.yaml` file and then go ahead and click **Apply** -> **Run**.

![docker-compose-4](./images/docker-compose-4.png)

It will take a couple of minutes to initialize, and this is how the final output will look.

![step11](./images/32.png)

![step12](./images/33.png)

Next, right-click on the “django_docker-server-1” container and choose **Create Terminal**

![step13](./images/34.png)

Inside the terminal, we will be migrating the database files.

![step14](./images/35.png)

## NGINX

[NGINX](https://nginx.org/en/) is a high-performance web server, known for its stability, rich feature set, simple configuration, and low resource consumption. It's widely used for serving static content, reverse proxying, load balancing, and as an HTTP cache.

We will utilize NGINX as a reverse proxy in conjunction with Gunicorn to manage client requests and handle static files.

We are going to add nginx section in `compose.yaml`.

![step15](./images/36.png)

Additionally, we will replace the default nginx configuration with our own, naming it `custom-nginx.conf`.

Generate a file titled `custom-nginx.conf` within the `nginx` directory.

![step16](./images/customnginx.png)

This configuration sets up nginx to handle client requests by forwarding them to a Django application running on a different server (or container).

![step16](./images/37.png)

However, it's important to note that only NGINX will be accessible externally, while the Django App and database server will remain private.

![step18](./images/39.png)

![step19](./images/40.png)

Now, let’s run the application from the compose.yaml file and click on the play icon.

![step20](./images/41.png)

The Django Server, NGINX, and Postgres are now operational and running.

![step21](./images/42.png)

![step22](./images/43.png)

Let’s now check it in the browser.

Fantastic! The app is successfully up and running.

![step23](./images/44.png)

So, everything is working completely fine. Let’s check the Django Admin.

Unexpectedly, while the page is loading correctly, it seems that UI elements such as JavaScript and CSS have not been loaded.

![step24](./images/45.png)

The rationale for using NGINX alongside Gunicorn is that Gunicorn, being an application server, should not serve static files. Therefore, for managing both static or media files, NGINX is employed due to its proficiency in handling such content.

## Static Files

Let’s now fix the staticfiles configuration.

Update `STATIC_URL` and `STATIC_ROOT` in `settings.py`

In Django, `STATIC_URL` and `STATIC_ROOT` are settings used to manage static files, which are typically CSS, JavaScript, and image files that are not dynamic and don't change per request.

![step25](./images/46.png)

Also, add a volume to the server and nginx services in `compose.yaml` so that each container will share a directory named "staticfiles"

![step26](./images/47.png)

![step27](./images/48.png)

In the Dockerfile, we must create the `"/app/staticfiles"` directory. As Docker Compose typically mounts named volumes with root permissions, using a non-root user leads to a permission denied error when executing the `collectstatic` command if the directory isn't pre-existing.

![step28](./images/49.png)

Then, modify the NGINX configuration to direct requests for static files to the "staticfiles" folder.

![step29](./images/50.png)

The final last step is to update the `CSRF_TRUSTED_ORIGINS` under `settings.py`

The `CSRF_TRUSTED_ORIGINS` setting in Django is about ensuring that only safe and trusted web locations (origins) can send certain types of requests to your website.

![step30](./images/csrftrustedorigin.png)

Let’s retest the application again. Make sure to tear down the application before going ahead.

Run in through Terminal:

```bash
docker-compose down –--remove-orphans
```

Here's a simpler solution! Execute it via PyCharm.

![step31](./images/dockercomposedown.png)

Open `compose.yaml` and re-run the play icon again.

Everything is operating perfectly well.

![step32](./images/51.png)

Let’s get inside the server container terminal and run the following commands:

- `migrations` & `createsuperuser`
- `collectstatic`

![step33](./images/52.png)

![step34](./images/53.png)

![step35](./images/54.png)

You can see that migration, superuser and the static files were successfully executed.

Let’s head over to the browser and check again.

![step36](./images/56.png)

Amazing! The application is working fine and the UI has loaded up perfectly.
