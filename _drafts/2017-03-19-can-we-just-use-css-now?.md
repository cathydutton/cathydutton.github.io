---
title: You can do that in CSS
author: Cathy Dutton
layout: post
date:   2017-03-19
---

CSS pre=procesors have become a standard feature of front end applications. Features provided by the likes of Sass, Scss, Less, Stylus and Rework allow CSS to be managed in a way not previously possible. Variables allow for the re-use of properties, mixins help output DRY code and functions allow for calculations within CSS.

The questions I have started to ask myself latley however are "Do I still need to use a CSS pre-processors?" and "What problems am I solving by using one"


## Why I fell in love with Sass

I started to experiment with Sass around 5 or 6 years ago, and absolutly loved it.

### Variables
### Mixins
### Functions
### Nesting

There was of course the inevitable backlash against preprocessrs:  

 * The code output was not always as clean as it could have been
 * Over nesting created a reliance on DOM structure
 * Variables became un-managable
 * Developers become reliant on a tool instead of the language

 Leading to artices like this "LINK" and "LINK2"

 Overall the pro's outweighed the cons's and like most front end developers my personal sites are all built using Sass.

 If  harnessed correctly Sass still offered more advantages then disadvantages and allowed me to solve some common CSS problems.





## So what problems was Sass solveing?

I looked at how and more importantly why I was using Sass. The four main things that came you cross projects were... 




### 1) Re-usable properties 

https://css-tricks.com/making-custom-properties-css-variables-dynamic/


https://vgpena.github.io/winning-with-css-variables/

Sass provides the extra functionality of colour functions, meaning we can reduce the number of colour variables. These are particularly useful when creating hover or active states. 

Show example of hover state code

Show example of this with extra colour values for CSS custom properties.

Layout has been a longstanding source of frustration with CSS. Moving from table layouts to floated elements and even flex box there has never been an acepted standard convention. Particullybfor fluid/ responsive layouts. A Hugge plus point of working with a pre processor was the ability to create mixing or functions to handle layout in a manageable way. 

Show exampe

Easy markup to calculate percentage widths

One of the first partials I create is always the grid partial, I even created a framework as later a PostCSS plugin for my grid. But is this still nesacry?

With the browser support already in place CSS grid can remove the need to rely on pre processors to perfect your layout CSS

Show example

From custom properties...

However this can be resolved using CSS colour functions, like hsl() - explaining more and other functions. These CSS functions require an extra variable not nesacary with Sass but avoid having to find values for colours and allow for easy iterations and consistency between colour changes.

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

PostCSS can help with the transition without creatign a reliance on bolt on languages.





### Become less reliant on Sass, write CSS and phase out PostCSS as and when CSS gets better


Use Gulp to post process - less tying - free to remove from just one fie once complete
Autoprefixer

Now as features become more widley supported onky the gulp file and the post processing needs to. The CSS remains the sdame, creating a more stable codebase.

### Summary

This article is not about abandoming Sass because of the poorly output code or any of the other backlash articles. I still think Sass is an amazing tool, I also still think it is capable of producing CSS to solve real problems. My point is more that the original problems that Sass helped me to solve are no longer problems. CSS has moved on and can handle my needs by itself. I would still use Sass for any bespoke CSS needs or complex pieces, but in my day to day work it's inclusion is harder and harder to justify. 