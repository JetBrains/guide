---
date: 2024-11-29
title: Work with records
topics:
  - inspections
  - java
author: md
subtitle: Create a record, or convert between classes and records.
thumbnail: ./thumbnail.png
seealso:
  - title: (video) Using Java 15 with IntelliJ IDEA
    href: "https://www.youtube.com/watch?v=IvytsoAUEZA"
  - title: (blog) IntelliJ IDEA Blog - Java 16 and IntelliJ IDEA
    href: "https://blog.jetbrains.com/idea/2021/03/java-16-and-intellij-idea/"
video: "https://youtu.be/I3tlRaWd-aI"
obsoletes:
  - /java/tips/create-record/
  - /java/tips/convert-to-record/
  - /java/tips/convert-from-record/
---

## Create record

Create a new record by pressing <kbd>⌘N</kbd> (macOS) / <kbd>Alt+Insert</kbd> (Windows/Linux) on the _Project_ tool window. From the _New Java Class_ dialog, type the name of the record and select the _Record_ type.

## Convert to record

IntelliJ IDEA can identify classes that are data holders and can be converted to records. The class will be highlighted with a warning. Press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and IntelliJ IDEA will suggest converting the class to a record.

The fields will be become record components, the constructor and accessors will be removed. If we had equals, hashCode and toString methods on our class, we can optionally remove these and rely on the default record implementation.

## Convert from record

If we decide that maybe a record should be a full Java class, we can get IntelliJ IDEA to automatically convert a record into a Java class.

Press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) on the record name, and IntelliJ IDEA offers a suggestion to convert the record to a class.
