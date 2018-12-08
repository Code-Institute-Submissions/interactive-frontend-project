$(document).ready(function() {

    $(".btn-default").addClass("fa fa-plus-square");

    $(".btn-default").parent().children("blockquote").hide();

    $(".btn-default").click(function() {
        $(this).parent().children("blockquote").slideToggle("Slow");
        $(this).toggleClass("fa fa-plus-square");
        $(this).toggleClass("fa fa-minus-square");
    });

});
