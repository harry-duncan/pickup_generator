$(document).ready(function(){

  $('#submit').on('click', function (e) {
    e.preventDefault();
    console.log("running")

    var $verb = $('#verb').val();
    var $adjective = $('#adjective').val();
    var $food = $('#food').val();
    var $greeting = $('#greeting').val();
    var $object = $('#object').val();
    var $profession = $('#profession').val();
    var $animal = $('#animal').val();

    $.ajax("http://api.giphy.com/v1/gifs/search?q=" + $verb + "+" + $adjective + "&api_key=dc6zaTOxFJmzC", {
      type:'GET'

    }).done(function(data){
      console.log("get request successfull")
      var img = data.data[0].images.downsized.url;
      $('.gif').empty();
      $('.gif').append('<img src="' + img + '">');
    })
  });

});