/*
	Sidebar
	------------------------------- */


window.onload = function() {

	// SIDEBAR
	var toggleNav = document.getElementById('js-header__icon'),
	sidebar = document.querySelector('.sidebar, a'),
	wrapper = document.querySelector('.wrapper'),
	tweets = document.querySelector('timePosted a'),
  wrapperLink = document.querySelectorAll('.wrapper a'), i,
	sidebarLink = document.querySelectorAll('.sidebar a'), i;

	for (i = 0; i < sidebarLink.length; ++i) {
		sidebarLink[i].setAttribute('tabindex', '-1');
	}

	// On Click function
	function changeClass() {
		if ( sidebar.className.match(/(?:^|\s)sidebar--closed(?!\S)/) ) {
		      sidebar.className = sidebar.className.replace( /(?:^|\s)sidebar--closed(?!\S)/g , ' sidebar--open' );
					toggleNav.className = toggleNav.className.replace( /(?:^|\s)button--menu--closed(?!\S)/g , ' button--menu--open' );
		      // Allow focus of Sidebar Elements
					for (i = 0; i < sidebarLink		.length; ++i) {
  					sidebarLink[i].setAttribute('tabindex', '0');
					}
					for (i = 0; i < wrapperLink.length; ++i) {
						wrapperLink[i].setAttribute('tabindex', '-1');
					}
					tweets.setAttribute('tabindex', '-1');

		  }
		  else if ( sidebar.className.match(/(?:^|\s)sidebar--open(?!\S)/) ) {
		      sidebar.className = sidebar.className.replace( /(?:^|\s)sidebar--open(?!\S)/g , ' sidebar--closed' );
					toggleNav.className = toggleNav.className.replace( /(?:^|\s)button--menu--open(?!\S)/g , ' button--menu--closed' );
					// Remove focus of Sidebar Elements
					for (i = 0; i < sidebarLink.length; ++i) {
						sidebarLink[i].setAttribute('tabindex', '-1');
					}
					for (i = 0; i < wrapperLink.length; ++i) {
						wrapperLink[i].setAttribute('tabindex', '0');
					}
					tweets.setAttribute('tabindex', '0');

		  }
	}
	toggleNav.addEventListener( 'click' , changeClass );

}
