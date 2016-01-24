/*
	Scripts
	------------------------------- */


// window.onload = function() {
//
// 	// GALLERY
//   var close = document.getElementById('close'),
//   pop = document.getElementById('pop-up'),
//   popTitle = document.getElementById('pop-title'),
//   popText = document.getElementById('pop-text'),
//   popImage = document.getElementById('pop-image-img'),
//   elements = document.querySelectorAll(".image-wrapper__image"),
//   next = document.getElementById('next'),
//   prev = document.getElementById('prev'),
// 	bg = document.getElementById('black_overlay');
//
//
// 	var images = [].slice.call(elements);
//
//   for (var i = 0; i < images.length; i++) {
//     images[i].onclick = function() {
//     myNum = images.indexOf(this);
//     displayStuff(myNum);
//
//       next.onclick = function() {
//
//         if (myNum >= (images.length - 1)) {
//           myNum = 0;
//         } else {
//           myNum += 1;
//         }
//
//         displayStuff(myNum);
//       }
//
//       prev.onclick = function() {
//         if (myNum <= 0) {
//           myNum = (images.length - 1);
//         } else {
//           myNum -= 1;
//         }
//         displayStuff(myNum);
//       }
//
//     }
//
//     close.onclick = function() {
//       pop.style.display = "none";
// 			bg.style.display = "none"
//     }
//
// 		bg.onclick = function() {
//       pop.style.display = "none";
// 			bg.style.display = "none";
//
//     }
//
//   }
//
//   var displayStuff = function(myNum) {
//
//     pop.style.display = "block";
// 		bg.style.display = "block";
//     pop.focus();
//     pop.setAttribute('tabindex', '-1');
//
//     alt = images[myNum].getAttribute('alt');
//     src = images[myNum].getAttribute('src');
//     newSrc = src.replace("thumbs", "full");
//     dataTitle = images[myNum].getAttribute('data-title');
//     dataText = images[myNum].getAttribute('data-text');
//
//     popImage.setAttribute('src', newSrc);
//     popImage.setAttribute('alt', alt);
//     popTitle.innerHTML = dataTitle;
//     popText.innerHTML = dataText;
//
//   }
//
// }
