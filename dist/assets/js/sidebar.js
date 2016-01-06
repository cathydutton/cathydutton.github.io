/*
	Sidebar
	------------------------------- */


window.onload = function() {

	// SIDEBAR
	var toggleNav = document.getElementById('js-header__icon');
	var sidebar = document.querySelector('.sidebar');
	var wrapper = document.getElementById('wrapper');
	var sidebarLink = document.querySelectorAll('.sidebar__anchor, .find-me__anchor'), i;
	var width = window.innerWidth;


	// set menu to open on desktop
	if (width > 1020) {
		sidebar.className = sidebar.className.replace( /(?:^|\s)sidebar--closed(?!\S)/g , ' sidebar--open' );
		wrapper.className = wrapper.className.replace( /(?:^|\s)wrapper--deactive(?!\S)/g , ' wrapper--active' );
		toggleNav.className = toggleNav.className.replace( /(?:^|\s)button--menu--closed(?!\S)/g , ' button--menu--open' );
	}

	// set focus based on menu class
	if (sidebar.className.match(/(?:^|\s)sidebar--closed(?!\S)/) ) {
		// Allow focus of Sidebar Elements
		for (i = 0; i < sidebarLink		.length; ++i) {
			sidebarLink[i].setAttribute('tabindex', '-1	');
		}

	}

	if ( sidebar.className.match(/(?:^|\s)sidebar--open(?!\S)/) ) {
		// Remove focus of Sidebar Elements
		for (i = 0; i < sidebarLink.length; ++i) {
			sidebarLink[i].setAttribute('tabindex', '0');
		}

	}

	// On Click function

	function changeClass() {
		if ( sidebar.className.match(/(?:^|\s)sidebar--closed(?!\S)/) ) {
		      sidebar.className = sidebar.className.replace( /(?:^|\s)sidebar--closed(?!\S)/g , ' sidebar--open' );
					wrapper.className = wrapper.className.replace( /(?:^|\s)wrapper--active(?!\S)/g , ' wrapper--deactive' );
					toggleNav.className = toggleNav.className.replace( /(?:^|\s)button--menu--closed(?!\S)/g , ' button--menu--open' );
		      // Allow focus of Sidebar Elements
					for (i = 0; i < sidebarLink		.length; ++i) {
  					sidebarLink[i].setAttribute('tabindex', '0');
					}

		  }
		  else if ( sidebar.className.match(/(?:^|\s)sidebar--open(?!\S)/) ) {
		      sidebar.className = sidebar.className.replace( /(?:^|\s)sidebar--open(?!\S)/g , ' sidebar--closed' );
					wrapper.className = wrapper.className.replace( /(?:^|\s)wrapper--deactive(?!\S)/g , ' wrapper--active' );
					toggleNav.className = toggleNav.className.replace( /(?:^|\s)button--menu--open(?!\S)/g , ' button--menu--closed' );
					// Remove focus of Sidebar Elements
					for (i = 0; i < sidebarLink.length; ++i) {
						sidebarLink[i].setAttribute('tabindex', '-1');
					}

		  }
	}
	toggleNav.addEventListener( 'click' , changeClass );

}
