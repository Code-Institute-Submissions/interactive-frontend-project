$(document).ready(function() {


    $(".btn-default").parent().children("blockquote").hide();

    $(".btn-default").click(function() {
        $(this).parent().children("blockquote").slideToggle("Slow");
        $(this).children("#button-icon").toggleClass("fa fa-plus-square");
        $(this).children("#button-icon").toggleClass("fa fa-minus-square");
        $(this).toggleClass("btn-default");
        $(this).toggleClass("btn-default disabled");
    });


    $(".btn-default").parent().children(".selector").hide();

    $("#main-button").click(function() {
        $(this).parent().children(".selector").slideToggle("Slow");

    });


});
