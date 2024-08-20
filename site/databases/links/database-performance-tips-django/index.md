---
date: 2020-08-26
title: Database Performance Tips with Django
topics:
  - databases
author: hs
subtitle: Watch Python developer Andrew Brookins helps you squeeze every ounce of database performance from your Django application.
thumbnail: ./thumbnail.png
video: "https://youtu.be/-5503tXOU7A"
linkURL: "https://youtu.be/-5503tXOU7A"
---

Andrew Brookins has over ten years of experience working with Django and relational databases. That experience spans DevOps, application development, and platform engineering. He has worked on ecommerce sites, mobile APIs, comic book readers, particle simulation systems, learning and volunteering apps. He works at Redis Labs.
<https://twitter.com/abrookins>

## Introduction

- Overview of Andrew’s background in software development and database performance.
- Brief mentions of his recent courses and book related to these topics.

## Querying

**Pagination**

- Discussed the importance of pagination to handle large data sets and avoid loading all items at once.
- Introduced offset pagination using Django’s `Paginator` class, highlighting its limitations with deep pagination.
- Mentioned key set (or seek) pagination as a more advanced technique for deep pagination, with reference to Django Rest Framework's cursor pagination.

- **Annotations**
- Explained Django's aggregation framework and the use of annotations to perform calculations in the database rather than in Python.
- Showed how to use annotations to count completed tasks efficiently, reducing CPU work and the number of queries.

- **Materialized Views**
- Introduced materialized views as a way to cache query results within the database, making them available until refreshed.
- Explained the creation of materialized views in Django, using unmanaged models and custom management commands for refreshing.

## Indexing

**Covering Indexes**

- Described a covering index as an index that contains all the fields needed to satisfy a query, removing the need to access the table directly.
- Demonstrated how to add an index in Django and explained the benefits of index-only scans.

- **Partial Indexes**
- Explained partial indexes as indexes that only include a subset of rows based on specified conditions.
- Showed how to create partial indexes in Django and discussed scenarios where they improve performance by excluding frequently occurring values.

## Caching with Redis

**Caching Techniques**

- Discussed using Redis for caching to alleviate database load and improve performance.
- Demonstrated how to configure Redis for caching in Django, using Django’s caching middleware and low-level caching techniques.

**Session Storage**

- Explained the use of Redis for storing session data, highlighting Redis’s persistence features and benefits over database-stored sessions.

**Advanced Usage**

- Illustrated a custom authentication backend using Redis to store and retrieve API tokens for fast, efficient authentication.
- Emphasized the flexibility of Redis with various data structures for different caching and storage needs.

## Questions and Answers

- **DB_Index vs. Custom Indexing:** Discussed the use of `db_index=True` in Django models versus custom index creation, highlighting control and advanced options in custom indexes.
- **Materialized Views:** Detailed use cases and considerations when using materialized views, emphasizing their strengths for pre-computed, cache-like query results.
- **Raw Queries vs. ORM:** Addressed when to use raw SQL queries over Django ORM, recognizing ORM complexity for advanced queries and situations where SQL is simpler.
- **Upgrading Django:** General advice on upgrading from Django 1.8 to the latest version, emphasizing gradual, careful progress.
- **Redis vs. Memcached:** Compared Redis and Memcached, noting Redis’s additional features, persistence, and advanced data structures.
- **Transactions and Avoiding Deadlock:** Recommended using transactions for data consistency and provided general advice on avoiding deadlocks.

## Conclusion

- Emphasized the importance of database performance tuning and advanced tools like Redis in Django applications.
- Encouraged developers to explore database performance as a career specialization.
- Promoted Andrew’s book “The Temple of Django Database Performance” and his Redis course for further learning.
