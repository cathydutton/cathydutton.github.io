---
title: Jekyll, Gulp and Github
author: Cathy Dutton
layout: post
date:   2018-015-01
category: post
date:   2017-03-15
---


Gt hub now has HTTPS pages so no need for Cloadfare ir the likes of.

IF YOU REMOVE THE TIMESTAMP THE NEW PROCESS WORKS SO YOU CAN FINNISH THIS, make timestamp work in inject file!

I spend a ridiculous amount of time updating my personal website and blog....

 Jekyll, Gulp and Github

 Minify production code
 add cache bust
 and critical css

 Clean old cached files

 Clean site folder on live build

  Exclude jekyll folders

 Don't watch _assets folder - Gulp not Jekyll to control

 jekyl drafts in production
 
 add a11y css to dev build

## Heading ????

Separating environments can be useful for may reasons personally I like to run a11y.css in my local environment. Having it switched on continuously encourages me to actually fix the errors and suggestions. I also need to see updates to CSS and markup in real time. To do this I compile a separate CSS file to the versioned file used in production.

## Setting up the environments

In Jekyll you can create multiple config files to manage different environments
<!-- <a href="https://jekyllrb.com/docs/configuration/" title="Jekyll config file documentation" target="_blank"></a> -->

<!-- #### _config_dev.yml &amp; _config.yml -->

```
# Site settings
environment: production
title: Cheshire based Interaction Designer &amp; Front End Developer - Cathy Dutton
description: A UX/Interaction Designer and Front End Developer based in Warrington, Cheshire. Specialising in CSS, UX, Accessibility and inclusive design.
email: info@cathydutton.co.uk
```


```
# Site settings
environment: live
title: Cheshire based Interaction Designer &amp; Front End Developer - Cathy Dutton
description: A UX/Interaction Designer and Front End Developer based in Warrington, Cheshire. Specialising in CSS, UX, Accessibility and inclusive design.
email: info@cathydutton.co.uk
```


### If statement in Jekyll code.

```
{% if jekyll.environment == 'development' %}
	   // Development code
		{% else %}
    // production code
    {% endif %}
```

### Gulp file

Need to make the gulp file work for live and deployments


```
gulp.task('jekyll-dev', () => {
  var productionEnv = process.env;
  productionEnv.JEKYLL_ENV = 'development';
  const jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);
```




```
gulp.task('jekyll-live', () => {
  var liveEnv = process.env;
  liveEnv.JEKYLL_ENV = 'live';
  const jekyll = child.spawn('jekyll', ['serve',
    // '--watch',
    // '--incremental'
    // '--drafts'
  ]);
```


### Deploy to gh pages ob github
