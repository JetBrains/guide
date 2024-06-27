==========
Transcript
==========

Sometimes you need to check that an exception is thrown from your code and pytest supports that too! Welcome back to our final video in this pytest in PyCharm series.

Let’s add this new test to check for the case when we ask for a primary guardian before any guardians have been assigned to the player. We can use pytests raises context manager to assert that a code block or function call raises the exception we expect. To make it more interesting, let’s say that we expect a KeyError.

And straight away we can see that this test fails. This means that our code does not throw a KeyError exception, in fact we can see that it’s expecting an IndexError Let’s change it to an IndexError and now we can see that our test is passing meaning we are correctly getting the exception we expect.

Yes, let’s refactor our code to avoid this case and return none in this instance. The test is now failing correctly so let’s head over to our code and fix it.

We can add type ending for the return type, saying it can be either Guardian or none, using pythons Optional Generic Type. And change the property to detect an empty list and in that case return none instead.

Our test is passing now so we are almost wrapped up here.

Before I leave you, here is a quick refresher on using pytest in PyCharm. There are many ways to run tests in PyCharm. Your keyboard shortcuts, your gutter icons, your right-click context menu in the editor or the project tool window or your Run Configurations. Let PyCharm help you with code completion, managing your imports, auto-rerunning your tests, and more.

And that’s it, we’re done here! I hope you’ve enjoyed our journey with pytest in PyCharm and you learned some helpful stuff along the way!