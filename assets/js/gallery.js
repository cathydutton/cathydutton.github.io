/*
	Scripts
	------------------------------- */


window.onload = function() {

	// GALLERY
  var close = document.getElementById('close'),
  pop = document.getElementById('gallery-pop-up'),
  popTitle = document.getElementById('gallery-title'),
  popText = document.getElementById('gallery-text'),
  popImage = document.getElementById('gallery-image'),
  elements = document.querySelectorAll(".image-wrapper__image"),
	images = [].slice.call(elements),
  wrapper = document.querySelector('.wrapper'),
	wrapperLink = document.querySelectorAll('.wrapper a'), i,
	tweets = document.querySelectorAll('latest-tweets__tweet a'), i,
	modalLink = document.querySelectorAll('.portfolio-gallery a'), i,
  next = document.getElementById('gallery-next'),
  prev = document.getElementById('gallery-prev');



	// On Click function
	function openModal() {
		if ( wrapper.className.match(/(?:^|\s)lightbox--open(?!\S)/) ) {
		      wrapper.className = wrapper.className.replace( /(?:^|\s)lightbox--open(?!\S)/g , ' lightbox--closed' );

		      // Allow focus of wrapper Elements
					for (i = 0; i < modalLink.length; ++i) {
  					modalLink[i].setAttribute('tabindex', '0');
					}
					for (i = 0; i < wrapperLink.length; ++i) {
						wrapperLink[i].setAttribute('tabindex', '-1');
					}
					for (i = 0; i < tweets.length; ++i) {
						tweets.setAttribute('tabindex', '-1');
					}

					for (var i = 0; i < images.length; i++) {
						myNum = images.indexOf(this);
						displayGallery(myNum);
					}


		  }

		  else if ( wrapper.className.match(/(?:^|\s)lightbox--closed(?!\S)/) ) {
		      wrapper.className = wrapper.className.replace( /(?:^|\s)lightbox--closed(?!\S)/g , ' lightbox--open' );

					// Remove focus of wrapper Elements
					for (i = 0; i < modalLink.length; ++i) {
						modalLink[i].setAttribute('tabindex', '-1');
					}
					for (i = 0; i < wrapperLink.length; ++i) {
						wrapperLink[i].setAttribute('tabindex', '0');
					}
					for (i = 0; i < tweets.length; ++i) {
						tweets.setAttribute('tabindex', '0');
					}

		  }
	}


		images[i].addEventListener( 'click' , openModal );










  // for (var i = 0; i < images.length; i++) {
  //   images[i].onclick = function() {
  //   myNum = images.indexOf(this);
  //   displayGallery(myNum);
	//
  //     next.onclick = function() {
	// 			if (myNum >= (images.length - 1)) {
	// 				myNum = 0;
	// 			} else {
	// 				myNum += 1;
	// 			}
	//
	// 			displayGallery(myNum);
	// 			this.focus();
  //     }
	//
  //     prev.onclick = function() {
	// 			if (myNum <= 0) {
	// 				myNum = (images.length - 1);
	// 			} else {
	// 				myNum -= 1;
	// 			}
	// 			displayGallery(myNum);
	// 			this.focus();
  //     }
	//
	// 		window.addEventListener("keydown", checkKeyPressed, false);
	//
	// 		function checkKeyPressed(e) {
	// 	    if (e.keyCode == "37") {
	// 				if (myNum <= 0) {
	// 					myNum = (images.length - 1);
	// 				} else {
	// 					myNum -= 1;
	// 				}
	// 				displayGallery(myNum);
	// 	    }
	// 			if (e.keyCode == "39") {
	// 				if (myNum >= (images.length - 1)) {
	// 					myNum = 0;
	// 				} else {
	// 					myNum += 1;
	// 				}
	//
	// 				displayGallery(myNum);
	// 	    }
	// 			if (e.keyCode == "13") {
	// 					displayGallery(myNum);
	// 			}
	// 		}
	//
  //   }
	//
  //   close.onclick = function() {
  //     wrapper.className = wrapper.className.replace( /(?:^|\s)lightbox--open(?!\S)/g , ' lightbox--closed' );
  //     pop.style.display = "none";
  //   }
	//
  // }

  var displayGallery = function(myNum) {

		for (var i = 0; i < images.length; i++) {

    wrapper.className = wrapper.className.replace( /(?:^|\s)lightbox--closed(?!\S)/g , ' lightbox--open' );

    pop.style.display = "block";
    //pop.setAttribute('tabindex', '-1');

    alt = images[myNum].getAttribute('alt');
    src = images[myNum].getAttribute('src');
    newSrc = src.replace("thumbs", "portfolio");
    dataTitle = images[myNum].getAttribute('data-title');
    dataText = images[myNum].getAttribute('data-text');

    popImage.setAttribute('src', newSrc);
    popImage.setAttribute('alt', alt);
    popTitle.innerHTML = dataTitle;
    popText.innerHTML = dataText;

	}

  }


}
