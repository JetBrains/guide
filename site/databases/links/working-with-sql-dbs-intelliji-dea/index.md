---
date: 2023-05-02
title: Synthesizing a Database With Kotlin
topics:
  - databases
author: jetbrains
subtitle: In this episode of Talking Kotlin, we discuss how Synthesized uses Kotlin together with custom DSLs and OpenAPI to do just that!
thumbnail: ./thumbnail.png
video: "https://youtu.be/Vq3Mmdl1Tyg"
linkURL: "https://youtu.be/Vq3Mmdl1Tyg"
---

SYNTHESIZED – <https://www.synthesized.io/>
Hurdy-Gurdy – <https://github.com/CourseOrchestra/hurdy-gurdy>
KotlinPoet – <https://github.com/square/kotlinpoet>
Swagger Parser – <https://github.com/swagger-api/swagger-parser>

## Ivan's Background and Synthesize Overview

- Ivan is currently based in Italy but plans to move to London.
- Synthesize develops tools for developers related to relational databases, focusing on synthesizing and transforming data for testing and experimentation, aiming to avoid reliance on production data.

## Key Features of Synthesize

- Synthesize deals primarily with relational databases, helping to generate or mask data and subset large databases.
- The product is a command-line tool written in Kotlin and distributed as a JAR.
- Synthesize supports zero configuration by default but allows user customization via YAML DSL.

## Technical Implementation

- Synthesize uses Spring for dependency injection and JDBC for database connectivity, employing the JOOQ library for database access.
- The tool generates execution plans based on user-defined configurations in YAML to manage database tasks.
- Internally, Kotlin DSL is used for meta-programming, providing rules for default behaviors and data transformations.

## Code Generation and DSL

- Synthesize uses OpenAPI spec as a base for generating multiple outputs including Kotlin classes, TypeScript interfaces, documentation, and JSON schema.
- Ivan highlights the advantages of using extension methods and Kotlin Poet for effective code generation in Kotlin, creating a lightweight API for various needs.
- The OpenAPI parser helps in managing complex data types and transformations.

## Benefits of Kotlin in Synthesize

- Ivan initially skeptical about Kotlin, now fully appreciates its benefits, especially in dealing with meta-programming and DSL.
- Kotlin simplifies dealing with type safety and nullability compared to Java.
- Uses Kotlin for code generation and API creation, enhancing productivity and reducing boilerplate.

## Challenges and Solutions

- Synthesize faced challenges with Gradle’s groovy DSL but finds Kotlin DSL in Gradle much better.
- YAML is favored over Kotlin DSL as it’s more widely known and supported, but Kotlin DSL offers potential for more complex tasks.

## Practical Insights

- Ivan explains how to use the tool: users write a YAML file specifying database connections and configurations.
- The tool uses these configurations to execute the necessary tasks for synthesizing or transforming the database.
- Synthesize supports APIs and has Json schema integration for improved configuration and usability in IDes like VS Code and IntelliJ IDEA.

## Final Remarks and Conclusion

- Ivan opens up about the effective use of Kotlin Poet and OpenAPI parser in enhancing Synthesize.
- The tool simplifies domain-specific tasks with its internal DSL approach, reducing redundancy and enhancing developer efficiency.
- The discussion ends with appreciation for the productive use of Kotlin in building robust developer tools and a lighthearted exchange about naming conventions for tools (referring to musical instruments).

For more details about Synthesize and its usage, the discussion points to synthesizer.io for further exploration and access to the free version.
