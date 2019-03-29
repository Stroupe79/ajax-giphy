//append new button to #gifDisplay on click 

$(document).ready(function () {

    var gifs = ["Cats", "Dogs", "Horses", "Ducks"];

    buttons();

    function buttons() {
        $("#gifDisplay").empty();
        for (var i = 0; i < gifs.length; i++) {
            let button = $("<button>")
            button.addClass("btn btn-success m-5")
            button.attr("val", gifs[i]);
            button.text(gifs[i]);
            $("#gifDisplay").append(button);

        }

    }

    $("#searchField").keyup(function (event) {
        if (event.keyCode === 13) {
            var search = $("#searchField").val();
            searchGIF(search);
            console.log(search)
            event.preventDefault();
            gifs.push(search);
            search = "";
            buttons();
        }
    });

    function searchGIF(searchVal) {
        console.log(searchVal);
        let query = "https://api.giphy.com/v1/gifs/search?q=" + searchVal + "&api_key=va3byTEOOuISlLe0hh47DYH0psyejaCo&limit=8";
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            $("#gifShow").html("");
            for (i = 0; i < 8; i++){
            console.log(response)
            $("#gifShow").append("<img class= 'm-5' src=" + response.data[i].images.fixed_height.url + " />")
            }
        });

    }

});