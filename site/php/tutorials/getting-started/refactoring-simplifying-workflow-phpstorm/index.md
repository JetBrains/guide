---
type: TutorialStep
date: 2024-11-22
title: Refactoring in PhpStorm
topics: []
author: brentroose
subtitle: Have PhpStorm handle the boring tasks
thumbnail: ./thumbnail.png
video: "https://youtu.be/084ePq923-I"
canonical: "https://www.jetbrains.com/phpstorm/getting-started/episode-4/"
---

In this episode, we’ll showcase how easy and safe it is to perform refactorings, such as renaming namespaces, with just a few clicks. You'll learn how to call the Refactor This menu, preview changes, and apply them, dramatically simplifying tasks that would otherwise be time-consuming and error-prone.

---

PhpStorm is immensely powerful, it can do a lot of the heavy lifting for you. Refactorings are just one set of powerful tools you’ll find inside the IDE – they can literally save you hours of work.

Refactoring with PhpStorm is fast, straightforward, and safe. Let’s start with an easy example: We want to rename a namespace. Doing this by hand would involve several steps:

- First, you’d have to rename the namespace folder.
- Then, you’d need to change each class’s namespace within this folder.
- Finally, you’d have to change all references to these classes within your whole codebase.

There’s no way you want to do that by hand, right?

<video class="video-player" playsinline controls>
    <source src="../e4-doing-by-hand-720.webm" type="video/webm">
</video><br/>

So, let’s select the folder you want to rename and press <kbd>Control+T</kbd>, or you can press <kbd>Shift+Shift</kbd> and search for Refactor This.

You can call the Refactor This menu on virtually anything: a classname, a variable, a value, or a selection of code – if something can be refactored, the Refactor This menu will be available.

On top of that, PhpStorm will also show an inline toolbar, which has the most common refactors directly available.

<video class="video-player" playsinline controls>
    <source src="../e4-calling-refactoring.webm" type="video/webm">
</video><br/>

For folders, there are only a handful of things you can do. In this case, you want to rename the folder. Press Rename, and choose a new name. This specific refactoring can also search for references within strings and text, but let’s keep it to PHP code for now. You can specify the scope of the refactor, but for now you can simply keep it set to The Whole Project.

You can preview the refactoring, which will show what PhpStorm intends to change, and you can press Refactor to apply these changes.

<video class="video-player" playsinline controls>
    <source src="../e4-refactoring.webm" type="video/webm">
</video><br/>

And… you’re done! If something unintended happens, you can always press <kbc>Control</kbd> or <kbd>Command+Z</kbd> to undo the refactoring as well.

Refactorings are extremely powerful. I just demonstrated a pretty simple rename operation, but they can do a lot more than that. You can extract parts of your code to separate methods, move functions to parents, make methods static, convert values into constants, and much more.
