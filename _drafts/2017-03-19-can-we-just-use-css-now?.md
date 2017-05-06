---
title: You can do that in CSS
author: Cathy Dutton
layout: post
date:   2017-03-19
---

For the last 5-6 years at least it has been a given that any new digital project will be using some from of CSS pre-processors. The question is always 'which pre-processors shall we use?' not 'Do we need to use a pre-processors?'

Thats because of all the extended features provided by the likes of Sass, Scss, Less, Stylus and Rework. These pre-processors allow CSS to be managed in a way not previously possible. Variables allow for the re-use of properties, mixins help output DRY code and functions allow for calculations within CSS.

There was of course the inevitable backlash against theese tools:  

 * The code output was not always as clean as it could have been
 * Over nesting created a reliance on DOM structure
 * ??????
  * ??????

But overall the pro's outweighed the cons's and like most front end developers my personal sites are all built using Sass.

## Why I fell in love with Sass

### Variables
### Mixins
### Functions
### Nesting

## What did this solve?

Looking through projects it's clear what the most  Sass gains were: 

### Layout
### Re-usable properties
### Mixins
### Typography

### Can CSS now do these things alone?


### Layout
### Re-usable properties
### Mixins
### Typography

Grid CS
Custom properties
Calc for font sizes and vertical rhythem

PostCSS can help with the transition


But not for all browsers!!!!!!


### Become less reliant on Sass, write CSS and phase out PostCSS as and when CSS gets better


Use Gulp to post process - less tying - free to remove from just one fie once complete
Autoprefixer

Now as features become more widley supported onky the gulp file and the post processing needs to. The CSS remains the sdame, creating a more stable codebase.