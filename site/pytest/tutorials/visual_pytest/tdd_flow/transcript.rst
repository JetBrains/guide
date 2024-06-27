==========
Transcript
==========

Let’s add a new python file and call it guardians which for now, it’s a placeholder class. We will annotate this class with @dataclasses.dataclass so that python will generate our special methods for us such as `__init__` for our constructor. PyCharm handles the import for us so we can move swiftly on!

We’ll use <kbd>⌘⇧T</kbd> (macOS) / <kbd>Ctrl+Shift+T</kbd> (Windows/Linux) to generate a Test class as before and change the basic test to a sanity check for the constructor. And once again we’ll let PyCharm handle the code generation and import for us.

Fun trick, right-click on your `tests` folder in the Project tool window <kbd>⌘1</kbd> (macOS) / <kbd>Alt+1</kbd> (Windows/Linux) and select Run Python tests. In `tests` You can see that our previous test ran and passed, as did our new test. Small note here, pressing escape will always put you back in the editor from any toolwindow.

I dangled the possibility of some Test Driven Development or TDD for you so let’s go check out what that looks like in PyCharm. Let’s open our test in a right split, by right-clicking and selecting split right. Now let’s right-click on our `Guardian` class and close other tabs so we have our code on the left of the screen and the test on the right.

Down at the the bottom we have our test output so let’s tell PyCharm to automatically re-run our tests when we change something - one less action for us to do! You can configure this delay quickly by clicking on the 3 vertical dots, and going to **Test Runner Settings** > **Set AutoTest Delay**.

How can PyCharm help with a TDD workflow? Let’s change our new test to `assert False`, pause for 3 seconds and yep, now it fails as expected. And change it back to `assert True` to prove it... yep and now it passes again, this is really helpful when you’re in the TDD flow.

Let’s implement a Guardian first and last name, starting with a new failing test. Even before the test runs, the IDE is telling us with a warning that something isn’t right with the squiggle underlines on `Mary` and `Allen`. To make the test pass, we need to add the missing constructor that takes and stores the first name and last name on the Guardian instance.

Use <kbd>^⇥</kbd> (macOS) / <kbd>Ctrl+Tab</kbd> (Windows/Linux) to switch to the other file and change the code. PyCharm is going to help us complete this code too. Lovely! The test has re-run and now it passes!

Well the tests pass but we haven’t really tested anything yet. Let’s head back to our test class and add some more assert statements. And in the blink of an eye, our test has re-run and now passes! Job done!

TDD tends to be quite polarising but whatever your view point, you can configure PyCharm to support your workflow, have the IDE complete your next thought and most importantly, save you precious time when you’re crafting your next master piece with pytest!
