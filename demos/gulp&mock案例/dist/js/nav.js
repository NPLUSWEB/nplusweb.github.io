/**
 * Created by Gavin on 2017/10/9.
 */
$(function () {
    $('.menu li').hover(
        function () {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).find('.nav-list-group').show();
        },
        function () {
            $(this).removeClass('on');
            $(this).find('.nav-list-group').hide();
        }
    );
    $('.nav-list-group li').hover(
        function () {
            $(this).addClass('active').siblings().removeClass('active');
        },
        function () {
            $(this).removeClass('active');
        }
    );
});