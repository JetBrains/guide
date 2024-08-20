---
date: 2022-12-06
title: Zero to Document Hero - Introduction to MongoDB
topics:
  - databases
  - mongodb
author: hs
subtitle: Learn about the primary differences between relational databases, non-SQL databases and document databases.
thumbnail: ./thumbnail.png
video: "https://youtu.be/u5y_aUP5Td0"
linkURL: "https://youtu.be/u5y_aUP5Td0"
---

Once upon a time, relational databases, or RDMS (think SQL), were the only data store in town. But now there’s a competitor, a group of non-SQL (aka NoSQL) databases, including document databases such as MongoDB.

In this talk, you will learn about the primary differences between them, what MongoDB is, including its full developer data platform, why document databases are so powerful, how MongoDB can be used with .NET, and some really cool uses cases that show databases can be cool ;).

By the end of the talk, you should walk away realising that SQL isn't the only way.

## Tables vs. Documents

- Discussed the transition from tables in relational databases to documents in MongoDB.
- Highlighted how MongoDB uses JSON-like structures with flexible schemas.
- Emphasized embedding related data within documents to avoid complex joins.
- Example used: a personal trainer's data model transitioning from tables to embedded documents.

## Why Choose MongoDB

- High availability, flexibility, and scalability (both vertical and horizontal).
- Readability due to JSON-like structure, allowing quicker development.
- MongoDB Atlas: Multi-cloud, multi-region managed database service.

## Creating and Managing MongoDB Clusters

- Step-by-step guide to creating a free MongoDB Atlas cluster.
- Options for cloud providers and regions.
- Loading sample datasets and using built-in security features.

## Browsing Documents

- Multiple ways to interact with MongoDB data including:
  - Web interface within Atlas to browse and query data.
  - MongoDB Compass, a graphical user interface tool for data exploration.
  - MongoDB Shell integrated within Compass for command-line interactions.
  - Visual Studio Code extension for a seamless development experience.
  - JetBrains DataGrip for database management and querying.

## Connecting with Different Drivers

- MongoDB has official drivers for several languages including Python, Java, Node.js, C#, etc.
- Support for community drivers and a Data API for RESTful access.

## NET Integration with MongoDB

- Demonstrated using the MongoDB driver for C# with .NET applications.
- Sample projects for both .NET 6 and .NET 7.
- Showed how to set up a MongoDB client, perform CRUD operations, and use models with attributes for serialization.

## MongoDB Realm (Mobile Integration)

- MongoDB Realm: Local mobile database with device sync capability.
- Atlas App Services for managing synchronization between the mobile database and Atlas.
- Example of a mobile app using .NET MAUI and MongoDB Realm.

## MongoDB in Action

- Real-world examples of MongoDB usage (e.g., gaming high scores, smart factory monitoring).
- MongoDB Charts for visualizing data and creating dashboards.
- Examples from various industries including finance, gaming, and public services.

## Educational Resources

- MongoDB University (now MongoDB Learn) offers free courses and certifications.
- GitHub repositories with sample code and projects for developers to explore.

## Q&A Session Highlights

- Discussed plans for a book on MongoDB with .NET expected in 2023.
- Clarified technical details like using parameterized constructors with MongoDB models.
- Suggested using Singleton for MongoDB client registration in .NET.
