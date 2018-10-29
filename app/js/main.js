$(document).ready(function(){

    console.log('Hello from jQuery! Hello, its me');

    $('#btn-open-form').click(function(e){
        // отменяем стандартное поведение кнопки-ссылки
        e.preventDefault();
        console.log('click');
        // скрываем кнопку
        $(this).hide();
        $('.booking-form-wrapper').slideDown(1000);

    });
    // phone mask

    $('.phone-mask').mask("+7 (999) 999-99-99");

});