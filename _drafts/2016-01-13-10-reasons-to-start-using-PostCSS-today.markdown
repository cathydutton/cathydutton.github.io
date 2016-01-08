---
title: 8 reasons to start using PostCSS today
author: Cathy Dutton
layout: post
---


<h2 class="heading">Intro</h2>

PostCSS allows makes it possible to transform or extend syntaxes and features of CSS.
Nothing groundbreaking there then, but unlike existing pre-processors PostCSS is not an all or nothing
tool. Plugins can be added to what is an otherwise clean slate allowing developers to
take much greater control over the features used and resulting CSS.

Below are just a few of the reasons to start using PostCSS right away...


<h4 class="heading">1) Simple set up</h4>

Adding PostCSS to your workflow is probably a lot easier then you think, particularly if you are already
using a task runner and/or pre-processor. PostCSS is written in JavaScript and integrates seamlessly with
task runners like Gulp and Grunt.

```js

```

If you are not currently using a task runner....

```js

```

Compile tools like Prepros also offer support for some of PostCSS's most popular plugins.
GUI's like this will not be suitable for custom plugins however.

Further reading on installation can be found on the PostCSS
Github page https://github.com/postcss/postcss.


<h4 class="heading">2) Works along side current pre-processors</h4>

You probably already have a workflow set up that you're happy with, whether your using Sass, Less or any
other CSS tool, to stop and migrate to a new processor will be time consuming.

The good news is you don’t have to abandon you're current set up, or all the functions
and Mixins you have already written. PostCSS can be added to a build process alongside a pre-prosesor
not just instead of one.

This allows for a much simpler transition without the need to make wholesale changes to a codebase.
Existing functionality can be migrated to PostCSS over time, if at all.


<h4 class="heading">3)Take what you need</h4>

As most developers have now found out some of the functions available in pre-processors
can have a negative impact on CSS performance.

Unlike existing pre processors such as Sass, Less and Stylus with PostCSS you only use the
functionality you need. This unique approach gives developers full control over the codebase and
limits the potential for creating bloated or badly coded CSS.

This is hugely beneficial when it comes to maintaining large projects and safeguarding the CSS code.


<h4 class="heading">4) You may be using it already</h4>

Autoprefixer automatically adds vendor prefixes to CSS properties based on user set browser dependencies.
The plugin is hugely popular and easy to integrate with any JavaScript task runner.

The plugin was developed by Andrey Sitnik and works in the same way as PostCSS.




<h4 class="heading">5) Future Proof CSS</h4>

With plugins like cssnext the latest CSS syntax features can be safely used straight away.
Fallbacks for older browsers are added automatically meaning there is no need to continue writing
outdated CSS.

This will help keep code fresh and remove the need to make wholesale changes as browser support changes.


http://cssnext.io/


<h4 class="heading">6) Accessibility</h4>

We are all guilty of missing the occasional :focus selectors here and there,
fortunately there are plugins that can take care of the repetitive tasks like this for us.

postcss-colorblind - https://github.com/btholt/postcss-colorblind
postcss-focus - https://github.com/postcss/postcss-focus


<h4 class="heading">7) Feedback list-selectors, stylelint</h4>
 etc review the output! – linters – codeing guidelines can be implemented automatically. –
 Is there an indentation one? Bem one!



<h4 class="heading">8) Get creative </h4>

Built in JavaScript PostCSS its much simpler to contribute to and create plugins
to suit you're project or workflow. There is plenty of helpful documentation to get you
started - Boilerplate - API...

This means whatever functionality you require is achievable.

Build your own  – no more complaining at Less and Sass limitations, want something – add it!




<h4 class="heading">9) Performance </h4>

Because it is built inJavascript PostCSS is much faster then it's competitors.
Faster then libsass, Less and Stylus


<h4 class="heading">Conclusion</h4>

In summery PostCSS is more performant, less risky and easier to develop / custamise/ extend



<h4 class="heading">Further reading</h4>

