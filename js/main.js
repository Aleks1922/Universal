$(document).ready(function () {

  var modalButton = $('[data-toggle=modal]')
  var closeModalButton = $('.modal__close')
  modalButton.on('click', openModal)
  closeModalButton.on('click', closeModal)

  function openModal() {
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    var modal = $(".modal");
    modal.addClass("modal--visible");
    modalOverlay.addClass("modal__overlay--visible");
    modalDialog.addClass("modal__dialog--visible");
    document.body.classList.add('lock');
  }
  function closeModal(evt) {
    evt.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    var modal = $(".modal");
    modal.removeClass("modal--visible");
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
    document.body.classList.remove('lock');
  }

  $(".modal__overlay").on("click", closeModal);

  $(document).keydown('keydown', function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
      var modalOverlay = $(".modal__overlay");
      var modalDialog = $(".modal__dialog");
      var modal = $(".modal");
      modal.removeClass("modal--visible");
      modalOverlay.removeClass("modal__overlay--visible");
      modalDialog.removeClass("modal__dialog--visible");
      document.body.classList.remove('lock');
    }
  });

  // Отправка данных на сервер
  function send(event, php) {
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          alert("Сообщение отправлено");
        } else {
          // Если произошла ошибка
          alert("Ошибка. Сообщение не отправлено");
        }
        // Если не удалось связаться с php файлом
      } else { alert("Ошибка сервера. Номер: " + req.status); }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () { alert("Ошибка отправки запроса"); };
    req.send(new FormData(event.target));
  };

  const iconMenu = document.querySelector('.header-menu__icon');
  if (iconMenu) {
    const menuBody = document.querySelector('.header-menu');
    iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('lock');
      iconMenu.classList.toggle('header-menu__icon--active');
      menuBody.classList.toggle('header-menu--active');
    });
  };

  //mask phone
  $('.phone-with-ddd').mask('+7 (000) 000-00-00');

  var tabItem = $(".recomended-block");
  var contentItem = $(".content");

  tabItem.on("click", function (event) {
    var activeContent = $(this).attr("data-target");
    tabItem.removeClass("recomended-block--active");
    contentItem.removeClass("content--active");
    $(activeContent).addClass("content--active");
    $(this).addClass("recomended-block--active");
  })

  var newsIcon = $(".news__icon");

  newsIcon.on("click", function (event) {
    $(this).toggleClass('news__icon--active');
  })

  const hotSlider = new Swiper('.hot-slider__container', {
    // Optional parameters
    loop: true,

    autoplay: {
      delay: 3000,
    },

    speed: 1500,

    breakpoints: {
      568: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  });

  const publicationSlider = new Swiper('.publication-slider', {
    // Optional parameters
    loop: true,

    speed: 1000,

    navigation: {
      nextEl: '.publication-slider__button--next',
      prevEl: '.publication-slider__button--prev',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
  });

  const commentMore = document.querySelector('.comment-more');
  if (commentMore) {
    const commentOther = document.querySelector('.comment-other');
    commentMore.addEventListener("click", function (e) {
      commentMore.classList.toggle('header-menu__icon--active');
      commentOther.classList.toggle('comment-other--visible');
    });
  }

  const menuLinks = document.querySelectorAll('.header-menu__link[data-goto]');
  if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick)
    });

    function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth"
        });
        e.preventDefault();
      }
    }
  }

  var newsIcon = $(".main__icon");

  newsIcon.on("click", function (event) {
    $(this).toggleClass('main__icon--active');
  })

  $('.form').each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Пожалуйста введите имя",
          minlength: "Ваше имя не должно быть короче 2х символов"
        },
        email: {
          required: "Введите ваш контактный email адрес",
          email: "Ваш email адрес должен быть в формате name@domain.com"
        },
        phone: {
          required: "Пожалуйста введите ваш номер телефона",
          minlength: "Ваш номер слишком короткий"
        },
      }
    });
  })


});