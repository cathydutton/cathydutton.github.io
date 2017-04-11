---
title: CSS Myths
author: Cathy Dutton
layout: post
date:   2017-03-3
---

CSS get's a lot of stick, which upsets me, a lot of the time the criticisms are unfair, untrue or both. CSS is not broken, it behaves in the intended manner and if utilised correctly is an amazing tool.

This post aims to highlight some of the common misconceptions around CSS.


### CSS is easy
CSS is not easy, it may been seen as the simplest of the front end languages but creating a maintainable CSS code base at scale is a skill in it's self.

How can a simple thing go so badly wrong so often?


### The cascade is a bad thing

You hear a lot of grunblings about CSS cascade and it's aparent negative inpacct on styesheets.  the global scope can be incerdibaly advantageous - new markup instantly looks and feels right, buttons links and headings are consistent. etc

If ypu find ourself relying on numerous declerations of important! to overide globall styles then you have a much bigger probblem then rouge CSS selectors.

"You should want “global” styles: colors and spacing should be consistent throughout your application. Similar components need to look similar. Your buttons should all be consistently sized and your box shadows or border radiuses should not be ad-hoc."

### There is no scope

Despite the inbuilt cascade, CSS can be scoped. Using BEM, nested classes of double selector classes CSS can target specific chunks of UI without effecting the app globally.


### important! is bad

This leads nicely on to the next myth, important! is not bad, dirty or wrong by default. its existence ass a genuine CSS property alone should confirm that. It is used to.....

### There is no progressive enhancement

You can use features to enhance the user experience in modern browsers and provide fallbacks for older versions from within CSS. @supports....

### It's just for making things pretty

CSS can do more then simply apply the aesthetics to an applications UI. It can also play a role in enhancing the accessibility of a project. 

CSS can amongst other things also be used to...

- Enhance the readability of content (Font-size, color, line-height)
- Replace the default underline on links to avoid cutting through descenders (Example CSS)
- Visually hidden styles aid accessibility
- active and visited classes also
- skip links



### Shorthand is always better

margin: 0 0 0 0
maregin-bottom: 0

You mat have to overide later



### You cant use functions

CSS is defined as a mark up language not a programing or scripting language

Calc() etc

https://www.w3schools.com/cssref/css_functions.asp


### You need a framework

There are loads of helpful frameworks to speed up CSS projects, Print.CSS defaults, resets a11y etc

These are usefull and safe, but you should understand them before you use them.

Ypou do not have to use a CSS framework, and there are a lot of them out there. This implies that to create good code without one is difficult or even imposible, it isn't.

### Frameworks are bad

Following on from the point above, frameworks are not essential but that doesn't mean they are all bad. The important thing is that you understand how and why they work before using them.

You should have an understanding of the tools you use so that you can function without the framework when needed.

### New features should always be awesome
Talk about targeting dom secific stuff


### It cant be optimised

for speed


### In summary

A bad workmen blames his tools, the featured of CSS are not secret, anyone can read up on and learn to write CSS in a structured and maintainable way. If you choose not to CSS can be a nightmare.




<!-- ### CSS is not scalable
CSS is scalable when used correctly,

Think outside the pixel, plan for change, don't add heights (magic numbers) etc

"The real way to scale css, is to stop writing css." -->


<!-- Avoid specificity by harnessing the cascade -->
