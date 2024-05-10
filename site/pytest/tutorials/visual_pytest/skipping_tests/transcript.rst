==========
Transcript
==========

Let’s do a little recap of how to configure PyCharm to support a Test Driven Development workflow. Let’s use Recent Files with Cmd and E or Ctrl and E to find out player test and instead of pressing Enter, press Shift+Enter to open it in a right-split. Perfect. Now we need to check in our test suit, use Command and Four or Alt and Four to display the Run tool window. Now we just want to do a quick sanity check that our tests are running automatically when we change something. Let’s change our surname to Smith, and… the tests fail! Change it back to Allen, and the tests pass, sorted!

Get PyCharm to do the heavy lifting again and use Option and Enter or Alt and Enter and choose Add method add_guardians to class Player. Now we can fill in the blanks. We will make guardians an Iterable object so we can look at them one at a time. Time to Control and Tab back to our test class, remove the pytest skip marker and see if our tests pass. And they do!

Let’s go through the same process again with a new test which will test for the primary guardian in the event that a player has more than one. We’ll create a test that has a player and a guardian and then add the first and thus primary guardian to the player. We’ll add another two guardians for the player and subsequently add them to our guardian iterator.

As expected, our test is failing, so we’ll use the pytest skip marker to state that it’s not yet implemented. We’ll Control and Tab over to our code and use a python property for this implementation whereby the primary guardian returns the first guardian in the list.

Control Tab back to our test class, remove the skip marker and check that our tests now pass, which they do!

There’s lots of pytest markers that you can use, skip is just one example. You can also check out skipif for a conditional skip such as skip if the operating system is windows, or xfail which means the test is expected to fail - and it should worry you if it starts passing before you’ve implemented it!
