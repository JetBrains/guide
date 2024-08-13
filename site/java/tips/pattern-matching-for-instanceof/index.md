---
date: 2021-05-05
title: Use Pattern Matching for instanceof
topics:
  - inspections
  - java
author: tg
subtitle: Inspections can guide us to use newer Java features.
thumbnail: ./thumbnail.png
video: "https://youtu.be/qCfuQkddCEM"
callToAction:
  url: "/java/tips/pattern-matching-switch/"
  message: "You can also use pattern matching for switch statements!"
---

If our code uses an instanceof followed by a cast, IntelliJ IDEA highlights these with a warning and suggests replacing this with pattern matching for instanceof. Note that this is only available if you're using a language level of Java 16 or above.

Press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and choose **Replace with pattern variable**.

```java
public class PatternMatchingSwitch {

 void outputValueInUpperCase(Object obj) {
  if (obj instanceof String) {
   String s = (String) obj;
   System.out.println(s);
  }
 }
}
```

You can press <kbd>⌥⏎</kbd> (macOS) / <kbd>Alt+Enter</kbd> (Windows/Linux) and choose **Replace 's' with pattern variable**.

```java
public class PatternMatchingSwitch {

    void outputValueInUpperCase(Object obj) {
        if (obj instanceof String s) {
            System.out.println(s);
        }
    }
}
```

{% cta %}
