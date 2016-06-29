---
layout: post
title: CSS for the unexpected
description: "CSS for the unexpected"
page-name: "post"
---


## Intro

Develop every application without assumptions, plan for changes in content, language, device and even direction.
Do not solve the problems that are right in front of you, solve the problems that are yet to exist.

When building a new application it is easy to be blinded by the visuals or prototypes that are right in front of
you. creating a layout that fits perfectly for the content provided however this will almost always turn out to
be a costly mistake.

Working with a closed minded approach leads to rigid applications, applications which break the minute the content is
updated or an image changes size. Problems will also occur should the application be internationalised, a
new device is released or the copy is updated.

Talk about looking at your feet/ fire fighting, things will never get easier this way, look up and prevent
issues rather then resolving issues.

Planning for the bigger picture, no fixed widths or heights, line heights etc. STOP THINKING IN PX's

Do not target elements directly, table, input etc with specific themeing properties (float’s, width’s etc)
It is also unsafe to target them with a pre-fixed wrapper (.wrapper table). This makes assumptions and will
break future layouts or lead to  CSS fixes like this…

```css
wrapper table.new-table-class {
float: none;
}
```

Instead target classes to ad anything other then base styles.

Open ended slash wide reaching mixins (not two colour arguments) they are restrictive. Give more mixin
examples. transitions etc.


## Text changes

General cms change - translations
titles/ buttons vertical and horizontal centering - not line hight
Content can change in all areas of the page
Don't use line height to vertivally centre or horizontaly centre.


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
Zooming and the different rounding of pixels in browsers ------ Barclays


## Summery - Flexible CSS
PostCSS - If all else fails you can go back and amend entire stylesheets wiTh PostCSS phrasing CSS
Accessibility - site should be able to adapt quickly - high contrast - larger font sizing
Layouts should not be defined by content
Line height -1.5 to centre images!
Font size — 1
display table — Chris coyer vid
flex box Chris coyer vid
