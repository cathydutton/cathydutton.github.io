/*
	Scripts
	------------------------------- */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.baguetteBox = factory();
    }
}(this, function () {

    // SVG shapes used on the buttons
    var leftArrow = '<svg width="44" height="60">' +
            '<polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' +
              'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' +
            '</svg>',
        rightArrow = '<svg width="44" height="60">' +
            '<polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' +
              'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' +
            '</svg>',
        closeX = '<svg width="30" height="30">' +
            '<g stroke="rgb(160, 160, 160)" stroke-width="4">' +
            '<line x1="5" y1="5" x2="25" y2="25"/>' +
            '<line x1="5" y1="25" x2="25" y2="5"/>' +
            '</g></svg>';
    // Global options and their defaults
    var options = {}, defaults = {
        captions: true,
        fullScreen: false,
        noScrollbars: false,
        titleTag: false,
        buttons: 'auto',
        async: false,
        preload: 2,
        animation: 'slideIn',
        afterShow: null,
        afterHide: null,
        // callback when image changes with `currentIndex` and `imagesElements.length` as parameters
        onChange: null,
        overlayBackgroundColor: 'rgba(0, 0, 0, .8)',
    };
    // Object containing information about features compatibility
    var supports = {};
    // DOM Elements references
    var overlay, slider, previousButton, nextButton, closeButton;
    // Current image index inside the slider and displayed gallery index
    var currentIndex = 0, currentGallery = -1;
    // Touch event start position (for slide gesture)
    var touchStartX;
    // If set to true ignore touch events because animation was already fired
    var touchFlag = false;
    // Regex pattern to match image files
    var regex = /.+\.(gif|jpe?g|png|webp)/i;
    // Array of all used galleries (Array od NodeList elements)
    var galleries = [];
    // 2D array of galleries and images inside them
    var imagesMap = [];
    // Array containing temporary images DOM elements
    var imagesElements = [];
    // Event handlers
    var imagedEventHandlers = {};
    var overlayClickHandler = function(event) {
        // When clicked on the overlay (outside displayed image) close it
        if(event.target && event.target.nodeName !== 'IMG' && event.target.nodeName !== 'FIGCAPTION')
            hideOverlay();
    };
    var previousButtonClickHandler = function(event) {
        /*jshint -W030 */
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        showPreviousImage();
    };
    var nextButtonClickHandler = function(event) {
        /*jshint -W030 */
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        showNextImage();
    };
    var closeButtonClickHandler = function(event) {
        /*jshint -W030 */
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        hideOverlay();
    };
    var touchstartHandler = function(event) {
        // Save x axis position
        touchStartX = event.changedTouches[0].pageX;
    };
    var touchmoveHandler = function(event) {
        // If action was already triggered return
        if(touchFlag)
            return;
        /*jshint -W030 */
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        touch = event.touches[0] || event.changedTouches[0];
        // Move at least 40 pixels to trigger the action
        if(touch.pageX - touchStartX > 40) {
            touchFlag = true;
            showPreviousImage();
        } else if (touch.pageX - touchStartX < -40) {
            touchFlag = true;
            showNextImage();
        }
    };
    var touchendHandler = function(event) {
        touchFlag = false;
    };

    // forEach polyfill for IE8
    // http://stackoverflow.com/a/14827443/1077846
    if(![].forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
            for(var i = 0; i < this.length; i++)
                callback.call(thisArg, this[i], i, this);
        };
    }

    // filter polyfill for IE8
    // https://gist.github.com/eliperelman/1031656
    if(![].filter) {
        Array.prototype.filter = function(a, b, c, d, e) {
            /*jshint -W030 */
            c=this;d=[];for(e=0;e<c.length;e++)a.call(b,c[e],e,c)&&d.push(c[e]);return d;
        };
    }

    // Script entry point
    function run(selector, userOptions) {
        // Fill supports object
        supports.transforms = testTransformsSupport();
        supports.svg = testSVGSupport();

        buildOverlay();
        bindImageClickListeners(selector, userOptions);
    }

    function bindImageClickListeners(selector, userOptions) {
        // For each gallery bind a click event to every image inside it
        var gallery = document.querySelectorAll(selector);
        galleries.push(gallery);
        [].forEach.call(gallery, function(galleryElement) {
            if(userOptions && userOptions.filter)
                regex = userOptions.filter;
            // Filter 'a' elements from those not linking to images
            var tags = galleryElement.getElementsByTagName('a');
            tags = [].filter.call(tags, function(element) {
                return regex.test(element.href);
            });

            // Get all gallery images and save them in imagesMap with custom options
            var galleryID = imagesMap.length;
            imagesMap.push(tags);
            imagesMap[galleryID].options = userOptions;

            [].forEach.call(imagesMap[galleryID], function(imageElement, imageIndex) {
                var imageElementClickHandler = function(event) {
                    /*jshint -W030 */
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    prepareOverlay(galleryID);
                    showOverlay(imageIndex);
                };
                imagedEventHandlers[galleryID + '_' + imageElement] = imageElementClickHandler;
                bind(imageElement, 'click', imageElementClickHandler);
            });
        });
    }

    function unbindImageClickListeners() {
        galleries.forEach(function(gallery) {
            [].forEach.call(gallery, function(galleryElement) {
                var galleryID = imagesMap.length - 1;
                [].forEach.call(imagesMap[galleryID], function(imageElement, imageIndex) {
                    unbind(imageElement, 'click', imagedEventHandlers[galleryID + '_' + imageElement]);
                });
                imagesMap.pop();
            });
        });
    }

    function buildOverlay() {
        overlay = getByID('baguetteBox-overlay');
        // Check if the overlay already exists
        if(overlay) {
            slider = getByID('baguetteBox-slider');
            previousButton = getByID('previous-button');
            nextButton = getByID('next-button');
            closeButton = getByID('close-button');
            return;
        }
        // Create overlay element
        overlay = create('div');
        overlay.id = 'baguetteBox-overlay';
        document.getElementsByTagName('body')[0].appendChild(overlay);
        // Create gallery slider element
        slider = create('div');
        slider.id = 'baguetteBox-slider';
        overlay.appendChild(slider);
        // Create all necessary buttons
        previousButton = create('button');
        previousButton.id = 'previous-button';
        previousButton.innerHTML = supports.svg ? leftArrow : '&lt;';
        overlay.appendChild(previousButton);

        nextButton = create('button');
        nextButton.id = 'next-button';
        nextButton.innerHTML = supports.svg ? rightArrow : '&gt;';
        overlay.appendChild(nextButton);

        closeButton = create('button');
        closeButton.id = 'close-button';
        closeButton.innerHTML = supports.svg ? closeX : 'X';
        overlay.appendChild(closeButton);

        previousButton.className = nextButton.className = closeButton.className = 'baguetteBox-button';

        bindEvents();
    }

    function keyDownHandler(event) {
        switch(event.keyCode) {
            case 37: // Left arrow
                showPreviousImage();
                break;
            case 39: // Right arrow
                showNextImage();
                break;
            case 27: // Esc
                hideOverlay();
                break;
        }
    }

    function bindEvents() {
        bind(overlay, 'click', overlayClickHandler);
        bind(previousButton, 'click', previousButtonClickHandler);
        bind(nextButton, 'click', nextButtonClickHandler);
        bind(closeButton, 'click', closeButtonClickHandler);
        bind(overlay, 'touchstart', touchstartHandler);
        bind(overlay, 'touchmove', touchmoveHandler);
        bind(overlay, 'touchend', touchendHandler);
    }

    function unbindEvents() {
        unbind(overlay, 'click', overlayClickHandler);
        unbind(previousButton, 'click', previousButtonClickHandler);
        unbind(nextButton, 'click', nextButtonClickHandler);
        unbind(closeButton, 'click', closeButtonClickHandler);
        unbind(overlay, 'touchstart', touchstartHandler);
        unbind(overlay, 'touchmove', touchmoveHandler);
        unbind(overlay, 'touchend', touchendHandler);
    }

    function prepareOverlay(galleryIndex) {
        // If the same gallery is being opened prevent from loading it once again
        if(currentGallery === galleryIndex)
            return;
        currentGallery = galleryIndex;
        // Update gallery specific options
        setOptions(imagesMap[galleryIndex].options);
        // Empty slider of previous contents (more effective than .innerHTML = "")
        while(slider.firstChild)
            slider.removeChild(slider.firstChild);
        imagesElements.length = 0;
        // Prepare and append images containers
        for(var i = 0, fullImage; i < imagesMap[galleryIndex].length; i++) {
            fullImage = create('div');
            fullImage.className = 'full-image';
            fullImage.id = 'baguette-img-' + i;
            imagesElements.push(fullImage);
            slider.appendChild(imagesElements[i]);
        }
    }

    function setOptions(newOptions) {
        if(!newOptions)
            newOptions = {};
        // Fill options object
        for(var item in defaults) {
            options[item] = defaults[item];
            if(typeof newOptions[item] !== 'undefined')
                options[item] = newOptions[item];
        }
        /* Apply new options */
        // Change transition for proper animation
        slider.style.transition = slider.style.webkitTransition = (options.animation === 'fadeIn' ? 'opacity .4s ease' :
            options.animation === 'slideIn' ? '' : 'none');
        // Hide buttons if necessary
        if(options.buttons === 'auto' && ('ontouchstart' in window || imagesMap[currentGallery].length === 1))
            options.buttons = false;
        // Set buttons style to hide or display them
        previousButton.style.display = nextButton.style.display = (options.buttons ? '' : 'none');
        // Set overlay color
        overlay.style.backgroundColor = options.overlayBackgroundColor;
    }

    function showOverlay(chosenImageIndex) {
        if(options.noScrollbars)
            document.body.style.overflow = 'hidden';
        if(overlay.style.display === 'block')
            return;

        bind(document, 'keydown', keyDownHandler);
        currentIndex = chosenImageIndex;
        loadImage(currentIndex, function() {
            preloadNext(currentIndex);
            preloadPrev(currentIndex);
        });

        updateOffset();
        overlay.style.display = 'block';
        if(options.fullScreen)
            enterFullScreen();
        // Fade in overlay
        setTimeout(function() {
            overlay.className = 'visible';
            if(options.afterShow)
                options.afterShow();
        }, 50);
        if(options.onChange)
            options.onChange(currentIndex, imagesElements.length);
    }

    function enterFullScreen() {
        if(overlay.requestFullscreen)
            overlay.requestFullscreen();
        else if(overlay.webkitRequestFullscreen )
            overlay.webkitRequestFullscreen();
        else if(overlay.mozRequestFullScreen)
            overlay.mozRequestFullScreen();
    }

    function exitFullscreen() {
        if(document.exitFullscreen)
            document.exitFullscreen();
        else if(document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if(document.webkitExitFullscreen)
            document.webkitExitFullscreen();
    }

    function hideOverlay() {
        if(options.noScrollbars)
            document.body.style.overflow = 'auto';
        if(overlay.style.display === 'none')
            return;

        unbind(document, 'keydown', keyDownHandler);
        // Fade out and hide the overlay
        overlay.className = '';
        setTimeout(function() {
            overlay.style.display = 'none';
            exitFullscreen();
            if(options.afterHide)
                options.afterHide();
        }, 500);
    }

    function loadImage(index, callback) {
        var imageContainer = imagesElements[index];
        if(typeof imageContainer === 'undefined')
            return;

        // If image is already loaded run callback and return
        if(imageContainer.getElementsByTagName('img')[0]) {
            if(callback)
                callback();
            return;
        }
        // Get element reference, optional caption and source path
        imageElement = imagesMap[currentGallery][index];
        imageCaption = (typeof(options.captions) === 'function') ?
                            options.captions.call(imagesMap[currentGallery], imageElement) :
                            imageElement.getAttribute('data-caption') || imageElement.title;
        imageSrc = getImageSrc(imageElement);
        // Prepare image container elements
        var figure = create('figure');
        var image = create('img');
        var figcaption = create('figcaption');
        imageContainer.appendChild(figure);
        // Add loader element
        figure.innerHTML = '<div class="spinner">' +
            '<div class="double-bounce1"></div>' +
            '<div class="double-bounce2"></div>' +
            '</div>';
        // Set callback function when image loads
        image.onload = function() {
            // Remove loader element
            var spinner = document.querySelector('#baguette-img-' + index + ' .spinner');
            figure.removeChild(spinner);
            if(!options.async && callback)
                callback();
        };
        image.setAttribute('src', imageSrc);
        if(options.titleTag && imageCaption)
            image.title = imageCaption;
        figure.appendChild(image);
        // Insert caption if available
        if(options.captions && imageCaption) {
            figcaption.innerHTML = imageCaption;
            figure.appendChild(figcaption);
        }
        // Run callback
        if(options.async && callback)
            callback();
    }

    // Get image source location, mostly used for responsive images
    function getImageSrc(image) {
        // Set default image path from href
        var result = imageElement.href;
        // If dataset is supported find the most suitable image
        if(image.dataset) {
            var srcs = [];
            // Get all possible image versions depending on the resolution
            for(var item in image.dataset) {
                if(item.substring(0, 3) === 'at-' && !isNaN(item.substring(3)))
                    srcs[item.replace('at-', '')] = image.dataset[item];
            }
            // Sort resolutions ascending
            keys = Object.keys(srcs).sort(function(a, b) {
                return parseInt(a) < parseInt(b) ? -1 : 1;
            });
            // Get real screen resolution
            var width = window.innerWidth * window.devicePixelRatio;
            // Find the first image bigger than or equal to the current width
            var i = 0;
            while(i < keys.length - 1 && keys[i] < width)
                i++;
            result = srcs[keys[i]] || result;
        }
        return result;
    }

    // Return false at the right end of the gallery
    function showNextImage() {
        var returnValue;
        // Check if next image exists
        if(currentIndex <= imagesElements.length - 2) {
            currentIndex++;
            updateOffset();
            preloadNext(currentIndex);
            returnValue = true;
        } else if(options.animation) {
            slider.className = 'bounce-from-right';
            setTimeout(function() {
                slider.className = '';
            }, 400);
            returnValue = false;
        }
        if(options.onChange)
            options.onChange(currentIndex, imagesElements.length);
        return returnValue;
    }

    // Return false at the left end of the gallery
    function showPreviousImage() {
        var returnValue;
        // Check if previous image exists
        if(currentIndex >= 1) {
            currentIndex--;
            updateOffset();
            preloadPrev(currentIndex);
            returnValue = true;
        } else if(options.animation) {
            slider.className = 'bounce-from-left';
            setTimeout(function() {
                slider.className = '';
            }, 400);
            returnValue = false;
        }
        if(options.onChange)
            options.onChange(currentIndex, imagesElements.length);
        return returnValue;
    }

    function updateOffset() {
        var offset = -currentIndex * 100 + '%';
        if(options.animation === 'fadeIn') {
            slider.style.opacity = 0;
            setTimeout(function() {
                /*jshint -W030 */
                supports.transforms ?
                    slider.style.transform = slider.style.webkitTransform = 'translate3d(' + offset + ',0,0)'
                    : slider.style.left = offset;
                slider.style.opacity = 1;
            }, 400);
        } else {
            /*jshint -W030 */
            supports.transforms ?
                slider.style.transform = slider.style.webkitTransform = 'translate3d(' + offset + ',0,0)'
                : slider.style.left = offset;
        }
    }

    // CSS 3D Transforms test
    function testTransformsSupport() {
        var div = create('div');
        return typeof div.style.perspective !== 'undefined' || typeof div.style.webkitPerspective !== 'undefined';
    }

    // Inline SVG test
    function testSVGSupport() {
        var div = create('div');
        div.innerHTML = '<svg/>';
        return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
    }

    function preloadNext(index) {
        if(index - currentIndex >= options.preload)
            return;
        loadImage(index + 1, function() { preloadNext(index + 1); });
    }

    function preloadPrev(index) {
        if(currentIndex - index >= options.preload)
            return;
        loadImage(index - 1, function() { preloadPrev(index - 1); });
    }

    function bind(element, event, callback) {
        if(element.addEventListener)
            element.addEventListener(event, callback, false);
        else // IE8 fallback
            element.attachEvent('on' + event, callback);
    }

    function unbind(element, event, callback) {
        if(element.removeEventListener)
            element.removeEventListener(event, callback, false);
        else // IE8 fallback
            element.detachEvent('on' + event, callback);
    }

    function getByID(id) {
        return document.getElementById(id);
    }

    function create(element) {
        return document.createElement(element);
    }

    function destroyPlugin() {
        unbindEvents();
        unbindImageClickListeners();
        unbind(document, 'keydown', keyDownHandler);
        document.getElementsByTagName('body')[0].removeChild(document.getElementById('baguetteBox-overlay'));
        currentIndex = 0;
        currentGallery = -1;
        galleries.length = 0;
        imagesMap.length = 0;
    }

    return {
        run: run,
        destroy: destroyPlugin,
        showNext: showNextImage,
        showPrevious: showPreviousImage
    };

}));

baguetteBox.run('.baguetteBoxFour', {
    buttons: true
});

/*
	LATEST TWEETS
	------------------------------- */


/*********************************************************************
*  #### Twitter Post Fetcher v14.0 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals.
    factory();
  }
}(this, function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = true;
  var showImages = false;
  var targetBlank = true;
  var lang = 'en';
  var permalinks = true;
  var dataOnly = false;
  var script = null;
  var scriptAdded = false;

  function handleTweets(tweets){
    if (customCallbackFunction === null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '<div class="latest-tweets">';
      while(n < x) {
        html += '<div class="latest-tweets__tweet">' + tweets[n] + '</div>';
        n++;
      }
      html += '</div>';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
        .replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        '');
  }

  function targetLinksToNewWindow(el) {
    var links = el.getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--) {
      links[i].setAttribute('target', '_blank');
    }
  }

  function getElementsByClassName (node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
        if(regex.test(elems[i].className)){
          a.push(elems[i]);
        }
    }
    return a;
  }

  function extractImageUrl(image_data) {
    if (image_data !== undefined) {
      var data_src = image_data.innerHTML
          .match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
      return decodeURIComponent(data_src).split('"')[1];
    }
  }

  var twitterFetcher = {
    fetch: function(config) {
      if (config.maxTweets === undefined) {
        config.maxTweets = 20;
      }
      if (config.enableLinks === undefined) {
        config.enableLinks = true;
      }
      if (config.showUser === undefined) {
        config.showUser = true;
      }
      if (config.showTime === undefined) {
        config.showTime = true;
      }
      if (config.dateFunction === undefined) {
        config.dateFunction = 'default';
      }
      if (config.showRetweet === undefined) {
        config.showRetweet = true;
      }
      if (config.customCallback === undefined) {
        config.customCallback = null;
      }
      if (config.showInteraction === undefined) {
        config.showInteraction = true;
      }
      if (config.showImages === undefined) {
        config.showImages = false;
      }
      if (config.linksInNewWindow === undefined) {
        config.linksInNewWindow = true;
      }
      if (config.showPermalinks === undefined) {
        config.showPermalinks = true;
      }
      if (config.dataOnly === undefined) {
        config.dataOnly = false;
      }

      if (inProgress) {
        queue.push(config);
      } else {
        inProgress = true;

        domNode = config.domId;
        maxTweets = config.maxTweets;
        parseLinks = config.enableLinks;
        printUser = config.showUser;
        printTime = config.showTime;
        showRts = config.showRetweet;
        formatterFunction = config.dateFunction;
        customCallbackFunction = config.customCallback;
        showInteractionLinks = config.showInteraction;
        showImages = config.showImages;
        targetBlank = config.linksInNewWindow;
        permalinks = config.showPermalinks;
        dataOnly = config.dataOnly;

        var head = document.getElementsByTagName('head')[0];
        if (script !== null) {
          head.removeChild(script);
        }
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' +
            config.id + '?&lang=' + (config.lang || lang) +
            '&callback=twitterFetcher.callback&' +
            'suppress_response_codes=true&rnd=' + Math.random();
        head.appendChild(script);
      }
    },
    callback: function(data) {
      var div = document.createElement('div');
      div.innerHTML = data.body;
      if (typeof(div.getElementsByClassName) === 'undefined') {
         supportsClassName = false;
      }

      function swapDataSrc(element) {
        var avatarImg = element.getElementsByTagName('img')[0];
        avatarImg.src = avatarImg.getAttribute('data-src-2x');
        return element;
      };

      var tweets = [];
      var authors = [];
      var times = [];
      var images = [];
      var rts = [];
      var tids = [];
      var permalinksURL = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('tweet');
        while (x < tmp.length) {
          if (tmp[x].getElementsByClassName('retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(tmp[x].getElementsByClassName('e-entry-title')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            authors.push(swapDataSrc(tmp[x]
                .getElementsByClassName('p-author')[0]));
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
            permalinksURL.push(tmp[x].getElementsByClassName('permalink')[0]);
            if (tmp[x].getElementsByClassName('inline-media')[0] !==
                undefined) {
              images.push(tmp[x].getElementsByClassName('inline-media')[0]);
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'tweet');
        while (x < tmp.length) {
          tweets.push(getElementsByClassName(tmp[x], 'e-entry-title')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          authors.push(swapDataSrc(getElementsByClassName(tmp[x],
              'p-author')[0]));
          times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
          permalinksURL.push(getElementsByClassName(tmp[x], 'permalink')[0]);
          if (getElementsByClassName(tmp[x], 'inline-media')[0] !== undefined) {
            images.push(getElementsByClassName(tmp[x], 'inline-media')[0]);
          } else {
            images.push(undefined);
          }

          if (getElementsByClassName(tmp[x], 'retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, (tweets.length - maxTweets));
        authors.splice(maxTweets, (authors.length - maxTweets));
        times.splice(maxTweets, (times.length - maxTweets));
        rts.splice(maxTweets, (rts.length - maxTweets));
        images.splice(maxTweets, (images.length - maxTweets));
        permalinksURL.splice(maxTweets, (permalinksURL.length - maxTweets));
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      if (dataOnly) {
        while (n < x) {
          arrayTweets.push({
            tweet: tweets[n].innerHTML,
            author: authors[n].innerHTML,
            time: times[n].innerText,
            image: extractImageUrl(images[n]),
            rt: rts[n],
            tid: tids[n],
            permalinkURL: permalinksURL[n].href
          });
          n++;
        }
      } else {
        while (n < x) {
          if (typeof(formatterFunction) !== 'string') {
            var datetimeText = times[n].getAttribute('datetime');
            var newDate = new Date(times[n].getAttribute('datetime')
                .replace(/-/g,'/').replace('T', ' ').split('+')[0]);
            var dateString = formatterFunction(newDate, datetimeText);
            times[n].setAttribute('aria-label', dateString);

            if (tweets[n].innerText) {
              // IE hack.
              if (supportsClassName) {
                times[n].innerText = dateString;
              } else {
                var h = document.createElement('p');
                var t = document.createTextNode(dateString);
                h.appendChild(t);
                h.setAttribute('aria-label', dateString);
                times[n] = h;
              }
            } else {
              times[n].textContent = dateString;
            }
          }
          var op = '';
          if (parseLinks) {
            if (targetBlank) {
              targetLinksToNewWindow(tweets[n]);
              if (printUser) {
                targetLinksToNewWindow(authors[n]);
              }
            }
            if (printUser) {
              op += '<div class="user">' + strip(authors[n].innerHTML) +
                  '</div>';
            }
            op += '<p class="latest-tweets__text">' + strip(tweets[n].innerHTML) + '</p>';
            if (printTime) {
              if (permalinks) {
                op += '<p class="latest-tweets__time">' + times[n].getAttribute('aria-label') + '</p>';
              } else {
                op += '<p class="latest-tweets__time">' +
                    times[n].getAttribute('aria-label') + '</p>';
              }
            }
          } else {
            if (tweets[n].innerText) {
              if (printUser) {
                op += '<p class="user">' + authors[n].innerText + '</p>';
              }
              op += '<p class="latest-tweets__text">' +  tweets[n].innerText + '</p>';
              if (printTime) {
                op += '<p class="latest-tweets__time">' + times[n].innerText + '</p>';
              }

            } else {
              if (printUser) {
                op += '<p class="user">' + authors[n].textContent + '</p>';
              }
              op += '<p class="latest-tweets__text">' +  tweets[n].textContent + '</p>';
              if (printTime) {
                op += '<p class="latest-tweets__time">' + times[n].textContent + '</p>';
              }
            }
          }
          if (showInteractionLinks) {
            op += '<p class="interact"><a href="https://twitter.com/intent/' +
                'tweet?in_reply_to=' + tids[n] +
                '" class="twitter_reply_icon"' +
                (targetBlank ? ' target="_blank">' : '>') +
                'Reply</a><a href="https://twitter.com/intent/retweet?' +
                'tweet_id=' + tids[n] + '" class="twitter_retweet_icon"' +
                (targetBlank ? ' target="_blank">' : '>') + 'Retweet</a>' +
                'href="https://twitter.com/intent/favorite?tweet_id=' +
                tids[n] + '" class="twitter_fav_icon"' +
                (targetBlank ? ' target="_blank">' : '>') + 'Favorite</a></p>';
          }

          if (showImages && images[n] !== undefined) {
            op += '<div class="media">' +
                '<img src="' + extractImageUrl(images[n]) +
                '" alt="Image from tweet" />' + '</div>';
          }

          arrayTweets.push(op);
          n++;
        }
      }

      handleTweets(arrayTweets);
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0,1);
      }
    }
  };

  // It must be a global variable because it will be called by JSONP.
  window.twitterFetcher = twitterFetcher;
  return twitterFetcher;
}));

var config3 = {
  "id": '309778724927193088',
  "domId": 'latest-tweets',
  "maxTweets": 2,
  "enableLinks": true,
  "showUser": false,
  "showRetweet": true,
  "showInteraction": false,
  "showImages": false
};

twitterFetcher.fetch(config3);

/*
	Sidebar
	------------------------------- */


window.onload = function() {

	// SIDEBAR
	var toggleNav = document.getElementById('js-header__icon'),
	sidebar = document.querySelector('.sidebar, a'),
	wrapper = document.querySelector('.wrapper'),
	tweets = document.querySelectorAll('latest-tweets__tweet a'), i,
	wrapperLink = document.querySelectorAll('.wrapper a'), i,
	sidebarLink = document.querySelectorAll('.sidebar a'), i;

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


/*
	TWEET
	------------------------------- */
	//
	// var seleccionado = '';
	// var horiz, vert, referencia;
	// function carga() {
	//   referencia = document.getElementsByClassName('content')[0]
	//   var pajarito = document.createElement('span');
	//   pajarito.setAttribute('id', 'js-tweet');
	//   pajarito.setAttribute('onmousedown', 'abre()');
	//   referencia.appendChild(pajarito);
	//   referencia.onmouseup = captura;
	// }
	//
	// function captura(e) {
	//   seleccionado = (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);
	//   if (seleccionado != '') {
	//     horiz= ((e.x) ? e.x : e.clientX) ;
	//     vert= ((e.y) ? e.y : e.clientY) ;
	//     document.getElementById('js-tweet').style.display = 'inline-block';
	//     document.getElementById('js-tweet').style.left = horiz + 'px';
	//     document.getElementById('js-tweet').style.top = vert + 'px';
	//   } else {
	//     document.getElementById('js-tweet').style.display = 'none';
	//   }
	// }
	//
	// function abre() {
	//   var origen = window.location.href;
	//   var mensaje = seleccionado.toString().substring(0, 100);
	//   var direccion = 'http://twitter.com/home?status=' + mensaje + ' ' + origen;
	//   window.open(direccion, '', 'width=500,height=500');
	// }
	//
	// onload = carga;
