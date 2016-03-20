var noun, pronoun, verb, adjective, food, greeting, object;

$(document).ready(function(){

  $('.main').on('submit', '.form', function (e) {
    e.preventDefault();
    $.ajax("http://api.giphy.com/v1/gifs/search?q=" + noun +  "+" + adjective + "&api_key=dc6zaTOxFJmzC", {
      type:'GET'
    }).done(function(){
      console.log("get request successful");
      $('.gif').append("<img >");
    })
  });


});