---
type: TutorialStep
date: 2024-04-22
title: Preparing for Production
topics:
  - go
  - web
author: rpeden
subtitle: Fine-tuning your project for deployment.
thumbnail: ./thumbnail.png
---

## Preparing for Production

Now that you've seen the app working in dev mode, the final step is getting it ready for production.

While this section explains the process of creating a production build for your React frontend and updating the Gin backend to serve static files, it's important to note that there are several additional steps you'd need to consider before deploying an app like this into production. These steps include:

- Storing passwords securely in the database instead of as plain text
- Adding authentication to all API endpoints to check that a user is authorized to make any given API request
- Using WebSockets for notifications of new messages in a channel instead of polling every five seconds

### Serving Static Files with Gin

As it stands, your Gin backend can answer API requests but doesn't know how to serve the HTML and JavaScript your React production build will generate. Fortunately, it's easy to add this functionality.

First, create a production build of your frontend by opening another GoLand terminal, running `cd chat-ui`, and then running `npm run build`. This builds your app's frontend in the `chat-ui/build` subdirectory. If you look in the `build` directory, you'll notice that `index.html` sits at the root and all the frontend JavaScript is in `build/static`.

Now, you need to tell Gin where to find the frontend files. Open `main.go`, scroll to the `main` function, and then find the line near the end of the function when you start the Gin server:

```go
err = r.Run(":8080")
```

Immediately before that line, add the following:

```go
// Explicitly serve index.html at the root
r.StaticFile("/", "chat-ui/build/index.html")
// Serve static files under /static
r.StaticFS("/static", http.Dir("chat-ui/build/static"))
```

See [here](https://github.com/rpeden/go-gin-react-part3/blob/e85feff9d970815683136be34f2bb513fa2c03ed/main.go#L72) for a look at how it all fits together in context. Explicitly setting a static `index.html` and a separate `/static` route ensures that none of your static file routes conflict with your API routes.

With that change done, run the backend server by clicking the run button in GoLand like you did earlier.

Then, open a web browser and navigate to [http://localhost:8080](http://localhost:8080). You'll see that your Gin app now serves the production build of your React app, and you can sign in and chat the same way you did earlier.
