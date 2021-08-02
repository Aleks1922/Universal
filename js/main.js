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

});