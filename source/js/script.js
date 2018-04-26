var menuButton = document.querySelector('.main-navigation__toggle');

if(menuButton) {
  var siteMenu = document.querySelector ('.main-navigation__site-list');
  var userMenu = document.querySelector ('.main-navigation__user-list');

  menuButton.classList.remove('main-navigation__toggle_off');
  menuButton.classList.add('main-navigation__toggle_open');
  siteMenu.classList.add('main-navigation__site-list_closed');
  userMenu.classList.add('main-navigation__user-list_closed');

  menuButton.onclick = function() {
    menuButton.classList.toggle('main-navigation__toggle_open');
    siteMenu.classList.toggle('main-navigation__site-list_closed');
    userMenu.classList.toggle('main-navigation__user-list_closed');
  }
}

var modalWindow = document.querySelector('.page__product-order');

if(modalWindow) {
  var madalButton = modalWindow.querySelector('.order-form__button');
  var modalOverlay = modalWindow.querySelector('.product-order__overlay');
  var weekProductButton = document.querySelector('.week-product__button');
  var productItemButton = document.querySelectorAll('.product-item__button');

  if(weekProductButton) {
    modalOpen(weekProductButton);
  }

  if(productItemButton) {
    for(var i=0; i <  productItemButton.length; i++) {
      modalOpen(productItemButton[i]);
    }
  }

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      if (modalWindow.classList.contains('page__product-order_active')){
        modalWindow.classList.remove('page__product-order_active')
      }
    }
  })

  modalOverlay.onmousedown = function() {
    modalWindow.classList.remove('page__product-order_active');
  }
}

function modalOpen(element) {
  element.onclick = function (evt) {
    evt.preventDefault();
    modalWindow.classList.add('page__product-order_active');
  }
}

var mapBlock = document.getElementById('map');
if(mapBlock) {
  var size = window.outerHeight;
  ymaps.ready(init);
  var myMap;

  function init(){
    myMap = new ymaps.Map("map", {
      center: [59.93878180, 30.32273263],
      zoom: 16
    });

    var myPlacemark = new ymaps.Placemark([59.93863106, 30.32305450], null, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-map-pin.svg',
      iconImageSize: [67, 100],
      iconImageOffset: [-33.5, -100]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');

    if (size < 700) {
      myMap.behaviors.disable('drag');
    }
  }
}

!function(root, factory) {
  "function" == typeof define && define.amd ?

  define([], function() {
    return root.svg4everybody = factory();
  }) :
  "object" == typeof module && module.exports ?
  module.exports = factory() : root.svg4everybody = factory();
}

(this, function() {
  function embed(parent, svg, target) {
    if (target) {
      var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      viewBox && svg.setAttribute("viewBox", viewBox);

      for (var clone = target.cloneNode(!0); clone.childNodes.length; ) {
        fragment.appendChild(clone.firstChild);
      }

      parent.appendChild(fragment);
    }
  }

  function loadreadystatechange(xhr) {
    xhr.onreadystatechange = function() {
      if (4 === xhr.readyState) {
        var cachedDocument = xhr._cachedDocument;
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
        cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}),
        xhr._embeds.splice(0).map(function(item) {
          var target = xhr._cachedTarget[item.id];
          target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
          embed(item.parent, item.svg, target);
        });
      }
    },
    xhr.onreadystatechange();
  }

  function svg4everybody(rawopts) {
    function oninterval() {
      for (var index = 0; index < uses.length; ) {
        var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");

        if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)),
              svg && src) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              parent.removeChild(use);
              var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");

              if (url.length) {
                var xhr = requests[url];
                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                xhr._embeds = []),
                xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }),

                loadreadystatechange(xhr);
              }

              else {embed(parent, svg, document.getElementById(id));}
            }

            else {++index, ++numberOfSvgUseElementsToBypass;}
          }
        }

        else {++index;}
      }

      (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
    }

    var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;

    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;

    var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;

    polyfill && oninterval();
  }

  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
    return svg;
  }

  return svg4everybody;
});

svg4everybody();

var productItem = document.querySelectorAll('.product-item');

if(productItem) {
  for(var i=0; i < productItem.length; i++) {
    var productWrapper = productItem[i].querySelector('.product-item__description-wrapper');
    var productItemHover = 'product-item__description-wrapper_hover';
    var productItemActive = 'product-item__description-wrapper_active';
    var productItemTag = 'A IMG svg use';
    hoverActive(productItem[i], productWrapper, productItemHover, productItemActive, productItemTag);
  }
}

var videoBlock = document.querySelector('.video-block');

if(videoBlock) {
  var videoBlockHover = 'video-block_hover';
  var videoBlockActive = 'video-block_active';
  var videoBlockTag = 'A';
  hoverActive(videoBlock, videoBlock, videoBlockHover, videoBlockActive, videoBlockTag);
}

function hoverActive(block, element, elementClassHover, elementClassActive, tag) {
  block.addEventListener('mouseover', function(event) {
    var target = event.target.tagName;

    if(tag.indexOf(target) !== -1) {
      element.classList.add(elementClassHover);
    }
  });

  block.addEventListener('mouseout', function(event) {
    var target = event.target.tagName;

    if(tag.indexOf(target) !== -1) {
      element.classList.remove(elementClassHover);
    }
  });

  block.addEventListener('mousedown', function(event) {
    var target = event.target.tagName;

    if(tag.indexOf(target) !== -1) {
      element.classList.add(elementClassActive);
    }
  });

  block.addEventListener('mouseup', function(event) {
    var target = event.target.tagName;

    if(tag.indexOf(target) !== -1) {
      element.classList.remove(elementClassActive);
    }
  });
}
