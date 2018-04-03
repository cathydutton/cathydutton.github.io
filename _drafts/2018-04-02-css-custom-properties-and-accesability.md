---
title: CSS custom properties and accesability
author: Cathy Dutton
layout: post
date:   2018-04-02    
category: post
---


CSS custom properties are the improved alternatives to the variables available in pre processing languages like Sass and Less. Unlike compiled variables custom properties allow values to be updated dynamically, enabling users to make site wide changes to colour themes, fonts and text size amongst others.

### 1. Update colour theme


Themed CSS became common practice with the arrival of Sass variables, by defining a set of colour variables at the top of a partial CSS could be reused quickly and easily. This practice does however introduce a lot of duplicate work and CSS bloat.

```
$body-background-color: #eee;
$body-text-color: #222;
$link-colour:
$link-hover-colour:

body {
  background-color: $body-background-color;
  color: $body-text-color;
}

a {
 colour: $link-colour;
} &:hover {
 Colour: $link-hover-colour;
}
```

With custom properties this duplication is removed. The property values do not need to be complied meaning they can be updated dynamically

The above Sass example can now be replaced with this…

CODE EXAMPLE bad colours

Naming variables in a meaningful way is difficult, naming variables that are used in multiple themes is even more difficult.

Name things - in a way that makes sense - loads of examples and final choice.
Color names become key, used everywhere but dont want too many

No - border-colour
Text-colour -three etc

No colour names??????

Yes too ......

This can nbe helped by using inherit propertys

```
$orange: #ffa600;
$grey: #f3f3f3;
$blue: #82d2e5;

$color-primary: $orange;
$color-secondary: $grey;
$color-tertiary: $blue;

$link-primary: $green;
$link- secondary: $blue;
$link- external: $grey;
```

At least now it's obvious what the variables are by looking at them. It's also really easy to change your colors. The problem is the variables aren't reusable. What happens when decide to use #292929 as the background color for your buttons? Do you rename $border-colorto $border-and-button-color? Do you add another variable and duplicate the value?

Old way - but this won’t work need real names

Talk about max number of colours for ideal pallette


More colour ideas - https://github.com/adamwathan/theming-tailwind-demo/blob/master/src/styles.css

Try a JS theme generator.


Its actually less confusing to call them by the colour and have it worn in contrast mode

```
:root {
  --colour-black: #001429;
  --colour-dark: #001F3F;
  --colour-medium: #003D7A;
  --colour-light: #E0F0FF;
  --colour-white: #FFFFFF;
  --colour-bright: #3D9970;
  --colour-error: #A91919; 
}
.theme-dark {
  --colour-black: #FFFFFF;
  --colour-dark: #AAAAAA;
  --colour-medium: #2ECC40;
  --colour-light: #048386; 
  --colour-white: #111111;
  --colour-bright: #FFDC00; 
  --colour-error: #FF851B;
}

.theme-monochrome {
  --colour-black: #BD9562;
  --colour-dark: #AB773F;
  --colour-medium: #553C1C;
  --colour-light: #3c240d;
  --colour-white: #211505;
  --colour-bright: #AF8857;
  --colour-error: #A37A48; 
}
```


```
themeDefault.onclick = function(){
    body.className = "theme-default";
  };

 themeDark.onclick = function(){
    body.className = "theme-dark";
  };

themeMonochrome.onclick = function(){
  body.className = "theme-monochrome";
  };
```

This is great, until the user navigates to a new page or refreshes the browser. To solve this issue we can store the value of the custom property in local storage, and then check for a saved value on page load.





### 2. Update a font

----- INTRO

Can also be done with a class, 

```
const body = document.body;
body.classList.add("comic-sans");

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}


comic-sans {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
}
```

There is nothing wrong with this approach in this instance, however if you are allowing users to update multiple properties for example text size you could end up with a lot of additional classes.

An alternative approach is to declare the font just once in CSS using a custom property.

```
:root {
  --font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; 
}

body {
  font-family: var(--font-family);
}

```


And allow users to update this value through javaScript

```
// Global
const body = document.body;
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);

dyslexicFont.onclick = function(){
  body.style.setProperty('--font-family', '"Comic Sans MS", "Comic Sans", cursive');
  localStorage.setItem("fontFamily", '"Comic Sans MS", "Comic Sans", cursive');
};

defaultFont.onclick = function(){
  body.style.setProperty('--font-family', rootStyles.getPropertyValue('--font-family'));
  localStorage.setItem("fontFamily", rootStyles.getPropertyValue('--font-family'));
};

When either button is clicked the value of the custom property --font-family is updated across the page.

This is great, until the user navigates to a new page or refreshes the browser. To solve this issue we can store the value of the custom property in local storage, and then check for a saved value on page load.

// If no local storage value exists create one
if (!fontFamily) {
    body.style.setProperty("--font-family", localStorage.getItem("fontFamily"));
}

// Get current value
var fontFamily = getComputedStyle(body).getPropertyValue('--font-family');

```

Demo

<p data-height="300" data-theme-id="8492" data-slug-hash="OQrGab" data-default-tab="html,result" data-user="cathydutton" data-embed-version="2" data-pen-title="Custom property font switcher" class="codepen">See the Pen <a href="https://codepen.io/cathydutton/pen/OQrGab/">Custom property font switcher</a> by Cathy Dutton (<a href="https://codepen.io/cathydutton">@cathydutton</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


### 3. Update text size

Updating the text size for a site is slightly more complex, this is where simply adding a class to the body would not work, (unless you want a stylesheet full of classes for every available size).

The concept here is the same, but instead of assigning a new value to the property we add to it.

```
:root {
  --font-size: 1.188em;
}

body {
  font-size: var(--font-size)
}

// Increase text size
increaseFont.onclick = function(){
    var number = parseFloat(fontSize) 
    number += 0.2
    fontSize = number;
    body.style.setProperty('--font-size', number + 'em');
    localStorage.setItem("fontSize", number + 'em');
};

// Decrease text size
decreaseFont.onclick = function(){
    var number = parseFloat(fontSize) 
    number -= 0.2
    fontSize = number;   
    body.style.setProperty('--font-size', number + 'em');
    localStorage.setItem("fontSize", number + 'em');
};

```

When each button is clicked the current value of --font-size is taken and either increased or decreased. The parseFloat() function is used to first strip the unit from the property and then convert the value from a string to an integer.

Demo

<p data-height="300" data-theme-id="8492" data-slug-hash="YedMRP" data-default-tab="html,result" data-user="cathydutton" data-embed-version="2" data-pen-title="Custom property text size" class="codepen">See the Pen <a href="https://codepen.io/cathydutton/pen/YedMRP/">Custom property text size</a> by Cathy Dutton (<a href="https://codepen.io/cathydutton">@cathydutton</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

