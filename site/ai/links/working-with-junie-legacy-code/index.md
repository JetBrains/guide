---
date: 2025-06-05
title: "Working with Junie in Legacy Code"
topics:
  - ai
  - ai-community
  - junie
author: hs
subtitle: Isabel's personal experience using Junie, JetBrains coding agent, from small pet projects to big legacy systems
thumbnail: ./thumbnail.png
linkURL: "https://isabeliita90.hashnode.dev/working-with-junie-in-legacy-code"
---

Isabel's blog post tells the story of how she and her coworkers built up their confidence with Junie during the Junie EAP. That said, [Junie is now GA](https://www.jetbrains.com/junie/)!

I identified with Isabel's initial skepticism, I felt the same way, that's what started the banter between myself and [Paul](https://www.youtube.com/shorts/OImfRgIMC50)... and look where that ended up (I was totally right).

Isabel starting poking Junie with pet projects initially, and was quickly impressed with the results. Isabel got her colleagues involved, and they quickly grew in confidence and gave Junie more and more challenging tasks, discarding the original route they thought they'd go down about asking Junie to implement trivial features.

Enter legacy code! They are likely part of your workflow too, right? Isabel sets the scene and I think we can all identify with it in some form, specifically:

- Outdated libraries that no one maintains anymore
- No tests
- Messy architecture
- Business-critical, in production, and making money
- No observability

Isabel reflects on how Junie helped with all of these areas, starting with those all-important tests. Isabel notes that they had their first acceptance tests in 3 days and that while it's not easy for humans to find all the possible requests, Junie did it without complaint! While there were some errors from Junie around the request bodies and endpoints, there were huge time savings involved too. Lastly, Junie didn't shine in adding unit tests in Isabel's case or doing small steps, which is good to know. I think Junie is best with a delegated task while you focus on something fun and then you, as the smart developer, can come back and review the results.

It's great to hear that Junie is now a valuable tool in Isabel's development workflow, especially when it comes to complicated or unfamiliar codebases. I love Isabel's way of phrasing this; she says "it's like having an extra pair of hands and a fresh set of eyes - always ready to dig through layers of code, or do the boring stuff so I don't have to." I agree wholeheartedly here!
