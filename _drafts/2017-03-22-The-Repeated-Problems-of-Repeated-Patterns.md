---
layout: post
title: The Repeated Problems of Repeated Patterns
description: "Desc"
page-name: "post"
date:   2017-03-22
---

fdsfgsgdfgf

The problem of repetitive CSS is not a new one, many techniques both CSS and Sass can be used to tackle the problem, each with their own advantages and disadvantages.

The age old problem…

A common example used to demonstrate the repetitive problem is the button. Buttons are frequently used across websites often with only subtle differences in styling.

.button-primary {
   cursor: pointer;
   border: none;
   shadow: none;
   padding: 10px;
   font-size:14px;
   width:150px;
   margin:5px 0;
   text-align:center;
   display:block;
   color: white;
   background: black;
 }

 .button-secondary {
   cursor: pointer;
   border: none;
   shadow: none;
   padding: 10px;
   font-size:14px;
   width:150px;
   margin:5px 0;
   text-align:center;
   display:block;
   color: black;
   background: white;
 }




SECOND EXAMPLE , WRAPPER STYLES 

padding: 24px 30px;
border: 1px solid #b7bfc6;
background-color: #fff;

ON numerous containers <div class=”product-reviews”> <div class=”tabs-content”>

The above example has only two CSS properties with unique styles, and nine with repeated styles. Although only a minor issue in this example, on large scale websites problems like this can quickly get out of hand and lead to bloated CSS as well as selector and specificity issues.

Despite the issue being present in vanilla CSS, the miss use of some Sass properties has further highlighted the issue.

The example below shows the same button senario built in Sass, although aided the speed of development by allowing blocks of code to be included without re-writing…




@mixin btn($btn-color, $btn-background) {
   cursor: pointer;
   border: none;
   shadow: none;
   padding: 10px;
   font-size:14px;
   width:150px;
   margin:5px 0;
   text-align:center;
   display:block;
   color: $btn-color;
   background-color: $btn-background;
 }

 .button-primary {
   @include btn(white, black);
   color: white;
   background: black;
 }

 .button-secondary {
   @include btn(black, white);
   color: black;
   background: white;
 }

So how can this be avoided?

##@extend

Sass @extends, using @extend unlike mixins will not re-add chunks of code, but instead add the new selector to the existing code, a key advantage over mixin’s.

%btn {
   cursor: pointer;
   border: none;
   shadow: none;
   padding: 10px;
   font-size:14px;
   width:150px;
   margin:5px 0;
   text-align:center;
   display:block;
 }

 .button-primary {
   @include btn-background($green);
 }

 .button-secondary {
   @include btn-background($orange);
 }

This seems like a valid solution, however if used excessively on larger projects or alongside nesting @extends can create a different kind of problem…

.button-primary,
.button-secondary,
.button-tertiary,
.button-small,
.button-large {
   cursor: pointer;
   border: none;
   shadow: none;
   padding: 10px;
   font-size:14px;
   width:150px;
   margin:5px 0;
   text-align:center;
   display:block;
 }

Large selectors like this may reduce repeated code, but cause issues with selector limits and can cause problems for future development. @extends therefore should be used wisely and return the best results on small or basic websites.

###CSS3 partial attribute selectors

CSS3 introduced a series of new selectors enabling only sections of selectors to be targeted.

[class^=“button”]

This is an effective way of reducing repeated styles so long as the partial selector targeted is not used elsewhere.

###How about a Sass list

5) Sass lists — advantages, disadvantages, selectors, speed.

###So back to the old way?

3) Base Class Modifier class — advantages, disadvantages, selectors, speed.
http://bensmithett.com/bem-modifiers-multiple-classes-vs-extend/
could cause issues if you also have Js specific classes etc.




My preferred method from the above list is the Base Class and Modifier class although the out put very similar to that of the Sass list, i believe having two class makes it that little bit easier to see what is going on. This will make future changes quicker and simpler. it also

####In summery

A lot can be achieved by going back to basics and pairing basic CSS with well structured and thought out markup!
