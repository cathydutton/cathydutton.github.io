---
layout: blog
title: "Interaction Design, UX and Front End Development blog - Cathy Dutton"
description: "A collection of my articles and tutorials on Interaction Design, User Experience, CSS, PostCSS, Sass and Front End Development"
intro: "Blog"
heading: " Latest posts and tutorials"
group: "navigation"
page: "Blog"
active: "Blog"
---

<div class="news-feed">
	{% for post in site.posts %}
		{% if post.categories contains 'post' %}
			<article class="news-feed__post">
					<a href="{{post.url}}" title="{{ post.title }}" class="news-feed__anchor">
							<h3 class="heading news-feed__title">{{ post.title }}</h3>
							<p class="news-feed__date">{{ post.date | date_to_string }}</p>
					</a>
			 </article>
		{% endif %}
		{% if post.categories contains 'external' %}
			<article class="news-feed__post">
					<a href="{{post.link}}" title="{{ post.title }}" target="_blank" class="news-feed__anchor">
							<h3 class="heading news-feed__title">{{ post.title }}</h3>
							<p class="news-feed__date">{{ post.date | date_to_string }}</p>
					</a>
			 </article>
		{% endif %}
	{% endfor %}
</div>
