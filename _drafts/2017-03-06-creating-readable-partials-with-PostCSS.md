---
title: Creating readable CSS partials with PostCSS
author: Cathy Dutton
layout: post
category: post
date:   2017-03-06
---

In my opinion one of the most valuable features of PostCSS is the ability to both change and create CSS properties
and values. CSS preprocessors give developers the ability to extend the functionality of CSS, creating functions,
mixins and loops all with the intention of speeding up development time and helping large scale projects remain
both manageable and scaleable.

The problem with this is the resulting Sass stylesheets are often full of selectors using complex functions and mixins
that are unreadable to new users, or even to the same developers who wrote them a couple of months down the line. For example
a couple of years ago I created numerous Sass functions to implement dynamic gradients and animations for a project at work.
These functions made perfect sense to me at the time and helped me to achieve the desired effect. Looking back the Sass is now
unusable without first devoting a lot of time to understanding each property value. This in its self goes against one of
the key arguments for using a preprocessor.

http://codepen.io/cathydutton/pen/vEeORQ

http://codepen.io/cathydutton/pen/FDipu

http://codepen.io/cathydutton/pen/vEeORQ

http://codepen.io/cathydutton/pen/twAja

https://www.sitepoint.com/dynamic-gradient-text-function-sass/

Code examples!!!!!!!


## Heading

Things would be so much simpler if the property values we used were more user friendly and simple to understand even with no
previous experience of the code base. PostCSS allows developers to create new CSS properties and to assign new values
to these properties creating clear and concise CSS that anybody can pick up and understand.

### Clearfix

A quick example of this is the PostCSS clearfix plugin https://github.com/seaneking/postcss-clearfix the markup used is not a
native CSS value but is still instantly understandable to any developer who reads it.

```
.foo {
  clear: fix; /* IE8+ */
}

.bar {
  clear: fix-legacy; /* IE6+ */
}

```


### Comparing ?????

To demonstrate this further I developed a PostCSS version of an existing Sass grid system I had previously worked on.

### Sass

The Sass version uses a mixin which is called for each selector

```
@include grid(3)            - Desktop spans 3 columns of $total-grid-columns
@include break-point(tablet, 6);  - Tablet spans 6 columns of $total-grid-columns
@include break-point(mobile, 12);   - Mobile spans 12 columns of $total-grid-columns
```




### PostCSS

```
.wrapper {
  grid-container: true;
}

```

``.wrapper {
  max-width: 1030.2px;
  min-width: 260px;
  margin: 0 auto;
  box-sizing: border-box;
}

.wrapper::after {
  content: "" ;
  display: table;
  clear: both;
}`

```


```
.four-elements {
  col-span: mobile(1,1);
  col-span: phablet(1,2);
  col-span: tablet(1,4);
}
```










```css
.twelve-elements {
  col-span: mobile(1,1);
  col-span: phablet(1,2);
  col-span: tablet(1,4);
  col-span: desktop(1,6);
  col-span: wide(1,12);
}
```

```css
.six-elements {
  col-span: mobile(1,2);
  col-span: tablet(1,3);
  col-span: desktop(1,6);
}
```
