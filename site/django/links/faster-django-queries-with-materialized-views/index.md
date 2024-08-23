---
date: 2022-06-05
title: Faster Django Queries With Materialised Views
topics:
  - django
author: ni
subtitle: Materialized views can be very useful for creating reports that will be used repeatedly. They cut down on query times because the query has already been made, and the view has been written to the disk.
thumbnail: ./thumbnail.png
video: "https://youtu.be/qcTGppyu1nw"
linkURL: "https://youtu.be/qcTGppyu1nw"
---

## Introduction

- The video explains how to work with materialized views in Django using a PostgreSQL database.
- Materialized views help reduce the cost of running queries on a database.

## Project Setup

- The example involves a `models.py` file in a `bookings` app within a Django project.
- The PostgreSQL database is used, and tables are color-coded for better focus on important tables.

## Creating and Understanding the Query

- An overview of the `bookings` table structure is provided.
- A SQL query is written to join the `bookings` table with the `facilities` table, filtering where the member ID (`memid`) is 0, indicating guests.
- Selected columns include facility name (`f.name`), start time (`b.start_time`), facility ID (`f.fact_id`), and an end time calculated from `b.start_time` plus an interval.

## Creating and Testing the Materialized View

- The materialized view named `guest_bookings` is created to optimize the query.
- Execution time is compared between a regular query and a query using the materialized view, showing a slight improvement.

## Integrating Materialized View into Django

- A Django model is created to encapsulate the materialized view, setting `managed = False` in the metaclass.
- Data types from the database schema are matched to Django model fields.
- An integer field (`booking_id`) is set as the primary key to work correctly with Django's ORM.

## Testing in the Django Console

- The Python console in PyCharm is used to test the new materialized view model.
- An initial issue due to the missing `id` column is fixed by setting `booking_id` as the primary key.
- The console is then used to query and validate the materialized view.

## Creating Index for Performance Optimization

- A unique index is created on the `booking_id` to further optimize queries.
- The effect of indexing is demonstrated by examining Django's generated SQL queries and using the `EXPLAIN` command to show an index scan.

## Regularly Refreshing Materialized Views

- The video emphasizes the need to refresh materialized views regularly.
- Demonstrates how to refresh the view, noting that adding the `CONCURRENTLY` keyword allows for reading from the view during the refresh process, though it may be slower.
