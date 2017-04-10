---
title: CSS Myths
author: Cathy Dutton
layout: post
date:   2017-03-3
---


CSS get's a lot of stick, for being the easiest of the front end languages, for its global scope, inheritance and even for being broken. As a over of CSS the last one in particular hits a nerve, CSS is not broken purley because it does not behave in the same way as other programing languages.



## CSS is not broken

CSS is not broken, it works exactly as intended, you just need to utilise it properly.....


### CSS is easy

If CSS was simple, there wouldn't be half as may posts declaring that it's broken.

CSS is often seen as the simplest of the front end technologies, if ever CSS goes wrong on a project or becomes a problem it is the fault of the language itself as apposed to the fault of the people who wrote it. How can something so simple have been written wrongly?

### CSS is not scalable
Think outside the pixel, plan for change, don't add heights etc

CSS is scalable when used correctly,


### important! is bad

This leads nicly on to the next myth, important! is not bad, dirty or wrong by default. its existance ass a genuine CSS property alone should confirm that. It is used to.....

### There is no progresive enancement

You can use features to enhance the user experience in modern browsers and provide fallbacks for older versions from within CSS. @supports....

### It's just for making things pretty

Visualy hidden styles aid accesability and skip links, active and visited classes also.

### Shorthansd is always better

margin: 0 0 0 0
maregin-bottom: 0

You mat have to overide later

### There is no scope

CSS can be scoped using BEM, nested classes of double selector classes.

## You cant use functions

Calc() etc

### GLOBL SCOPE IS BAD - The cascade in cascading style shhets is a bad thing

You hear a lot of grunblings about CSS cascade and it's aparent negative inpacct on styesheets.  the glbal scope can be incerdibaly advantageous - new markup instantly looks and feels right, buttons links and headings are consistent. etc

If ypu find ourself relying on numerous declerations of important! to overide globall styles then you have a much bigger probblem then rouge CSS selectors.

"You should want “global” styles: colors and spacing should be consistent throughout your application. Similar components need to look similar. Your buttons should all be consistently sized and your box shadows or border radiuses should not be ad-hoc."

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

A bad workmen blames his tools, the feqtures of CSS are not secret, anyone can read up on and leqarn to write CSS in a structured and maintainable way. If you choose not to CSS will ruin your life.
