---
resourceType: tutorial
layout: "resources/tutorial/TutorialLayout.11ty.tsx"
date: 2022-01-01
title: Developing FastAPI Application using K8s & AWS
technologies: [fastapi, kubernetes, aws]
topics: [python]
author: mm
subtitle: Build seamless FastAPI applications in PyCharm through Kubernetes & AWS.
thumbnail: ./thumbnail.png
tutorialItems:
  - ./introduction/
  - ./project_setup/
  - ./setup_sqlalchemy_1/
  - ./setup_sqlalchemy_2/
  - ./rest_api_1/
  - ./rest_api_2/
  - ./rest_api_3/
  - ./rest_api_4/
  - ./rest_api_5/
  - ./redis_celery/
  - ./auth_jwt/
  - ./testing/
  - ./kubernetes_deploy/
  - ./helm_charts/
  - ./aws_eks/
  - ./cleanup/
  - ./references/
---


[FastAPI](https://fastapi.tiangolo.com/) is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

This tutorial will be entirely focused on [FastAPI](https://fastapi.tiangolo.com/) along-with playing with titans 
like [Kubernetes](https://kubernetes.io/) & [Amazon Web Services](https://aws.amazon.com/).

There are a lot of features we are going to cover: 

* Working with SQLAlchemy & Alembic
* Implementing APIs along-with securing with JSON Web Tokens (JWT)
* Integrating with Celery & Redis
* Async Tests
* Helm Charts
* Deploying Apps using Kubernetes & AWS EKS (Elastic Kubernetes Service)


Note: *We'll be using PyCharm Professional Edition for all the steps in this tutorial.*

