---
date: 2022-08-27
title: Writing REST with Django and Ninja
topics:
  - django
author: jetbrains
subtitle: Django Ninja is a FastAPI inspired library for turning your Django views into REST API end-points.
thumbnail: ./thumbnail.png
video: "https://youtu.be/Gry6rlZYpzw"
linkURL: "https://youtu.be/Gry6rlZYpzw"
---

This webinar will show you how to get started with Django Ninja, how the interface interacts with Django's URL and ORM mechanisms, and how to apply authentication controls to your REST API.

Here are the links to Christopher’s Trudeau courses:

- [Sneaky REST APIs With Django Ninja on @realpython platform](https://jb.gg/5qgmk7)
- [Django: Getting Started Course on @talkpython platform](https://jb.gg/j47x0i)

## Introduction to REST and Django Ninja

- REST (Representational State Transfer) utilizes HTTP methods (GET, POST, PUT, PATCH, DELETE) for API operations.
- Django Ninja provides a simple way to create REST APIs in Django using decorators and type hints.
- Ninja offers a streamlined approach compared to Django Rest Framework (DRF), leveraging modern features like type annotations and async support.

## Setup and Basics

- Demonstrated the setup of a Django project with Django Ninja, including creating new apps and configuring URLs.
- Showed how to create basic GET endpoints using Ninja’s `router.get` decorator.
- Discussed the importance of type hints in Ninja to enforce data validation and serializing responses.

## Handling Parameters and Query Strings

- Explained how to handle query parameters and path parameters in API views.
- Highlighted differences between query string parameters and URL path parameters, emphasizing the use of type hints for data validation.

## Serialization with Pydantic and Ninja

- Introduced Pydantic for data validation and serialization, explaining how Ninja uses Pydantic models (rebranded as schemas in Ninja) for these purposes.
- Demonstrated the creation of serialization schemas and how to use them in API responses.
- Highlighted how to include both ORM fields and custom computed fields in serialized responses.

## Integration with Django ORM

- Showed how to serialize Django ORM models using Ninja schemas.
- Demonstrated how to use ORM fields in schemas and how to define custom serializer methods (e.g., `resolve_full_name` for computed fields).

## Advanced Features and Best Practices

- Emphasis on using Ninja’s built-in support for authentication, pagination, and error handling.
- Mentioned the ability to define custom error messages and exception handling.
- Highlighted Ninja’s API documentation and testing UI, allowing developers to test endpoints and see detailed response information interactively.

## Comparison with Django Rest Framework

- Discussed scenarios where Django Ninja might be more suitable due to its simplicity and modern approach.
- Acknowledged DRF’s depth and extensive ecosystem, making it suitable for more complex requirements.

## Community and Contribution

- Encouraged contributions to open-source projects like Django Ninja, whether through code, documentation, or providing feedback.
- Highlighted the supportive nature of the open-source community and the importance of engaging with it.
