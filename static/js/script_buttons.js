$(document).ready(function() {

    $(".btn-default").addClass("fa-plus-square");

    $(".btn-default").parent().children("blockquote").hide();

    $(".btn-default").click(function() {
        $(this).parent().children("blockquote").slideToggle("Slow");
        $(this).toggleClass("fa-plus-square");
        $(this).toggleClass("fa-minus-square");
    });

});
