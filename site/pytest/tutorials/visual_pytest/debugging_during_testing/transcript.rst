==========
Transcript
==========

We often think of debugging our code, but we can debug our tests too! Welcome back to our pytest tutorial, let’s take a look. Let’s add a new line to this test to see how the debugger works. And look, we have a failing test!

Yes you could put in a print statement and run your code without the debugger, but it’s not going to help you because pytest captures the output. Plus it’s really not very efficient!

Let’s use the debugger instead. Click in the gutter to add a breakpoint and select the gutter icon from the drop-down to run the test under the debugger. PyCharm has stopped executing the code on the line where we placed the breakpoint and <uh oh> player_one has an empty list of guardians! If you’re still unsure we can go a step further by selecting the line, right-clicking and using Evaluate Expression and there we go, now we can clearly see the problem. On-screen: Show adding a breakpoint and running with the debugger using the gutter icon. Then select the line and use evaluate expression.

We’re stopped in our test code but not our actual code, right? Right, but you can click Step Into that and poke around there too. Again we can highlight the code, tweak and then evaluate the expression, this time from the debug tool window and in here you can type new expressions, or assign new values to variables or create new ones.

The debugger is a powerful tool for your test code and your actual code. Skip those print statements, add a breakpoint, and run with the debugger! Don’t forget to like and subscribe to this video for more pytest in PyCharm content and you can click on >this< QR code for more pytest resources on our JetBrains guide.
