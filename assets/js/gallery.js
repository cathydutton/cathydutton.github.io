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
  wrapper = document.querySelector('.wrapper'),
  next = document.getElementById('gallery-next'),
  prev = document.getElementById('gallery-prev');



	var images = [].slice.call(elements);

  for (var i = 0; i < images.length; i++) {
    images[i].onclick = function() {
    myNum = images.indexOf(this);
    displayStuff(myNum);

      next.onclick = function() {

        if (myNum >= (images.length - 1)) {
          myNum = 0;
        } else {
          myNum += 1;
        }

        displayStuff(myNum);
      }

      prev.onclick = function() {
        if (myNum <= 0) {
          myNum = (images.length - 1);
        } else {
          myNum -= 1;
        }
        displayStuff(myNum);
      }

    }

    close.onclick = function() {
      wrapper.className = wrapper.className.replace( /(?:^|\s)lightbox--open(?!\S)/g , ' lightbox--closed' );
      pop.style.display = "none";
    }

  }

  var displayStuff = function(myNum) {

    wrapper.className = wrapper.className.replace( /(?:^|\s)lightbox--closed(?!\S)/g , ' lightbox--open' );

    pop.style.display = "block";
    pop.focus();
    pop.setAttribute('tabindex', '-1');

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
