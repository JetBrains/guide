---
type: TutorialStep
date: 2024-11-22
title: Getting started with PHP in PhpStorm
topics: []
author: brentroose
subtitle: Focus on writing quality code while PhpStorm’s automated tools handle mundane tasks.
thumbnail: ./thumbnail.png
video: "https://youtu.be/3UI7aBEoKZU"
canonical: "https://www.jetbrains.com/phpstorm/getting-started/episode-2/"
---

In this episode, we explore how PhpStorm's robust autocompletion, automatic class importing, error detection capabilities, navigation shortcuts, and support for different PHP versions and composer can streamline your workflow.

---

## Autocompletion

First, you’ll notice that PhpStorm will frequently autocomplete your code. It has a deep understanding of your codebase and often suggests what to write next: method names, variables, functions, parameters, whole blobs of code, class names, and much more.

    {% video "../e2-autocompletion.webm", width=1366, height=768 %}

Speaking of classes, PhpStorm knows about autoloading, so if you reference a class for the first time within a file, PhpStorm will automatically import it.

{% video "../e2-classes.webm", width=1366, height=768 %}

## Moving classes

If, at a later point, you decide to move this class to another place, then PhpStorm will make sure all references to it are updated correctly. It will also update the original class namespace for you so that you don’t have to worry about such boring details. Instead, you’ll be able to be as productive as possible and focus on what really matters – your code.

{% video "../e2-moving-classes.webm", width=1366, height=768 %}

## Error detection

Another part of PhpStorm’s deep knowledge is error detection. It’ll tell you what’s missing or deprecated, perform extensive type checking, and it knows a thing or two about PHP’s quirks as well.

{% video "../e2-Error-detection.webm", width=1366, height=768 %}

## Navigation

Next, you can navigate within your codebase between class definitions, function declarations, or variables. Do this by holding Control or Command, then click wherever you want to go.

{% video "../e2-Navigation.webm", width=1366, height=768 %}

## Composer support

Finally, PhpStorm also has composer support and works with different PHP versions.

{% video "../e2-Composer-support.webm", width=1366, height=768 %}
