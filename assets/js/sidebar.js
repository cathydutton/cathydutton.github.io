/*
	Sidebar
	------------------------------- */


window.onload = function() {

	// SIDEBAR
	var toggleNav = document.getElementById('js-header__icon');
	var sidebar = document.querySelector('.sidebar, a');
	var wrapper = document.querySelector('.wrapper');
	var tweets = document.querySelectorAll('latest-tweets__tweet a'), i;
	var wrapperLink = document.querySelectorAll('.wrapper a'), i;
	var sidebarLink = document.querySelectorAll('.sidebar a'), i;

	for (i = 0; i < sidebarLink.length; ++i) {
		sidebarLink[i].setAttribute('tabindex', '-1');
	};

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
					for (i = 0; i < tweets.length; ++i) {
						tweets[i].setAttribute('tabindex', '-1');
					}

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
					for (i = 0; i < tweets.length; ++i) {
						tweets[i].setAttribute('tabindex', '-0');
					}

		  }
	}
	toggleNav.addEventListener( 'click' , changeClass );

}
