==========
Transcript
==========

We’ll head over to the Project tool window <kbd>⌘1</kbd> (macOS) / <kbd>Alt+1</kbd> (Windows/Linux) and ask PyCharm to create us a new python file which we’ll call “player” and we’ll create the smallest of classes for the purpose of this demo. We’ll just give it three variables and PyCharm will give us completion here which we can take advantage of although I’ll press Escape here as I don’t want additional code just yet!

```
class Player:
	first_name: str
	last_name: str
	jersey: int
```

We have some code, now let’s write a test! PyCharm’s Navigate To Test is really helpful here. When you use <kbd>⌘⇧T</kbd> (macOS) / <kbd>Ctrl+Shift+T</kbd> (Windows/Linux) PyCharm will toggle between your class and test, or, ask if you want to create a new test given one doesn’t yet exist. Yes we do and we’ll let PyCharm handle the simplest example code for our test.

PyCharm will, by default, create a basic test that you can then iterate on. We can run it with our gutter icons and note that it fails for good reason. It fails because we have `assert False` which means it’s never going to pass! Let’s change that to `assert True`, and perfect, it now passes.

Small note here, when we use our gutter icons, PyCharm creates a Run Configuration for us so we can use that with our keyboard shortcuts next time.

Let’s write a little test that tests the construction of a player object. We’ll call it `def test_construction` and the `test` prefix is a pytest standard so it’s useful to adopt it so pytest knows what tests are tests. We’ll assert that we are creating a Player object.

Yes, it passes, we can run it with our keyboard shortcuts again so  <kbd>⌃R</kbd> (macOS) / <kbd>Shift+F10</kbd> (Windows/Linux) or in another way that we went through earlier if you prefer!

You learned how to write your first pytest test, how to name your tests, how to run your tests and how PyCharm’s completion helps you along the way.
