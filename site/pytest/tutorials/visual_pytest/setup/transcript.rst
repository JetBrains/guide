==========
Transcript
==========

In PyCharm, let’s select New Project, and we will give it a name like `laxleague`. We’lll accept the defaults here because I have python 3.11 on my system and a virtual environment is what I want and click **OK**. Now PyCharm will create our project for us.

If you don’t have python yet, you can [download](https://www.python.org/downloads/) it, and then come back and continue this journey!

Let’s make a new file over in our root called `pyproject.toml`, and give our project a name and version and then add our dependency on `pytest`. Before we move on, let’s create a directory for our source files. We can do this by specifying `src\laxleague` in PyCharm.

Let’s open the terminal tool window with <kbd>⌥F12</kbd> (macOS) / <kbd>Alt+F12</kbd> (Windows/Linux) and use `pip install -e` . to create an editable install. PyCharm will create the editable install and our project is now ready for the next steps.

The editable install creates our `egg-info` directory.

A small detour here - a requirements file is also perfectly acceptable. We could create a `requirements.txt` file in the same way we just created a `pyproject.toml` file and PyCharm will give you autocompletion here to help you figure out what you’re looking for.

Before we move on, we also need to create a new test directory so that pytest knows where to look for our tests.

Let me show you how to check that PyCharm is using pytest. Go into your project settings and search for “test runner”. In this project, PyCharm has set our test runner to pytest because we installed pytest as a requirement, however, it uses `unittest` by default so this is worth knowing in case you ever want to check that you’re using the test runner you expect.
