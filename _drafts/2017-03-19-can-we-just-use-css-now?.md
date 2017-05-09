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

 If used harnessed correctly Sass still offered more advantages then disadvantages and allowed me to solve some common CSS problems.





## What did Sass solve?

So I was happy that the features of Sass are pretty cool, but are they actually solving my problems with CSS?

Looking through my projects I identified the main use cases: 

### Layout - 
### Re-usable properties - 
### Media queries - 
### Typography - 

### Is this still the case?

Some of the things I use Sass for can now be handled directly in CSS.

### Layout - CSS grid
### Re-usable properties - CSS custom properties
### Media queries - 
### Typography / Verticla rhythem 0- calc?

### Legacy browsers

This may be the case for modern browsers, but what if you need to support older versions, or use browser specific features?

PostCSS can help with the transition





### Become less reliant on Sass, write CSS and phase out PostCSS as and when CSS gets better


Use Gulp to post process - less tying - free to remove from just one fie once complete
Autoprefixer

Now as features become more widley supported onky the gulp file and the post processing needs to. The CSS remains the sdame, creating a more stable codebase.
