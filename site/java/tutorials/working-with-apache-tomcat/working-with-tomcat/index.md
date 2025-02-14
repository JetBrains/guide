---
type: TutorialStep
date: 2024-11-11
title: Working with Tomcat
topics: []
author: hs
subtitle: Working with Tomcat in IntelliJ IDEA.
thumbnail: ./thumbnail.png
---

Now that you know how to set up your IDE to work with Tomcat for both new and existing applications, let’s look at how to work with Tomcat during application development. We'll refer to the first application we created called `HelloWebApp` for this section.

Let’s say we want to change our application and add a new POST method that takes in a name as a parameter and returns a custom greeting.

1. Add the following method to your `HelloResource.java` file including the necessary imports:

```java
@POST
@Path("/{name}")
@Produces("text/plain")
public String customWelcome(@PathParam("name") String name) {
       return "Welcome " + name + "!";
}
```

Your full class should now look like this:

```java
package com.example.hellowebapp;

import jakarta.ws.rs.*;

@Path("/hello-world")
public class HelloResource {
    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello, World!";
    }

    @POST
    @Path("/{name}")
    @Produces("text/plain")
    public String customWelcome(@PathParam("name") String name) {
        return "Welcome " + name + "!";
    }
}
```

2. Stop your Tomcat server from running with <kbd>⌘F2</kbd> (macOS) / <kbd>Ctrl+F2</kbd> (Windows/Linux) because we're going to make some changes to our Run Configuration before we restart the server.
3. In your Run Window <kbd>⌘4</kbd> (macOS) / <kbd>Alt+4</kbd> (Windows/Linux), right-click on `Tomcat 10.x.x` (or your version) then select **Edit Configurations**. You can also do this with **⇧F4** (macOS), or **Shift+F4** (Windows/Linux).
4. Clear the **After launch** checkbox if you'd rather IntelliJ IDEA not open up a browser for you automatically. You might want to work with the HTTP client instead given it's a RESTful application. You can also specify VM options to pass in if required.
5. Save any configuration changes that you want to make and press **OK**.
6. Now we’re ready to restart our Tomcat server with <kbd>⌃⇧R</kbd> (macOS) / <kbd>Ctrl+Shift+F10</kbd> (Windows/Linux) to test the new POST method. We're going to make a POST request right in the IDE using the HTTP Client. To bring up the HTTP client, use Search Everywhere <kbd>⇧⇧</kbd> (macOS) / <kbd>Shift+Shift</kbd> (Windows/Linux) and type in `http` then select **HTTP Client**.
7. Enter the following code to test your POST method (change the name at the end to yours):

```html
POST http://localhost:8080/HelloWebApp_war_exploded/api/hello-world/Helen
```

8. Run your request with the green arrow in the gutter adjacent to your POST request. Your POST request should run successfully with a response that includes your custom greeting:

![Custom Greeting](custom-greeting.png)
