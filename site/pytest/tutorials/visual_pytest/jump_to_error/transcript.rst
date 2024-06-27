==========
Transcript
==========

Let’s recap what we did last time and make our player class a dataclass too. Annotate your class with @dataclasses.dataclass and let PyCharm do the rest. We’ll check our tests still pass with Control+R or Shift+F10 before we continue.

Now let’s Control+Tab back to our test add a real test for our construction but whoops! We can see that it’s failing immediately because we set PyCharm to autorun our tests every 3 seconds.

Let’s Control+Tab back over to our class to add the constructor that this test needs. Perfect, now Control+Tab back to our test and test it properly. Okay, all passing!

Let’s talk about the errors that we all make and how we can succeed faster. In our player test class, let’s accidentally pass in a byte string, PyCharm warns me that something is wrong.

If I hover over the error I can see that I’m sending in bytes but the constructor expects a string and then my test will automatically run and fail telling me the same problem.

Ideally your code will always be working but sometimes that’s not the reality of the situation. Let’s see how we can use Jump To Error to implement players with guardians.

First we will assert that a new player has an empty list of type guardian. Then we will make a new test which makes a guardian and then a player and then tries to add the guardian to the player and finishes with an assertion.

Ah ha! Errors! We can use F2 to cycle through the errors in the class, like the three we have here. Let’s start by adding the add_guardians method to our player class.

We can get PyCharm to do some of the heavy lifting here so we don’t have to. Put your cursor over add_guardian and use Option+Enter or Alt+Enter and select Add method add_guardian to class player. Now we can fill in the blanks.

We will change the g to guardians, press Tab and fill in the method. Now, guardians is underlined because PyCharm doesn’t know what that is yet, let’s fix that next.

We’ll create a new dataclass field called guardians to store the list and let PyCharm handle the code completion and import. And now our test passes!

Let’s see some other ways that PyCharm helps you to find and fix errors. Let’s make a silly mistake here and then head off to another class we’ve been working in with Cmd and E or Control and E for Recent Files.

From here, we see that our tests are failing! Whoops! Let’s head down to the pytest output, click the link and fix our mistake! Phew, tests are passing again!

In addition to PyCharm alerting you to a problem, pytest also helps us to understand errors when they occur. What if we accidentally added a player as a guardian? We can prevent that by first changing the list to be of type Guardian…… then change our method to say it must receive a guardian of type Guardian.

Now in our test we try to add a player, instead of a guardian. PyCharm will immediately give you a warning to say that it expected a guardian but it got a player, and of course our test will fail too! Let’s finish by fixing the error so all our tests run.

You learned various ways to find and fix errors in your code including F2 to jump to the error, Option and Enter or Alt and Enter to get PyCharm to fix errors and clicking on the pytest output.  You also saw how PyCharm gives you immediate feedback in your code when there’s a problem so you can fix it before moving on to your next masterpiece!

