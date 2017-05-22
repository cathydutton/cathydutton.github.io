---
title: You can do that in CSS
author: Cathy Dutton
layout: post
date:   2017-03-19
---

CSS preprocessors have become a standard feature of front end applications. Features provided by the likes of Sass, Scss, Less, Stylus and Rework allow CSS to be approached in ways not previously possible. Variables allow for the re-use of properties, mixins help output DRY CSS and functions allow for calculations to be made.

The questions I have started to ask myself lately however are:

 * What problems am I solving with Sass?

 and:

 * Do I still need to use a CSS preprocessor? 



## Why I fell in love with Sass

I started to experiment with Sass around 5 or 6 years ago, and absolutely loved it.

### Variables

Variables allowed me to set property values in one place making branding and theme creation much simpler. 

### Mixins

I used mixins to simplify the process of using patterns in my CSS. The ability to pass options to a mixin allows the code to remain flexible whilst removing the need to re-write lines of CSS.

### Functions

Functions provided a way to use logic in CSS probably one of the most powerful features of Sass. By using functions to create flexible grid layouts the reliance on markup classes was removed, as well as the need for manual calculations.

### Nesting

Nesting allowed for groups of classes to be grouped together forming a dependance tree and form of scoping. This is particularly useful for states such as anchors with active, hover and focus states.

### Sass backlash

There was of course the inevitable backlash against preprocessors:  

 * The code output was not always as clean as it could have been
 * Over nesting created a reliance on DOM structure
 * Variables became unmanageable
 * Developers become reliant on a tool instead of the language

 Leading to articles like this "LINK" and "LINK2"

 Overall the pro's outweighed the cons's and like most front end developers my personal sites are all built using Sass.

 If  harnessed correctly Sass still offered more advantages then disadvantages and allowed me to solve some common CSS problems.





## So what problems was I solving with Sass?

<!-- I looked at how and more importantly why I was using Sass. The four main things that came you cross projects were...  -->




### 1) Re-usable properties 

https://css-tricks.com/making-custom-properties-css-variables-dynamic/
https://vgpena.github.io/winning-with-css-variables/

Sass provides the extra functionality of color functions, meaning we can reduce the number of color variables. These are particularly useful when creating hover or active states. 

Show example of hover state code

Show example of this with extra color values for CSS custom properties.

Layout has been a longstanding source of frustration with CSS. Moving from table layouts to floated elements and even flex box there has never been an accepted standard convention. particularly for fluid/ responsive layouts. A Huge plus point of working with a pre processor was the ability to create mixing or functions to handle layout in a manageable way. 

Show example

Easy markup to calculate percentage widths

One of the first partials I create is always the grid partial, I even created a framework as later a PostCSS plugin for my grid. But is this still necessary?

With the browser support already in place CSS grid can remove the need to rely on pre processors to perfect your layout CSS

Show example

From custom properties...

However this can be resolved using CSS colour functions, like hsl() - explaining more and other functions. These CSS functions require an extra variable not necessary with Sass but avoid having to find values for colours and allow for easy iterations and consistency between colour changes.

https://drafts.csswg.org/css-color/. 

Colour mod function - not great at support

rgba() colour function
https://css-tricks.com/the-power-of-rgba/

CSS4 color() provides color transformations usually only possible with a processor.

https://cloudfour.com/thinks/building-themes-with-css4-color-features/

Could actually be better then variables and color transformations in Sass. 


Again PostCSS can supply the fallback options removing reliance on pre processors. 

#### 2) Layout - 

#### 3) Media queries - 

#### 4) Typography - 

#### Is this still the case?








### Legacy browsers

This may be the case for modern browsers, but what if you need to support older versions, or use browser specific features?

PostCSS can help with the transition without creating a reliance on bolt on languages.





### Become less reliant on Sass, write CSS and phase out PostCSS as and when CSS gets better


Use Gulp to post process - less tying - free to remove from just one fie once complete
Autoprefixer

Now as features become more widley supported only the gulp file and the post processing needs to. The CSS remains the same, creating a more stable codebase.

### Summary

This article is not about abandoning Sass because of the poorly output code or any of the other backlash articles. I still think Sass is an amazing tool, I also still think it is capable of producing CSS to solve real problems. My point is more that the original problems that Sass helped me to solve are no longer problems. CSS has moved on and can handle my needs by itself. I would still use Sass for any bespoke CSS needs or complex pieces, but in my day to day work it's inclusion is harder and harder to justify. 
