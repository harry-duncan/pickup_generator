$(document).ready(function() {

  $('#submit').on('click', function (e) {
    e.preventDefault();

    var $verb = $('#verb').val();
    var $adjective = $('#adjective').val();
    var $food = $('#food').val();
    var $greeting = $('#greeting').val();
    var $object = $('#object').val();
    var $profession = $('#profession').val();
    var $animal = $('#animal').val();

    var formCheck = function () {
      if ($verb && $adjective){
        ajax();
      } else {
        $verb = "hot";
        $adjective = "chick";
        ajax();
      }
    };

    console.log( $verb, $adjective);

    var ajax = function () {

      $.ajax("http://api.giphy.com/v1/gifs/search?q=" + $verb + "+" + $adjective + "&api_key=dc6zaTOxFJmzC", {
      type:'GET'

      }).done(function(data) {
      console.log(data);
      var img = data.data[Math.floor(Math.random() * data.data.length)].images.downsized.url;

      $('.gif').empty();
      $('.gif').append('<img src="' + img + '">');
      $('.refresh').append('<a href="javascript:location.reload(true)">Try again bitch!</a>');
      });

    };

    formCheck();

  });

});