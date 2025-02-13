---
type: TutorialStep
date: 2024-11-22
title: Debugging with PhpStorm
topics: []
author: brentroose
subtitle: Build a solid foundation for diving deeper into the nuanced world of debugging in PhpStorm.
thumbnail: ./thumbnail.png
video: "https://youtu.be/ssZH94UfY6A"
canonical: "https://www.jetbrains.com/phpstorm/getting-started/episode-6/"
---

In this episode, you’ll learn about starting a debugging session, breakpoints, and stepping over and into code with Xdebug.

---

One of PhpStorm’s most powerful features is its debugger. The name “debugger” goes as far back as the 1940s and literally means “something that removes bugs or faults from a program”. A debugger will allow you to pause your code while executing it, enabling you to inspect the program’s memory, follow which path the code takes, and much more. The goal of a debugger is to make it easier to find out where things go wrong and remove bugs from your code.

PhpStorm comes with a lightweight debugger built in, but by far, the most popular debugger for PHP is Xdebug, which you’ll need to install separately. Luckily, however, PhpStorm will perform the installation for you. So, let’s take a look at how to set up Xdebug with PhpStorm and how to get started with debugging.

Let’s say you don’t have Xdebug installed. What happens when you start debugging a PHP script –a test, for example? Instead of running the test normally, you can press the Debug button. As you can see, PhpStorm lets us know that there’s no debugger installed, but it can also fix it for you. Just press Update Interpreter Info, then Download and install Xdebug extension, and give the IDE a moment to set Xdebug up for you.

<video src="../e6-xdebig-installation-compressed.webm" autoplay controls loop>
</video>

When it’s done, PhpStorm will automatically re-run your test with the debugger enabled – but, not much happens. That’s because we haven’t told the debugger to pause anywhere yet. To do that, we’ll need to use something called “breakpoints”.

A breakpoint is a place in your code where the debugger will stop executing for a second allowing you to inspect what’s going on.

For example, let’s add a breakpoint on this line here. Click the line number in the gutter, and you’re set. Now, let’s rerun our test.

This time, you’ll notice that some things have changed. The program is paused, and PhpStorm is showing a bunch of information.

<video src="../e6-breakpoint-line-compressed.webm" autoplay controls loop>
</video>

On the left, you see everything that happened before we arrived at this breakpoint. We got here via these method calls. You can click through them, and PhpStorm will show you the path through the files.

On the right, you see all the variables currently available at the breakpoint. There’s a `$this` variable referencing the test class; you can open it and see what’s in it. Then, there are other variables like the global `$_ENV` variable, for example. PhpStorm will show you its contents, and you can see how the list of variables changes whenever we move to one of the previous method calls.

<video src="../e6-this-compressed.webm" autoplay controls loop>
</video>

The debugger is now moving backward in our program flow, which can be very useful if you need to know the things that happened before something else happened. But what about moving forward? You can unpause the debugger by pressing the Resume button, but then the test will just finish.

So, let’s go back to our breakpoint, and instead of pressing Resume, we can press the Step over or Step into buttons. And these two are very powerful.

“Stepping over” means the debugger will move to the next statement and pause again. “Stepping into” means the debugger will go a level deeper and debug what’s happening within a function call.

<video src="../e6-step-over-step-into-compressed.webm" autoplay controls loop>
</video>

Now, these two buttons together are super powerful. You can essentially navigate the flow of your program with them, while keeping an eye on how variables change, why conditions match or don’t, how many times something is looped over, and much more.

But debugging is not just powerful; it’s also intimidating. There’s a lot going on, and it’s difficult to give examples without context that make sense. It’s also something that needs practice to get comfortable with, just like playing an instrument, for example.

So, here’s what we’re going to do. I’ve shown you the basics of getting started with the debugger: how to start a debugging session, breakpoints, and stepping over and into code. You’ll need to get comfortable with it, and the only way to do that is by practice. The next time you write a `var_dump` or `dd` statement, try to use the debugger instead; there will be some friction the first time you do, but it will get easier over time, and it will pay off in the long run.
