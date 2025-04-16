---
date: 2025-04-16
title: 'Review: "JetBrains AI Assistant Review - Tommy Reviews"'
topics:
  - ai
  - aia
  - ai-community
author: pwe
subtitle: "Hands-on look at AI Assistant in WebStorm and PyCharm."
thumbnail: ./thumbnail.jpg
linkURL: "https://www.youtube.com/watch?v=eSLqZKWLY3A"
---

What's the value of AI in an IDE? [Tommy Codes](https://www.youtube.com/@tommy_codes_5) walks us through this in a
January AI Assistant review which I felt did a good job of telling the story. Tommy starts with a bunch of questions
that are spot-on for how I think of AI assistance in JetBrains IDEs. "Would you rather automate than be automated?"
Sign...me...up!

As the video comments showed, lots of folks vibed with the point made in the lead-in. Even though his video is four
months old, AI Assistant was already picking up steam and improving fast, which was noted in the replies. Since then,
lots has happened, but Tommy's fundamental points remain valid.

In his video, Tommy covered:

- Exploring main features
- Telling what's good and what's still hype
- Final verdict

I was happy to see he began with WebStorm. He started with the "old" way: copy code from WebStorm into Claude, get an
answer, copy back. Barf. This is manual and tedious, but also doesn't include extra context without more copy-and-paste.
Instead, he showed selecting the code and using an inline prompt to update inline, then accept. I also prefer inline
prompts: less distracting and collects context in-place.

Tommy then showed a chat window, but I liked the emphasis on inline. As he said, chat is verbose, though some may prefer
that style. As he noted, all the UI components in the chat result match what you expect in other parts of the IDE that
you already know. For example a `Run snippet` button on a chat result would trigger an `npm install`. He also showed in
chat how to provide extra context in the chat prompt using a `#` and autocompleting a filename.

After that, a tour of various Alt-Enter AI Actions. He wasn't a fan, but showed how to make your own prompts which use
special built-in variables such as `$SELECTION`. These can then show up in Alt-Enter AI Actions.

Then it was over to PyCharm...huzzah, my two faves. He forced an exception, then showed `Explain with AI` button in the
output. A built-in prompt to include the exception and the file, then open the chat with the result.

Tommy gave a list of models and mentioned the lack of transparency about what models are used. Since January, a lot
changed on that front: new models and a drop-down chooser.

He noted another downside: built-in prompts aren't fully transparent and control about the context being included on
those. Then, a note that it's a little slow, but added, that's true for any LLM.

In closing, he gave his likes:

- Loves how it is integrated into the IDE, feels at home in the UI. Not overwhelming, easy to disable.
- Price is reasonable.
- Not based on VS Code, meaning, he gets the IDE he knows and trusts.

Tommy's verdict: The value isn't the underlying AI, it's how it "plums" your code into the AI tools in a seamless way.
As he said in the closing: "Big thumbs up."
