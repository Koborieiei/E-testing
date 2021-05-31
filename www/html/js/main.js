$( document ).ajaxStart(function() {
  $( ".bg-loading" ).removeClass('none');
});

$( document ).ajaxStop(function() {
  $( ".bg-loading" ).addClass('none');
});
