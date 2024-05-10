==========
Transcript
==========

Welcome back to our pytest video series, let’s get stuck in! Welcome back! First let’s check that we have our code on the left, our test on the right, and our run tool window at the bottom. And… let’s make a change to break the test… and…. fix the test… to check that our tests are auto running, which they are, great!

Pytest fixtures improve readability and reduce duplication, let’s make our first fixture. We’ll call it player_one and it will return a player of course! Pytest is underlined in red because we need to import it which we can quickly do with Alt+Enter or Option+Enter.

Next we need to refactor our tests to use this fixture rather than each test creating its own instance of player. Use Shift+F6 to rename p to player_one so all the other instances update too, however we don’t want this local player so we’ll use Ctrl or Cmd and X to delete that line. PyCharm has underlined player_one because it isn’t sure what it is. Let’s use Alt+Enter or Option+Enter and choose to add the fixture to test the function parameters. And finally check that our tests still pass.

Same again, we will rename p to player_one in test under add under guardian, then delete the line that creates the player and ask PyCharm to use the Fixture. Let’s repeat these steps for our final tests and then check, all our tests are still passing.

That was the player fixture, what about one for guardians too? Let’s create that now, using a list of guardians in the same test file. We then need to go through a similar process as before with the refactor.

First let’s rename our assignment to guardians under list at position zero, PyCharm will rightly give us an error here since we’re trying to perform an incorrect assignment, however we’re just doing it to update the other usages and then we will delete the line.  Let’s use Alt+Enter or Option+Enter and choose to add the fixture to test the function paramters.. Now all our tests are passing again.

Let’s finish up the fixture refactoring by using our guardian fixture in the final two tests. Same again, Shift+F6 to rename the variable and its instances, then delete the line and use Alt+Enter or Option+Enter to bring in the Fixture for both test under add guardians and test under primary guardian. Wonderful, and all our tests still pass.

Time to switch over to our guardians test and add the same guardian fixture there too. Let’s paste the same fixture here and again we will get PyCharm to handle the import with Alt+Enter or Option+Enter. Now we can refactor the test_construction to remove the local definition of a guardian and use the fixture in the same way as before…

Let’s create a conftest.py file to manage all our fixtures and eliminate this duplication. Let’s select both our fixtures from the Player test file and then use Search Everywhere which is Shift+Shift and search for “Move”. We’ll call the new file conftest.py and selectthe root of our project rather than our tests directory. PyCharm handles all our imports for us in the new conftest.py file, deletes the fixtures from our Player test file and removes unused imports, perfect! However, we do still need to remove the fixture from our Guardian test file and we can get rid of our unused imports with Optimize Imports which is Ctrl, Option and O on Mac or Ctrl and Alt and O on Windows.

Now we have eliminated duplication and our tests are easier to reason about, lovely!

Before I leave you, let me remind you that naming is hard! guardians_list is not the best name that I could have used for this fixture, let’s rename it to all_guardians. We can even do that from a usage, like here. I can press Shift+F6 twice to rename it with all the options. I’ll use all under guardians and then click Preview. Note how all my usages AND the the fixture itself have been updated? In case you were wondering, you can hold down Command or Alt and then click to toggle between Usages and Definitions as I am here. Of course if you change your mind you can undo it just as easily! But I prefer my new name!

Show test_player.py and renaming guardians_list to all_guardians with options and preview on the refactoring. Then show toggling between the usages and definitions. Briefly do Ctrl+Z to undo it thenShift+Command+Z to redo it. Fixtures are a great way in pytest to reduce duplication and improve the readability of your tests. There’s lots of cool ways you can use fixtures in the setup and tear down of your tests, check out the pytest documentation for more information.

