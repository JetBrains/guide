---
hasBody: true
date: 2021-05-05
title: Use Pattern Matching for instanceof
technologies: [java]
topics: [inspections]
author: tg
subtitle: Inspections can guide us to use new Java features
thumbnail: ./thumbnail.png
cardThumbnail: ./card.png
shortVideo:
  poster: ./tip.png
  url: https://youtu.be/qCfuQkddCEM
leadin: |
  If our code uses an instanceof followed by a cast, IntelliJ IDEA highlights these with a warning and suggests replacing this with pattern matching for instanceof.   Note that this is only available if you're using a language level of Java 16 or above.

---

Press **⌥⏎** (macOS) or **Alt+Enter** (Windows/Linux) and choose "Replace with pattern variable".

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

You can press ⌥⏎ (macOS) or Alt+Enter (Windows/Linux) and choose "Replace 's' with pattern variable".

```java
public class PatternMatchingSwitch {

    void outputValueInUpperCase(Object obj) {
        if (obj instanceof String s) {
            System.out.println(s);
        }
    }
}
```
