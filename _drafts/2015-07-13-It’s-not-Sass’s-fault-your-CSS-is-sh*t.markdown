---
layout: post
title: It’s not Sass’s fault your CSS is sh*t
description: "Desc"
page-name: "post"
---

Sass can be a great tool if used effectively, Variables, Mixins and Functions 
create a great base for re-usable components and modular codeing. Sass can also speed up development times and make it easier to update a large code base.

Sass however is a tool not a language, if used incorrectly the end result will be bad CSS. As with all tools and frameworks you get out what you put in, this is why it is essentialy to have a strong CSS skill set before moving to Sass.

Sass doesn’t create bad CSS, bad developers do.

Sass backlash


Despite this Sass has received bad press for creating ridiculously long selectors…..




Nesting — nest pseudo elements and states not everything! use BEM, bad coders not sass. & selector to help nest safely.

Variables — Use a style guide to define all colours and fonts etc, a good site has max of 2 fonts and 6 colours. Creatins confusing partials, hard to edit with confidance

too many variables become confusing and are never edited or re-used if people have no confidence in where they are being used.

body.editorial h1.tl-title {
 margin-left: $doc-line-height*6;
 margin-right: $doc-line-height*6;
}




A variable for every element?

$infoText: #3a87ad !default;
$infoBackground: #fff !default;
$infoBorder: #bce8f1 !default;

$highlightText: #32bfed !default;
$defaultText: #8f8f8f !default;
$darkerText: #8B8B8B !default;
$pageHeaderBg: #f9fafc !default;

For variations Sass colour functions could be used.

$blue-primary : #0060C1;
$blue-secondary : #218afb;
$blue-tertiary : #b7d9fe;
$blue-quaternary : #004f93;

Mixins — Overly specific short sighted solutions, cant grow with a site or company.

Creates bloated code base

@mixin gradient($from, $to) {
 background: background: linear-gradient($from, $to);
}

Args list, open ended future proof, re usable

@mixin linear-gradient($direction, $gradients...) {
  background: linear-gradient($direction, $gradients...);
}




Firstly lets look at some key factors behind the Sass backlash…

Nesting* — Probably the most attacked of all the Sass features, over nesting can result in some pretty horrible selectors. In my experience nesting is one of the most commonly used features amongst developers new to Sass, perhaps because it’s easy to implement and can speed up development time.

LAZY DEVELOPERS NEST show old nav example with classes and show nested usage ( before etc)

In the long run nesting can make a mess of your stylesheet, selectors become unnecessarily long and issues with specificity are created. Over nesting can also lead to increasing reliance on !important and complex partials that are difficult to edit.

<strong>There are so many reasons why this is just plain wrong, from rendering performance to file-size performance. Just think about how many bytes this will add to your CSS. But, the odds are you may say:

But that’s not the only problem! Since your styles are so specific to the DOM, maintainability is now a problem.</strong>

nav {

 ul {
 margin: 0;
 padding: 0;
 list-style: none;

 li { display: inline-block;

a {
 display: block;
 padding: 6px 12px;
 text-decoration: none;
 }
 }
 }
}




Output

nav ul {
 margin: 0;
 padding: 0;
 list-style: none;
}
nav ul li {
 display: inline-block;
}
nav ul li a {
 display: block;
 padding: 6px 12px;
 text-decoration: none;
}




*Mixins* — Mixins are a great time saver, which is perhaps the reason for there frequent use. A mixing is a handy way of re-using blocks of code without the hassle of re-writing everything. The issue however is that the CSS is output regardless of whether or not the Mixin is used. This makes the practice of creating mixn partials for every eventualty quite a dangerous one.

The Mixins code is also duplicated for each use adding bloat to the CS file.

@mixin error-message {
 color: #f00;
 border: 2px solid #fc0;
}

.error-default {
 @include error-message;
}

.error-special {
 @include error-message;
 background-color: #fcc;
}




output

.error-default {
 color: #f00;
 border: 2px solid #fc0;
}

.error-special {
 color: #f00;
 border: 2px solid #fc0;
 background-color: #fcc;
}




*@extends* — The miss use of @extend can cause a lot of problems with selectors….

As you may know, Sass is unable to extend an outer selector from within a media query. When doing so, the compiler simple crashes, telling you that you cannot do such a thing. Not great. Especially since media queries is almost all we do know.

To make this real, let’s look at an actual CSS styling rule from the WordPress plugin WooCommerce:
.product .single_add_to_cart_button, .cart .button, input.checkout-button.alt.button, .shipping-calculator-form .button, .multistep_step .button, #place_order.button, .single-product .single_add_to_cart_button.button.alt, .woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce #respond input#submit, .woocommerce #content input.button, .woocommerce-page a.button, .woocommerce-page button.button, .woocommerce-page input.button, .woocommerce-page #respond input#submit, .woocommerce-page #content input.button {
 background-color: #605f5e;
}










.message {
 border: 1px solid #ccc;
 padding: 10px;
 color: #333;
}

.success {
 @extend .message;
 border-color: green;
}

.error {
 @extend .message;
 border-color: red;
}

.warning {
 @extend .message;
 border-color: yellow;
}




output

.message, .success, .error, .warning {
 border: 1px solid #ccc;
 padding: 10px;
 color: #333;
}

.success {
 border-color: green;
}

.error {
 border-color: red;
}

.warning {
 border-color: yellow;
}




Nested extend




a{
 padding: 10px;
 color: #333;
}

nav {

 ul {
 margin: 0;
 padding: 0;
 list-style: none;

 li { display: inline-block;

a {
 @extend a;
 text-decoration: none;
 }
 }
 }
}




Output

a, nav ul li a {
 padding: 10px;
 color: #333;
}
















Reasons to love Sass


Functions

Grids

Speed










A bad workman blames his tools


Most of the issues mentioned above are not new, and were were not brought about solely by Sass. Issues with CSS bloat, bad selectors and repetitive code are commonly found in projects using vanilla CSS only.

Examples of Bad CSS….

Selectors such as First of Type equally dangerous if used incorrectly/ inaproprietly

overly repetitive css — Redundancy

Bad selectors — too specific etc — overspecificity

Dangerous selectors header div etc

Better html classes would prevent this










A bad workman blames his tools

You know your Sass is good when you spend most of the project writing CSS












































An even worse workman expects an out of the box open source system to fix all there problems.

There is a tool for pretty much everything these days, from drag and drop web builders to automated task runners and pre processors. A lot of these tools are great time savers and can enhance a project or at the very least speed up/eliminate mundane processes.

The problem with these tools is that developers can become reliant on them, or worst still not fully understand what the tool is doing.

It is important to remember that each tool, framework or methodology have been developed to solve specific problems, sometime on specific projects. They may not therefore be the right solution for your project.

Each project should have it’s own naming convention, grid system, methodology etc. That are tailored for that specific project and fulfil a very unique set of problems.




Why we use open source — documentation, easy to hire new developers etc.

How to fix — chose the closet mach for you and evolve/edit where nesacary.







Your using Sass wrong

Mixins

Mixins are one of many Sass features to come under fire for outputting un savoury CSS. Thos isn’t always the case though. A good mixin is open ended and offers a wide coverage of use cases. A lot of mixins out there seem to do very specific things, with one or two arguments and code that could be written out just as quickly. A good mixin should be a time saver, outputting vendor prefixes for example, but that can be used in numerous instances not just once or twice within a project.

@mixin gradient($direction, $list) { 
 background: $orange;
 background: -webkit-linear-gradient($direction, $list);
 background: -moz-linear-gradient($direction, $list);
 background: -o-linear-gradient($direction, $list);
 background: -ms-linear-gradient($direction, $list);
 background: linear-gradient($direction, $list);
 
}

@include gradient(left, $lista);




# It’s not Sass’s fault your code sucks!
#Dont blame Sass

Sass usage

The most commonly used Sass in day to day tasks are things like nesting, variables and extends, all the stuff that gets the bad press. If we eliminate those things most developers would probably find they tend to write very little Sass and a lot of original CSS.

This does not mean Sass is not useful, more that it’s use is in the architecture of a project. The part where patterns and layouts are defined to be used throughout the remainder of a project with little or no fuss.




Increased use of the term Vanilla CSS

I’ve read a lot lately about the negative impact Sass can have on style sheets. There have been a lot of features discussed as things Front end developers should stay away from to keep their CSS clean.

In part I agree with this view, Sass used badly can certainly have a destructive impact. However the benefits of properly integrating Sass into your workflow far out way the drawbacks.













nav {

 ul {
 margin: 0;
 padding: 0;
 list-style: none;

 li { display: inline-block;

a {
 display: block;
 padding: 6px 12px;
 text-decoration: none;
 }
 }
 }
}







nav ul {
 margin: 0;
 padding: 0;
 list-style: none;
}
nav ul li {
 display: inline-block;
}
nav ul li a {
 display: block;
 padding: 6px 12px;
 text-decoration: none;
}










### Sass love

Despite all of the issues discussed above, Sass is still a powerful and incredibly useful tool. The ability to calculate widths or text spacing from a set value allows wholesale changes to implemented with one variable change. Scaling a website built with Sass is much simpler and quicker to achieve.

Percentages, ( wouldn’t want to manually calculate grids) maths (vertical rhythm) variables if used properly

### Benefits of Sass…

even Vanilla CSS can create issues in the wrong hands (last child, first child, first of type etc, ) not scalable!




Aids scaleability

variables

functions

maths

Use case…

Grid

### Summery

In summery Sass does not create bad code, bad developers do.




It’s not only Sass that gets the blame for out of control CSS, people even on occasion blame css and it’s lack of scope.




Cascade
