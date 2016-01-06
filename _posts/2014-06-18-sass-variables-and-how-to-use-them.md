---
title: Sass variables and how to use them
author: Cathy Dutton
layout: post
---
Sass variables are used to store information that you want to reuse throughout your project. Using variables allows you to make site wide changes by adjusting just one value, making updates much simpler and quicker.

Despite being one of the most basic features of Sass variables are still often misused&#8230;

<h2 class="heading">Good variable usage </h2>

<pre class="wp-code-highlight prettyprint">
$color-primary: #ffa600;

h1{
  color: $color-primary;
}

button-checkout {
  Background-color: $color-primary
}
</pre>

A websites primary colour will be used throughout the site on buttons, links, borders etc. If the colour is updated the change can be easily rolled out across the site by changing the variables value.

<h2 class="heading"> Bad variable usage </h2>

<pre class="wp-code-highlight prettyprint">
$listStyle: none;

.main-navigation {
  list-style: $listStyle;
}

.tab-list{
  list-style: $listStyle;
}
</pre>

List elements can appear in various sections of a website for example in the main navigation, in the footer as secondary navigation, or in the site copy as a list of services or products.

Changing the style of one list does not necessarily mean all list styles will need to be updated. The navigation for example my be set with list-style: none; whereas the list in the websites copy may have list-style:circle;.

Using a variable for list-style (as above) is therefore no more efficient then simply adding the style in each use case, or by setting a default which can be over-ridden where necessary.

<pre class="wp-code-highlight prettyprint">
ul, li {
  list-style: none;
}

.list-circle{
  list-style:circle;
}
</pre>

Creating excess variables like this can bulk up the Sass files and although they don&#8217;t output any extra css it is better to keep variable to a minimum.

<h3 class="heading">Naming </h3>

Variables need to be named in a way which makes them simple to re-use. Keep the naming convention standard, start generic getting more specific with each word if necessary. This keeps the variables easier to identify or find further down the line.

<pre class="wp-code-highlight prettyprint">
$orange: #ffa600;
$grey: #f3f3f3;
$blue: #82d2e5;

$color-primary: $orange;
$color-secondary: $grey;
$color-tertiary: $blue;

$link-primary: $green;
$link- secondary: $blue;
$link- external: $grey;
</pre>

Don’t be too generic with variable names. If it is not clear where the variable may have been used updating it could cause issues or prevent people from using it in the future.

<h3 class="heading">Structure </h3>

Keep variables on the correct pages, site wide variables should be kept on in variables.scss in the base folder of a site. Module specific variables should be kept on the relevant modules Sass file.

**Base.scss**

<pre class="wp-code-highlight prettyprint">$font-primary: font-family: &#039;Roboto&#039;, sans-serif;
$font-secondary: Arial, Helvetica, sans-serif;
</pre>

**tab.scss**

<pre class="wp-code-highlight prettyprint">$tab-radius: 5px;
$tab-color: $grey;
</pre>

**Folder structure**

<pre class="wp-code-highlight prettyprint">@import &#039;base/_variables.scss&#039;;
@import &#039;base/_mixins.scss&#039;;
@import &#039;base/_placeholders.scss&#039;;

@import &#039;modules/_buttons.scss&#039;;
@import &#039;modules/_lists.scss&#039;;
@import &#039;modules/_tabs.scss&#039;;
</pre>
