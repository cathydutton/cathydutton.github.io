---
layout: post
title: CSS without assumption
description: "CSS for the unexpected"
page-name: "post"
---

“Build your website to work in situations you haven’t imagined, and on devices that don’t yet exist” — Jeffrey Zeldman

Turn into 10 steps/ advice and tips for developing for the unexpected

When prototyping for digital projects we often work with sample data which fits perfectly with the UI. Projects are also prone to changing goal posts or revised features not to mention changes in technology, languages or device sizes. Keeping a project simple and enjoyable to work with can be difficult 

When starting work on a new digital project it is easy to be blinded by the visuals or prototypes that are right in front of
you, creating a codebase that fits perfectly for the content provided. This approach however will almost always
turn out to be a costly mistake.



1)
2)
3)
4)
5)
6)
7)
8)
9)
10) Resources - https://github.com/Heydon/forceFeed






Branding - Keep colors, fonts, spacing etc in a variables or settings partial that can be quicly and easily updated. CSS variables, Sass, Less.

Buttons - Use transparent for the button without a background, not white. The white background may change

Utalise the inherit property.

Forget about Pixels



### Develop every application without assumption



### Stop thinking in PX's

Working with a pixel perfect approach is a fairly old request  blah blah leads to rigid applications, which can break the minute the content
is updated or an image changes size. Problems will also occur should the application be translated, a
new device is released or the copy is updated.

Instead we should try to plan for the unknown from the outset, each new project should be approached from
the most unlikely situation and worked backwards to create an UI that works in all situations. Working in
this way may be more time consuming in the beginning, but will prevent the need for endless firefighting in
the future.


## Text changes

When building any website or application we should expect and plan for the copy to change. This can be
the main body or content or even just the text on a button.

General cms changes to copy
titles/ buttons vertical and horizontal centering - not line hight
Don't use line height to vertivally centre or horizontaly centre.









## Language changes

Language changes can effect more then just a page layout, right to left languages can require a full layout
re-think

translations
left to write speaking countries.
If this hasnt been planned for you can use PostCSS to go back to edit it.
large button with chinese symbol in it - remove foxxe width just have em padding left and right.




## Branding changes

Color variables named properly
primary color not blue etc
CSS Custom properties introducing scope, planning for change - high contrast etc.
Using inherit, current color etc




## layout changes
Patterns not pages related stuff
Modules not pages




## Screen size changes
Element queries
content first etc
Don't think in PX's??????
Devices can change




## User behaviour

It should never be assumed that a users behaviour will mirror that of the developer or designer on a
project.


Zooming and the different rounding of pixels in browsers ------ Barclays




## Summery - Flexible CSS
PostCSS - If all else fails you can go back and amend entire stylesheets wiTh PostCSS phrasing CSS
Accessibility - site should be able to adapt quickly - high contrast - larger font sizing
Layouts should not be defined by content
Line height -1.5 to centre images!
Font size — 1
display table — Chris coyer vid
flex box Chris coyer vid

Do not solve the problems that are right in front of you, solve the problems that are yet to exist.
