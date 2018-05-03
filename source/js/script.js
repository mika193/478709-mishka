svg4everybody()

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
    myMap = new ymaps.Map('map', {
      center: [59.93878180, 30.32273263],
      zoom: 16,
      controls: ['geolocationControl', 'zoomControl', 'routeEditor', 'rulerControl']
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
