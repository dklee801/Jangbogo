//버튼 색 제거,추가
$('.tab_menu_btn').on('click',function(){
    $('.tab_menu_btn').removeClass('on');
    $(this).addClass('on')
});

//1번 컨텐츠
$('.tab_menu_btn1').on('click',function(){
    $('.tab_box').hide();
    $('.tab_box1').show();
});

//2번 컨텐츠
$('.tab_menu_btn2').on('click',function(){
    $('.tab_box').hide();
    $('.tab_box2').show();
});


//3번 컨텐츠
$('.tab_menu_btn3').on('click',function(){
    $('.tab_box').hide();
    $('.tab_box3').show();
});


//4번 컨텐츠
$('.tab_menu_btn4').on('click',function(){
    $('.tab_box4').show();
});

