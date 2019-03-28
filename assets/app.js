//append new button to #gifDisplay on click 

$(document).ready(function(){

var search = $("#searchField")
console.log(search.attr('value'))

$("#searchField").keyup(function(event) {
    if (event.keyCode === 13) {
      console.log(search.attr('value'));
      event.preventDefault();
      searchGIF(search.attr('value'));
    }
  });

  function searchGIF(searchVal){
      console.log(searchVal);
  }
  
});