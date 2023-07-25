---
date: 2023-07-14
title: "Exploring the Power of CSS Nesting: Simplifying Styling and Enhancing Readability"
subtitle: 'CSS NESTING is awesome'
technologies: []
topics: []
author: er
seealso:
- title: Run applications in WebStorm
  href: https://www.jetbrains.com/help/webstorm/running-applications.html
cardThumbnail: './card.png'
thumbnail: './card.png'

---


CSS nesting support landed in Chrome Stable in March 2023, WebStorm started to support it with the next major version 2023.2. Since this feature is relatively new, we want to share the capabilities that CSS Nesting provides and what it enables you as a developer to do.

## Background
You might be wondering why Nesting sounds familiar to you, and why you feel like you have used it before? Indeed, popular CSS-generating tools like SCSS and LESS have supported this feature for quite some time. But in fact, this is kind of a big deal as nesting is now an officially recognized feature in the  CSS Specification. There are also conversations about version 2 of the specification going on, which could further enhance the developer experience. The specification was not only motivated by the popularity of this feature in tools like SCSS and LESS, but also by the fact that it vastly reduces duplication and heavily improves the readability and maintainability of the written CSS code.

## What is CSS Nesting?
Fundamentally, as the name suggests, this feature lets nest CSS selectors and therefore group related styling. Let’s assume we want to style a button and we also want to style the hover effect of that button.
Usually, you would write CSS rules as separate scoped definitions, based on a given selector. Adding a hover effect to the already styled element requires you to reselect that given element and add the pseudo-class.


CSS Nesting lets you repurpose the element selector and nest the hover selector. This allows you to write your code more like this.


Using CSS Nesting here allows us, instead of redundantly specifying the parent selector (.my-button in this case), to group the styling and therefore implicitly refer to the parent selector.
You can also nest your CSS code deeper, which allows you to be more specific with your styles. Obviously with great power comes great responsibility, so don’t overdo it. By default, the SASS Linting rule suggests keeping the maximum depth of nesting to 2, making it a recommended best practice to follow.

Depending on the scenario you are looking at, you might also experience a severe reduction in the size of your code by using nested selectors. Instead of specifying the parent element over and over, nesting enables you to remove that part from your code. Looking at example 1 and example 2 we can see that nesting allows us to write more concise CSS code.

## Limitations

As of now, with the specification in version 1, you can not directly have an element selector nested inside another selector.

For this particular use case, the CSS Nesting Specification introduced the “&” selector. The following characters indicate a nested selector to the CSS parser.
```
& @ : . > ~ + # [ *
```
This is the reason why you don’t need a special character when you nest classes for instance, but you do need one for HTML elements. But don’t worry, in case you forget, WebStorm and other JetBrains products have you covered. In case you run into this particular scenario, your IDE will suggest you to apply the `&` prefix. as you can see in the screenshot above.

There is one more limitation though. CSS Preprocessor tools would allow you to use nesting to concatenate selectors by using the `&` selector. 

This feature is extremely useful when using methodologies like Block Element Modifier (BEM) for instance, but, on the other hand, it is very ambiguous. It’d be difficult for a parser to differentiate between a concatenated selector or a nested element selector, which could in theory also reference a custom element. Ensuring compatibility with existing web standards prevented this feature from landing in the specification.

## Browser Support

For a feature where the official specification was only done at the end of February 2023, we already have decent browser support for CSS Nesting, particularly if you are targeting modern browsers. As of now, some mobile browsers are still lacking support, but always make sure to consult canIuse for the latest in supported browser information.

## Summary
CSS Nesting is a great way to get more expressive in the way you write and structure your CSS code. Due to its already decent browser support, I’d highly recommend you to use it. With Version 2023.2 also your IDE can support you when necessary. Don’t forget the corner cases, where you have to use the ‘&’ selector when nesting element selectors.
Happy Coding!  
