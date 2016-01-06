---
layout: post
title: Developing for the unexpected
description: "Desc"
page-name: "post"
---

Develop every application without assumptions, plan for changes in content, language, device and even direction. Do not solve the problems that are right in front of you, solve the problems that are yet to exist.

When building a new application it is easy to be blinded by the visuals or prototypes that are right in front of you. creating a layout that fits perfectly for the content provided however will usually turn out to be a mistake in the long run.

Working with a closed minded approach leads to rigid websites, websites which break the minuet the content is updated or an image changes size. Problems will also occur should the application be internationalised or a new device becomes popular.

Talk about looking at your feet/ fire fighting, things will never get easier this way, look up and prevent issues rather then resolving issues.

Planning for the bigger picture, no fixed widths or heights, line heights etc.

Do not target elements directly, table, input etc with specific themeing properties (float’s, width’s etc) It is also unsafe to target them with a pre-fixed wrapper (.wrapper table). This makes assumptions and will break future layouts or lead to  CSS fixes like this…

.wrapper table.new-table-class { float: none;}




Instead target classes to ad anything other then base styles.

Open ended slash wide reaching mixins (not two colour arguments) they are restrictive. Give more mixin examples. transitions etc.




Line height -1.5 to centre images!

Font size — 1

display table — Chris coyer vid

flex box Chris coyer vid




If you have to make changes at least make things easy to change by using properties in a more manageable way.

Using inherit, current color etc

Why You Need to Refactor Your CSS
As Ethan pointed out in his popular Foundry post, naming your CSS classes can be hard. One of the things that can add…seesparkbox.com




Zooming and the different rounding of pixels in browsers
