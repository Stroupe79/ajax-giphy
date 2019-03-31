//append new button to #gifDisplay on click 

$(document).ready(function () {

    var gifs = ["Futurama", "Rick and Morty", "Simpsons", "Family Guy"];

    buttons();

    function buttons() {
        $("#gifDisplay").empty();
        for (var i = 0; i < gifs.length; i++) {
            let button = $("<button>")
            button.addClass("btn btn-success m-5 clicky")
            button.attr("val", gifs[i]);
            button.text(gifs[i]);
            $("#gifDisplay").append(button);

        }

    }

    $("#searchField").keyup(function (event) {
        if (event.keyCode === 13) {
            var search = $("#searchField").val();
            searchGIF(search);
            event.preventDefault();
            gifs.push(search);
            search = "";
            buttons();
        }
    });

    // $("<button>").on("Click", searchGIF($("#searchField").val()));

    $(document).on("click", "#searchButton", function(){
        var search = $("#searchField").val()
        gifs.push(search);
        searchGIF(search);
        buttons();
    });

    $(document).on("click", ".clicky", function(){
        var search = $(this).attr("val")
        searchGIF(search);
        buttons();
    });

    $(document).on("click", "#randomButton", function(){
        console.log("random")
        randomGif();
    
})

    $(document).on("click", "#resetButton", function(){
        location.reload();
    })

    function randomGif(){
        let query = "https://api.giphy.com/v1/gifs/random?api_key=va3byTEOOuISlLe0hh47DYH0psyejaCo"
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response){
            $("#gifShow").html("");
            console.log(response)
            let stop = response.data.images.fixed_height_still.url
                let animate = response.data.images.fixed_height.url
            $("#gifShow").append("<img state='animated' class= 'm-5 gif' src=" + animate + " stop-animate=" + stop + " start-animate=" + animate + " /> <p> Title: " + response.data.title + "</p>")
        })
    }

    function searchGIF(searchVal) {
        console.log(searchVal);
        let query = "https://api.giphy.com/v1/gifs/search?q=" + searchVal + "&api_key=va3byTEOOuISlLe0hh47DYH0psyejaCo&limit=8";
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            $("#gifShow").html("");
            for (i = 0; i < 8; i++) {
                let stop = response.data[i].images.fixed_height_still.url
                let animate = response.data[i].images.fixed_height.url
                $("#gifShow").append("<img state='animated' class= 'm-5 gif' src=" + animate + " stop-animate=" + stop + " start-animate=" + animate + " /> <p> Rating: " + response.data[i].rating + "</p>");
            };
            $("#searchField").val("");
        });

    };

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("state");
        if (state === "animated"){
            $(this).attr("src", $(this).attr("stop-animate"))
            $(this).attr("state", "stopped")
        }
        if (state === "stopped"){
            $(this).attr("src", $(this).attr("start-animate"));
            $(this).attr("state", "animated");
        }

    });
    

});