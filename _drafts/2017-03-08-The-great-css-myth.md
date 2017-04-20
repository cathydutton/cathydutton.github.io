---
title: CSS Myths
author: Cathy Dutton
layout: post
date:   2017-03-3
---

CSS get's a lot of stick, which upsets me given a lot of the time these criticisms are unfair, untrue or both. CSS is not broken, it behaves in the intended manner and if utilised correctly is an amazing tool.

This post aims to highlight some of the common misconceptions or myths around CSS.

### CSS is broken

A popular topic of late and one I don't intend to write too much about in this post. That has been done brilliantly already in articles like theese...

https://clearleft.com/posts/454

http://keithjgrant.com/posts/2017/03/css-is-not-broken/

In summary CSS is not broken, it just isnt a programing language and therfore should not be excpected to behave like one.


### CSS is easy
CSS is not easy, it may been seen as the simplest of the front end languages but creating a maintainable CSS code base at scale is a difficult skill to master. Like no other front end language any changes made in CSS have the potential to affect the global landscape, meaning extra discipline and knowledge are required.

A detailed understanding of key CSS features is essential, these features are frequently misunderstood leading to assumptions that CSS itself is broken.

#### Cascade
CSS declarations cascade down to elements from many origins.

"CSS is an acronym of Cascading Style Sheets, which indicates that the notion of the cascade is important. At its most basic level it indicates that the order of CSS rules matter, but it's more complex than that. What selectors win out in the cascade depends on three factors (these are listed in order of weight — earlier ones will overrule later ones):

Importance
Specificity
Source order"

#### Inheritance
"is the means by which, in the absence of any specific declarations applied by the CSS cascade, a property value of an element is obtained from its parent element.""

#### Specificity
"Specificity is a mechanism within the CSS cascade that aids conflict resolution. The concept of specificity states that when two or more declarations that apply to the same element, and set the same property, have the same importance and origin, the declaration with the most specific selector will take precedence.""




### Global scope is a bad thing

CSS is global by default, which is a good thing if you know how to harnece it.

The cascade and inheritance together determine how an element will be styled. between them creating a global scope. This is not a bad thing!

<blockquote>
The CSS cascade assigns a weight to each style rule. When several rules apply, the one with the greatest weight takes precedence.

https://www.w3.org/TR/CSS2/cascade.html
</blockquote>

You hear a lot of grumblings about the CSS cascade and it's apparent negative impact on a project. It is often compared to the localised scoping features of JavaScript

The global scope can be incredibly advantageous - new markup instantly looks and feels right, buttons links and headings are consistent. etc

If YOU find ourself relying on numerous declarations of important! to override global styles then you have a much bigger problem then rouge CSS selectors.

"You should want “global” styles: colors and spacing should be consistent throughout your application. Similar components need to look similar. Your buttons should all be consistently sized and your box shadows or border radiuses should not be ad-hoc."

### There is no scope
 Despite the in-built cascade and inheritance, CSS can be scoped. Using BEM, nested classes of double selector classes CSS can target specific chunks of UI without effecting the entire UI.


### important! is bad

"CSS is an acronym of Cascading Style Sheets, which indicates that the notion of the cascade is important. At its most basic level it indicates that the order of CSS rules matter, but it's more complex than that. What selectors win out in the cascade depends on three factors (these are listed in order of weight — earlier ones will overrule later ones):

Importance
Specificity
Source order"

Overides specificity and source order in the cascade.

Used to overriding author stylesheets

<blockquote>
6.4.2 !important rules

CSS attempts to create a balance of power between author and user style sheets. By default, rules in an author's style sheet override those in a user's style sheet (see cascade rule 3).

However, for balance, an "!important" declaration (the delimiter token "!" and keyword "important" follow the declaration) takes precedence over a normal declaration. Both author and user style sheets may contain "!important" declarations, and user "!important" rules override author "!important" rules. This CSS feature improves accessibility of documents by giving users with special requirements (large fonts, color combinations, etc.) control over presentation.

The most common way to use user style sheets is to add the underline back to links. You would do this by simply adding the following CSS property to your user style sheet:

'''
:link, :visited { text-decoration: underline ! important; }
'''


</blocquote>
This leads nicely on to the next myth, important! is not always bad. its existence as a genuine CSS property alone should confirm that. Prviding it is used responsibly and for it's intended purposes it is fine to use.

### There is no progressive enhancement
Progressive enhancement is a strategy that promotes delivering the core content and functionality to all bowsers and devices as the primary concern. Then progressively adding extra 'nice to have's' for browsers/devices that allow.

In CSS this approach can be adopted by using the @supports rule. This rule provides the ability to check if a CSS feature is supported before implementing.

CODE EXAMPLE - a nice to have anamate in thing

This also works for graceful degradation by providing fallbacks for browsers wer features are not supported. To do this @supports not is used...

CODE EXAMPLE



### It's just for making things pretty

CSS can do more then simply apply the aesthetics to an applications UI. It can also play a role in enhancing the accessibility of a project.

CSS can amongst other things also be used to...

- Enhance the readability of content (Font-size, color, line-height)
- Replace the default underline on links to avoid cutting through descenders (Example CSS)
- Visually hidden styles aid accessibility
- active and visited classes also
- skip links



### Shorthand is better
Shorthand properties allow multiple values to be set for a group of CSS properties simultaneously. There are 6 shorthand properties to date font, background, margin, border, padding and list.

The feature is intended to allow for more concise and more readable style sheets, as well as saving time and being more performant.

'''
font-style: italic;
font-weight: bold;
font-size: .8em;
line-height: 1.2;
font-family: Arial, sans-serif;
'''

'''
font: italic bold .8em/1.2 Arial, sans-serif;
'''

However a value which is not specified is automatically set to its initial value. Therefore the shorthand syntax is not always the most effective approach.


#### Good use case

'''
padding: 10px;
'''

'''
padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 10px;
'''

#### Good use case if you want it everywhere

'''
margin: 0
'''

'''
margin-top: 0
margin-right: 0
margin-bottom: 0
margin-left: 0
'''

'''
.foo {
  margin: 12px 17px 16px 10px;
}
'''

#### Bad use case
'''
margin: 0 auto;
'''

'''
margin-right: auto;
margin-left:  auto;
'''




 - You mat have to override later



### You cant use functions

CSS is defined as a mark up language not a programing or scripting language, however it does come with some functions included.

 - Calc() etc
 -
 -
 -

https://www.w3schools.com/cssref/css_functions.asp


### You need a framework

There are loads of helpful frameworks to speed up CSS projects and get the base promciples in place.

- Normalize
- Print.CSS
- a11y
- ITCSS
- Smacss
- OOCSS
- Fondation
- Bootstrap
- The one that Dave mentioned

These are useful and safe, but you should understand them before you use them.

You do not have to use a CSS framework, and there are a lot of them out there. This implies that to create good code without one is difficult or even imposible, it isn't.

### Frameworks are bad

Following on from the point above, frameworks are not essential but that doesn't mean they are all bad. The important thing is that you understand how and why they work before using them.

You should have an understanding of the tools you use so that you can function without the framework when needed, and most importantly so that you understand how and why things are working.

### If it's new you should be using it
Talk about targeting dom secific stuff in CSS 4
Talk about browser support


### Inline CSS is bad

For speed and loading it can be good





### In summary

A bad workmen blames his tools, the featured of CSS are not secret, anyone can read up on and learn to write good CSS in a structured and maintainable way. If you choose not to CSS can become a nightmare.
