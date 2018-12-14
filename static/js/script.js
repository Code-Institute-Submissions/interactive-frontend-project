$(document).ready(function() {


    $("#selectors").hide();
    $("blockquote").hide();

    $(".btn-default").click(function() {
        $(this).parent().children("blockquote").slideToggle("Slow");
        $(this).children("#button-icon").toggleClass("fa fa-plus-square");
        $(this).children("#button-icon").toggleClass("fa fa-minus-square");
        $(this).toggleClass("btn-default");
        $(this).toggleClass("btn-default disabled");
    });

    $("#main-button").click(function() {
        $(this).parent().siblings("#selectors").slideToggle("Slow");

    });


});
