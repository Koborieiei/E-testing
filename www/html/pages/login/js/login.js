
$('#formEmpty').on('submit', function(event) {
  event.preventDefault();

  if ($('#formEmpty').smkValidate()) {
    $.post( "../../pages/login/ajax/AED.php", $( "#formEmpty" ).serialize() )
      .done(function( data ) {
        $.smkAlert({text: data.message,type: data.status});
        if(data.status == 'success'){
          $('#formEmpty').smkClear();
          setTimeout(function(){
            window.location = data.returnURI+'/';
          }, 800);
        }

    });
  }

});

$('#formEmail').on('submit', function(event) {
  event.preventDefault();

  if ($('#formEmail').smkValidate()) {
    $.post( "../../pages/login/ajax/AEDEmail.php", $( "#formEmail" ).serialize() )
      .done(function( data ) {
        $.smkAlert({text: data.message,type: data.status});
        if(data.status == 'success'){
          $('#formEmail').smkClear();
          $('#staticBackdrop').modal('toggle');
        }

    });
  }

});
