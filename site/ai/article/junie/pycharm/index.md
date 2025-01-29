---
date: 2025-01-23
title: "PyCharm Junie Playbook"
topics:
  - ai
author: hs
subtitle: Exploring Junie with PyCharm
thumbnail: ./thumbnail.png
---

## Exploring Junie with PyCharm

Welcome to Junie, the coding agent by JetBrains!

We're here to help you hand off your tasks and let Junie handle routine or more complex tasks for you—check out this guide to get started.

This playbook includes examples and step-by-step tutorials for new Junie users to explore it in action, for PyCharm.

Please note that since Junie is powered by AI, the results of the examples are not deterministic. This means that screenshots and expected results may be different from various trials. However, the results should be functionally similar. To make adjustments, you can use follow-up prompts which provide more specifics of what result you want.

### Install

1. Install [JetBrains Junie from the archive](https://plugins.jetbrains.com/plugin/26104-jetbrains-junie), and restart the IDE if required.
2. Open the plugin from the right sidebar.

![install.png](install.png)

3. Click **Authorize** and log in using the invited Gmail account.
4. Start using Junie by entering a task and running it.

### Optional Step: Junie Onboarding

You can use the `.junie/guidelines.md` file in the root directory to personalize Junie and make it truly effective for your team:

**You can create it automatically** by running a command like this as the first step in a new project:

1. Analyze the project structure and tech stack, and create a `.junie/guidelines.md` file with concise, well-structured information to help new developers. Include guidance on organizing the structure, running tests, executing scripts, and following best practices. Keep the content short, clear, and practical.
2. This will trigger Junie to explore the project for 30-90 seconds, executing commands like 'ls' and **generate this file**. **Review the results carefully**. Good instructions make Junie more effective, while unclear or incomplete guidelines can lead to low-quality outcomes.
3. **Alternatively, you can create this file manually from scratch** and copy any existing guides you have into it.

The `.junie/guidelines.md` file can contain instructions in any format. For example:

- `Specify that tests should always be added to a specific folder or use a particular framework.`
- `Inform Junie about existing guidelines in your repository (e.g., by pointing to the correct file path), and it will read and apply them.`

If you notice Junie doing something suboptimal, add a hint or clarification in the guidelines file. These instructions will be added to Junie’s context, helping it make better decisions and work more effectively within your project.
If the `.junie/guidelines.md` file already exists in your project (e.g., created by teammates), Junie will automatically use it.

![junie-analyse.png](junie-analyse.png)

### Play Safe

Junie is an agent that can run code, execute terminal commands, and work with the file system. This means Junie could, in theory, install something you don’t want, delete files (with no rollback option), or execute unexpected code on your system.

To keep things safe:

- Don’t give risky prompts like: do something with my personal important files in this directory which I have in one copy and no backups
- Don’t run Junie unattended.

We have a setting that determines whether Junie requires explicit approval for unsafe commands. **By default, approval is required, and it’s safer to keep this enabled**.

![terminal-commands.png](terminal-commands.png)

### Let's Have Some Fun

Some simple, universal tasks you can start with:

`Write/update a README.md about the project`

——————

`Analyze the repository, read important files and build an architectural dependency map between the modules, generate an ASCII diagram, and add it to the README.md.`

——————

`Analyze the last 10 commits, read relevant files and understand how it impacted user scenarios, generate very short and concise summary and an ASCII diagram (make it interesting, engaging, using emoji and art), and create a file changelog.txt`

——————

`Provide a code coverage report in a text file. If coverage is less than 80%, add tests to achieve the coverage goal.`

## Example One - Quick Start Guide for Django Projects

In this example, we will create the basic structure for a Django app that allows us to register membership with Junie. We will also ask Junie to help customise the website's look and add some tests. Throughout the process, you will monitor how Junie works and help Junie fix any issues that arise.

### Step 1. Create an app with membership

![django-create-git.png](django-create-git.png)

First, let’s create a new Django project in PyCharm.

![initial-commit.png](initial-commit.png)

(**Optional step**: Commit files with git; git can be used for rolling back if you don’t like the changes that Junie does.)

Prepare the database by running the following command in the terminal:

`python manage.py migrate`

After that, let’s create a superuser so we can later access the built-in Django admin:

`python manage.py createsuperuser`

Install the Junie plugin and there should be an icon on the right-hand side of the window to give Junie prompts.

Try this prompt: `Add a membership sign up app in the Django website`

![add-membership.png](add-membership.png)

**Tip**: As we mentioned, for security reasons, the default is to approve any terminal action for Junie explicitly. However, there are many terminal actions in this example, so you can choose to uncheck it if you want to.

![implement-membership-signup.png](implement-membership-signup.png)

Each time Junie needs to run a Django management command, it will ask for permission and display a blue “Run command” icon. Click it to continue each time.

After Junie is done, let’s try to run the server with ⌃⇧R (macOS) / Ctrl+Shift+F10 (Windows/Linux) and open the web app in a browser window. Try registering a new account and login with the URL endpoint provided. Unless you specifically cleared the checkbox Explicit approval of terminal actions, you will be prompted to approve the action.

**Note**: The "+20" numbers in green refer to the number of code lines that have been added.

![register.png](register.png)

Test around and see if there are any problems. What issues did you notice? Let’s use some following-up prompts to improve our application.

Prompt suggestions:

`Use POST for logout view endpoint`
`Create a root welcoming page`
`Activate basic membership for all members by default`

Feel free to try other prompts.

### Step 2. Add payment gateway

In the next step, we will try to add a payment gateway and use the Stripe API in our application. First, log in to admin as superuser and add some new subscriptions.

![django-administration.png](django-administration.png)

Try this prompt: _Add Stripe as payment gateway for subscriptions_

**Tip**: New packages are required; you can install them by clicking the tips provided by PyCharm.

![integrate-stripe.png](integrate-stripe.png)

![stripe-python.png](stripe-python.png)

You will need to rerun the local server after the new packages have been installed.

When Junie is done, instructions on how to set up the Stripe payment gateway are written in the `README.md` file. If you have a Stripe account, you can follow the instructions in README.md and set up a payment gateway with test mode to see if it works.

![django-site-stripe.png](django-site-stripe.png)

**Tip**: Check if the migrations have been applied; if not, it can be done manually in the terminal using the command `python manage.py makemigrations` and then `python manage.py migrate`.

### Step 3. Customize looks and themes

In the next step we can try to change the colour theme with Junie’s help. Let’s ask Junie to match our app’s theme with that of the Django website.

Try this prompt: `change the color theme to match <https://www.djangoproject.com/>`

![welcome-membership-white.png](welcome-membership-white.png)

You can also try a follow-up prompt: `Add a button to switch between dark and light theme.`

![welcome-membership.png](welcome-membership.png)

You can even ask Junie to check if the web UI follows the accessibility standard.

Try this prompt: `Make sure the UI follows the accessibility standard`

Be creative! Feel free to play around and try asking Junie to change the look of the website with other color themes or layouts.

### Step 4. Adding tests

Last, we will add tests and make sure the project gets good coverage.

Try this prompt: `Add appropriate tests for this project`

![tests.png](tests.png)

Try this follow up prompt: `make sure test code coverage is > 80% and create a coverage report`

Check the coverage report in the terminal:

`coverage report`

## Example - Fast API for Machine Learning

In this example, we will use Junie to create a machine learning Fast API project where an ML model is trained to predict a review rating depending on the review text. Junie can also add tests and reports for the model evaluation and code coverage. Lastly, we will also use Junie to dockerize the application to get it ready for deployment.

### Step 1. Getting data ready

First, we will create a basic Fast API app with some data stored in a database. Let’s start by creating a new Fast API project.

![fast-api.png](fast-api.png)

(**Optional step**: Commit files with git, git can be used for rolling back if you don’t like the changes that Junie does.)

![fast-api-commit.png](fast-api-commit.png)

Download an [example data set](https://www.kaggle.com/datasets/nicapotato/womens-ecommerce-clothing-reviews) from Kaggle:

Put the CSV in the project folder.

![womans-clothing.png](womans-clothing.png)

Try this prompt with Junie: `Create a database and populate it with the data in Womens Clothing E-Commerce Reviews.csv.`

![womans-clothing-list.png](womans-clothing-list.png)

**Tip**: As we mentioned, for security reasons, the default is to approve any terminal action for Junie explicitly. However, there are many terminal actions in this example, so you can choose to uncheck it if you want to.

Notice that not just data has been added to the database. Relevant endpoints have also been created in `main.py`.

Try this follow-up prompt: `Create an API endpoint to receive input data to database`

Whilst Junie is not-deterministic, it’s likely that there will be updates to your `main.py` file as a result of this command.

![test-main-clothing.png](test-main-clothing.png)

### Step 2. Build and train a model

In the next steps, we will add the machine learning function to the app and try to predict the review rating from the review text.

Try this prompt: `Create a NLP model to predict ‘Rating’ from ‘Review Text’ using data from the database`

**Tip**: Install requirements when notified.

![choose-packages.png](choose-packages.png)

Try this prompt: `Train and save ml model, provide model evaluation report as text file`

In my run, I noticed that Junie decided to use the CSV file for model training. While that makes sense for now, it will not make sense when we have user input data, so I am going to ask Junie to fix it.

Try this follow up prompt: `Use data from the database for train_and_evaluate_model, rerun the training and model evaluation`

![train-save.png](train-save.png)

After Junie is done, inspect the report and see if the model achieves good results.

![model-eval.png](model-eval.png)

In my run, the overall accuracy is around 60%, apparently, there is room for improvement. Feel free to ask Junie to use or incorporate other NLP models (even pre-trained models) to get better results. One such prompt could be:

`Use a pre-trained sentiment analysis model from Hugging Face in conjunction with our model to improve prediction accuracy`

For demonstration purposes, I will stop here and move on to the next step.

### Step 3. Adding tests

Next, we will add tests and make sure the project has good coverage for the project.

Try this prompt: `Add appropriate tests for this project`

Tests have been added. However, we want to make sure we have good code coverage.

![test-main.png](test-main.png)

Try this follow up prompt: `make sure test code coverage is > 80% and create coverage report`

Check the coverage report in the terminal:

`coverage report`

![test-main-coverage.png](test-main-coverage.png)

### Step 4. Dockerize for production

Last, we will prepare a docker image for the deployment of our application.

Try this prompt: `prepare the project in production in Docker containers`

Instructions are also added to the `README.md` file after Junie has completed the task. Feel free to follow them and test it yourself.

![dockerize.png](dockerize.png)

## Example - Jupyter notebook and data exploration

In this example, we will use Junie to create Jupyter notebooks to do data explorations. After that we will create a prediction model and results are visualized in Jupyter notebooks..

### Step 1. Simple data exploration

First, we will create a Jupyter project.

![jupyter-notebook.png](jupyter-notebook.png)

(**Optional step**: Commit files with git, git can be used for rolling back if you don’t like the changes that Junie does)

![jn-changes.png](jn-changes.png)

[Download the Tic-Tac-Toe Game Dataset](https://www.kaggle.com/datasets/anthonytherrien/tic-tac-toe-game-dataset?resource=download) from Kaggle.

Add the csv file in the data folder.

Try this Prompt: `Create a Jupyter notebook and perform data exploration with the data inside the csv file in the data folder`

![tic-tac-toe.png](tic-tac-toe.png)

After Junie is done, open the new Jupyter notebook that has been created. Install the requirements and run the notebook.

![tic-tac-toe-analysis.png](tic-tac-toe-analysis.png)

Notice that the generated notebook is using ‘seaborn’, a plotting style that is no longer supported (for all the supported styles, please see here). Let’s try using the ‘ggplot’ style instead.

Try this follow-up prompt: `use 'ggplot' as plt style instead`

![pie-chart.png](pie-chart.png)

Now run the notebook again and you will see all the data exploration visualizations.

### Step 2. Draw end game board illustration

Next we want to draw the game board and illustrate some of the end games documented in the csv file.

Try this prompt: `In tictactoe_analysis.ipynb, add images to illustrate 10 random tic-tac-toe end game board`

![random-game-stats.png](random-game-stats.png)

How do you like the result? Here are some follow-up prompts that you could use to improve the visualization:

- `improve game board images by moving X and O a bit higher`
- `make the game board black and white for accessibility`

![black-red.png](black-red.png)

![black-white.png](black-white.png)

### Step 3. Create a prediction model to win the game

Finally, we want to tell Junie to create a model which can help us to win the game.

Try this prompt: `Create a model to predict the best move for player X and O based on the opponent's previous move`

![test-case-one.png](test-case-one.png)

The prompt may take some time as Junie is hard at work building the model and running it for tests. After that you will see a Jupyter notebook, together with some other files which contain the model and the visualization of the result. Feel free to ask Junie to make any improvements.
