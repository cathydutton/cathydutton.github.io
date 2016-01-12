---
layout: post
title: Create modular code through design
Author: Cathy Dutton
---
Pulling down the fence
Create a structured code base by synchronising the design and development process. 

MENTION SQUADS

Intro

It’s been 10 years since I built my first website, (and it was awful). Back then my frst task with any web project was to layout all the necessary pages in Photoshop, creating page specific designs with set dimensions.  This ‘page by page’ approach then transferred to the development phase. 

This process was very linear.

A developer working in this way will create page specific styling and repetitive CSS.  By integrating the design and development process the code output can be structured, better organised and re-usable.


Development process

The way websites are built has changed over the years, projects are no longer viewed as a series of pages, but a series of modules, or features. These features become the building blocks of websites and applications.

The development process has moved on from simply recreating the Photo-shopped images in HTML and CSS. The code has to be both flexible scalable and maintainable. 

Planning for future development or design changes mean the code has to be easy to adapt and to add to.  If the CSS is aligned to pages, moving small blocks can be difficult, leading to bloated code bases that are messy and difficult to work with.

CSS methodologies such as SMACCS and ITCSS tackle these problems by creating layers of CSS. The base layers are generic styles and repeated patterns for things like typography, color schemes and spacing. The bottom layers are for more specific styling.  

Prototypes of elements (Style Guides not pages) — pattern libraries and toolkits should be the first layer — fitting in with popular coding architectures (base, etc)


An example of the CSS structure using ITCSS

Settings — Global variables & config
Tools — Default mixins & functions
Generic — Normalize, resets, box-sizing
Base — HTML elements
Objects — Design patterns
Components — Modules & blocks of code
Trumps — Helpers & overrides


Methodologies like this rely on access to designs for the entire application; decisions cannot be made when designs are delivered page by page. More information on the layers and there usage can be found here , SMACCS, ITCSS.


Working together

Modular design aides modular coding , forcing developers and designers to think about scalability, fluidity and changeability (using blocks on different pages seamlessly)

To build modular, re-usable code in the ways outlined above, the design process should follow a similar pattern.

Development and design are not two stand alone tasks, the two processes should work side by side, first creating style guides and then component libraries.


The end of pages

So simply designing page after page and then ‘throwing them over the fence to the development team no longer works. As with the development process the design needs to first create the base layers and repeated patterns in the form of a style guide.

Components or modules can then be created individually without the restraints of pages and containers.


Style Guide

Before we begin to think about layouts or the structure of site components we first need a fully thought out and coded style guide. The design of fonts and headings, calls to action and links etc should be built at the very beginning of the process. 

By providing a style guide right at the start of the project the base layer of the CSS methodology can be constructed. Having access to all the potential color variants, fonts, headings and spacing right at the start will enable a developer to structure the CSS much more effectively, organising default styles on a base level.

With all a designs repeated patterns defined, mixins, functions and variables can be set up. If done effectively all of the Sass (or Less) work should be completed at this stage. All components and modules should be built up from this base level CSS, with any unique styling written at component level in CSS. Working in this way also allows for site wide design changes to be implemented by altering only the effected variable or function.

```
$line-height: 1.5;

.heading {
      line-height: $line-height;	
}

. review--heading {
      line-height: ($line-height /3);
}
```


Component library

Once the coded style guide is in place each module or component should be designed as an individual block, which is able to be used anywhere in the site. By designing this way the resulting code will also be re-usable. 

With a set of repeated patterns already defined, components can be built up quickly as visuals and more importantly built out of existing CSS.

Creating these components will help to keep the code base tidy. Code blocks will loose their attachments to pages and become re-usable building blocks that can be applied anywhere. Similarly the elements that make up the components will also be 

Creating a component library instead of just handing over page designs will also help with creating meaningful class names.

For example a heading above a section of reviews on a product page may be labeled .review-heading. The very same heading could then be used on the basket page above up-sells for example…

```
. review--heading {
      font-family: 'Roboto', sans-serif;
   font-weight: 200;
   font-size: 2em;
     color: $base-color;	
}

. up-sell--heading {
   font-family: 'Roboto', sans-serif;
   font-weight: 200;
   font-size: 2em;
     color: $accent-color;	
}
```

If both of these heading are the same we end up with duplicated CSS. With the style guide and component library already set up we can include the defined header styling and add a new class for any unique propertie

```
. heading {
      font-family: 'Roboto', sans-serif;
   font-weight: 200;
   font-size: 2em;
     color: $base-color;	
}

. up-sell--heading {
     color: $accent-color;	
}
```

The end of Photoshop? 
Prototyping and in Browser design

With ever changing device sizes and resolutions designing with set width image tools becomes less and less effective, in order to accurately prototype a fluid site designs must be tested at every size, quickly and reliably. This is simply not possible in Photoshop.

A fluid prototype will highlight potential layout failings early on, forcing designers to focus on ‘in between states’ and not just pre defined existing device sizes.

Image prototypes lead to badly structured web objects, (building pages not modules) base set up not treated properly. And snap points for layouts, mobile, tablet, desktop, flow is not considered.

A fluid prototype will highlight potential layout failings early on, forcing designers to focus on ‘in between states’ and not just pre defined existing device sizes.

Performance, a flat image gives the designer no concept of code size, potential performance issues.


As well as moving away from concept pages it is also beneficial to move entirely away from layout programs such as Photoshop as early as possible in the process.

With the CSS for individual element such as buttons, images and headings in place, new features can be quickly mocked up in code.

```
<div class=”news-feed”>
<h1 class=”heading news-feed__heading”>Feed Heading</h1>
<p class=“news-feed__date”>10th Jan 15</p>
<p class=“news-feed__intro”>10th Jan 15</p>
<button class=”button news-feed__button”>Read More</button>
</div>
```

By adding the base classes the module automatically picks up the sites default styles, colors and spacing. All that is left to do is add any unique styles to the secondary classes.

In browser designing like this allows site wide adjustments to be made much quicker. For example simply changing one variable in a prototype can provide a demo for adjusting line height or spacing across all modules. Tweaking CSS in a prototype also speeds up adjustments on fluid applications quickly providing visuals across all resolutions.



Summery

In summery by aligning the two processes and having Designers and Developers work together, both processes can become more efficient. Design changes are much easier to implement and test in code.  CSS can be much more efficient when approached as a series of repeated patterns and stand alone components.


Built by developers at the same time
Fits in with the coding process – base, objects, modules
Design approach now matches dev approach
