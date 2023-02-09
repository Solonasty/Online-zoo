// BURGER

let burger = document.querySelector(".burger");
let popupBurger = document.querySelector(".popup_burger");
let body = document.body;

// Clone menu for creating styles for mobile
let menu = document.querySelector(".menu").cloneNode(1);

// Add to icon burger action hambHandler
burger.addEventListener("click", hambHandler);

// Click actions:
function hambHandler(e) {
  e.preventDefault();
  // Change styles on click
  popupBurger.classList.toggle("popup_open");
  burger.classList.toggle("popup_active");
  body.classList.toggle("noscroll");
  renderPopup();
}

// Copy nav to burger
function renderPopup() {
  popupBurger.appendChild(menu);
}

// Code for closing menu
let links = Array.from(menu.children);

// For each clicked menu item call the function closeOnClick
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Closing the pop-up on click on the menu
function closeOnClick() {
  popupBurger.classList.remove("popup_open");
  burger.classList.remove("active");
  body.classList.remove("noscroll");
}

// CAROUSEL

let block = document.querySelectorAll('.animals__block');
let currentBlock = 0;
let isEnabled = true;
let controlLeft = document.querySelector('.control.left');
let controlRight = document.querySelector('.control.right');

function changeCurrentBlock(n) {
    currentBlock = (n + block.length) % block.length;
}

function previousBlock(n) {
    hideBlock('to-right');
    changeCurrentBlock(n - 1);
    showBlock('from-left');
}

function nextBlock(n) {
    hideBlock('to-left');
    changeCurrentBlock(n + 1);
    showBlock('from-right');
}

function hideBlock(direction) {
    isEnabled = false;
    block[currentBlock].classList.add(direction);
    block[currentBlock].addEventListener('animationend', function() {
        this.classList.remove('active', direction)
    })
}

function showBlock(direction) {
    block[currentBlock].classList.add('next', direction);
    block[currentBlock].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;

    })
}

controlRight.addEventListener('click', function() {
    if(isEnabled) {
        nextBlock(currentBlock)
    }
})

controlLeft.addEventListener('click', function() {
    if(isEnabled) {
        previousBlock(currentBlock)
    }
})

// hideElements

let width = window.screen.width;
function hideElements() {

  if( width <= 1000 ) {
    for (let item of block) {
        item.lastElementChild.classList.add('remove');
        item.lastElementChild.previousElementSibling.classList.add('remove');
      }
    matchMedia('only screen and (min-width:1000px)').addEventListener('change', function removeItem() {

      for (let item of block) {
        item.lastElementChild.classList.toggle('remove');
        item.lastElementChild.previousElementSibling.classList.toggle('remove');
      }

    });
  }

  else {
    matchMedia('only screen and (min-width:1000px)').addEventListener('change', function removeItem() {

      for (let item of block) {
        item.lastElementChild.classList.toggle('remove');
        item.lastElementChild.previousElementSibling.classList.toggle('remove');
      }

    });
  }
}

hideElements();

// TESTIMONIALS

function testimonialsSlider() {

  let amount;

  if( width > 800 ) {

    $('.responsive').on('init reInit',function(event,slick) {
      amount = slick.slideCount - 3;
      $('#range').attr('max',amount);
    })

    $('.responsive').on('afterChange',function(e,slick,currentSlide){
      $('#range').val(currentSlide+1);
    })

    $('#range').on('input change',function(){
      $('.responsive').slick('slickGoTo',this.value-1);
    });

    $('.responsive').slick({
      slidesToShow:4,
      slidesToScroll: 1,
      infinite: false,
      arrows:false,
      dots:false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 800,
          settings: "unslick"
        }
      ]
    })

  }

  else if ( width <= 800 ) {

    $('.item').click(function() {

      let description = this.querySelector('.description');
      let description_popup = document.querySelector('.description_popup');

      description_popup.innerHTML = description.innerHTML;

      $('.popup').fadeIn();
      $('.popup').addClass("shadow");
      $('body').css({overflow: "hidden"});
    });

    $('.close').click(function() {
      $('.popup').fadeOut('fast');
      $('.popup').removeClass("shadow");
      $('body').css({overflow: ""});
    });

      matchMedia('only screen and (min-width:800px)').addEventListener('change', function() {


        $('.responsive').on('init reInit',function(event,slick) {
          amount = slick.slideCount - 2;
          $('#range').attr('max',amount);
        })

        $('.responsive').on('afterChange',function(e,slick,currentSlide){
          $('#range').val(currentSlide+1);
        })

        $('#range').on('input change',function(){
          $('.responsive').slick('slickGoTo',this.value-1);
        });

        $('.responsive').not('.slick-initialized').slick({
          slidesToShow:3,
          slidesToScroll: 1,
          infinite: false,
          arrows:false,
          dots:false,
      });
    });
  }
}

testimonialsSlider();
