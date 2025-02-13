---
type: TutorialStep
date: 2024-11-22
title: Getting Started with Testing in PHPStorm
topics: []
author: brentroose
subtitle: Here, we delve into PhpStorm's robust error detection and correction capabilities.
thumbnail: ./thumbnail.png
video: "https://youtu.be/vUWp2zkaQzc"
canonical: "https://www.jetbrains.com/phpstorm/getting-started/episode-5/"
---

In this episode, we’ll explore how PhpStorm supports various testing frameworks like PHPUnit, Pest, Behat, Codeception, and PHPSpec. You'll learn how to run test suites directly within the IDE, analyze test results, leverage watch mode for automatic reruns, and generate test files effortlessly.

---

I’m not going to give you a lecture about why and when testing is important. I just want to show you how PhpStorm makes testing significantly easier. Whether you’re writing in PHPUnit, Pest, Behat, Codeception, or PHPSpec, the IDE has integrations for all of those frameworks.

Let’s say you already have a test suite in place. Instead of running it via the terminal, you can select a test folder in PhpStorm and press <kbd>Control+Shift+R</kbd>. You can do the same for subfolders, individual test classes, or even specific test methods. If you’re somewhere else within your code and want to rerun your test suite, you can press <kbd>Control+R</kbd> from anywhere. Of course, all these actions can also be found in the <kbd>Shift+Shift</kbd> menu; just search for Run, and you’ll see all relevant options.

<video class="video-player" playsinline controls>
    <source src="../e5-open-test.webm" type="video/webm">
</video>

PhpStorm will display your testing results in the tests window. You’ll see some buttons there as well, which you can use to rerun all failed tests. You can even toggle on a watch mode that will rerun tests automatically whenever you’re making changes to your code. What’s more, you can also double-click files and methods within this test window to quickly go to tests that are failing, and you can even rerun specific tests from within test classes by clicking the run gutter icon.

<video class="video-player" playsinline controls>
    <source src="../e5-test-window.webm" type="video/webm">
</video>

PhpStorm also has coverage support for tests so that you can see which lines in your codebase aren’t covered by your test suite. The IDE will also show visual indicators within the gutter to highlight places that need your attention.

<video class="video-player" playsinline controls>
    <source src="../e5-coverage-support.webm" type="video/webm">
</video>

Next, on to one of my favorite IDE features – PhpStorm’s ability to generate test files for you. Within any given file, you can press <kbd>Shift+Shift</kbd> and search for Go To Test; if there’s a test file for this specific class, PhpStorm will go to it; if there’s none, the IDE will create one for you.

You can also go the other way around, by the way, from the test to the subject. It’s the same keyboard shortcut, and you can find it by pressing <kbd>Shift+Shift</kbd> and searching for Go To Test Subject.

<video class="video-player" playsinline controls>
    <source src="../e5-test-generation.webm" type="video/webm">
</video>

Finally, writing tests can be tedious; I won’t deny that. Especially setting up your initial test class. PhpStorm can generate whole test classes for you with its AI Assistant – if you have a valid AI Assistant license and the AI Assistant plugin installed. You can press <kbd>Alt+Enter</kbd> within any class, choose AI Actions, and then Generate Tests. AI Assistant will generate a preview for you, which you can still fine-tune where needed. It’s a nice little time-saving shortcut.

<video class="video-player" playsinline controls>
    <source src="../e5-ai-assistant.webm" type="video/webm">
</video>
