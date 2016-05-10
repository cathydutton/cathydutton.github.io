---
layout: post
title: CSS for the unexpected
description: "Desc"
page-name: "post"
---

Variables - but done properly - custom properties - colour functions in CSS and processors

CSS Custom properties introducing scope, planning for change - high contrast etc.

Don't think in PX's

Using inherit, current color etc

Modules not pages

Content can change

Devices can change

Flexible CSS

Layouts should not be defined by content

Line height -1.5 to centre images!

Font size — 1

display table — Chris coyer vid

flex box Chris coyer vid

Zooming and the different rounding of pixels in browsers ------ Barclays

Accessibility - site should be able to adapt quickly - high contrast - larger font sizing

Don't use line height to vertivally centre or horizontaly centre.



PostCSS - If all else fails you can go back and amend entire stylesheets wiTh PostCSS phrasing CSS



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

.wrapper table.new-table-class { float: none;} Instead target classes to ad anything other then base styles.

Open ended slash wide reaching mixins (not two colour arguments) they are restrictive. Give more mixin
examples. transitions etc.

