$(document).ready(function(){


let topics = ["firefly", "buffy", "the next generation", "deep space nine", "battlestar galactica", "babylon 5", "farscape"]

function generateButtons(){

for(let j = 0; j<topics.length; j++){
    
    let topicsButton = $("<button class='buttons'>");
    topicsButton.attr("id", "show");
    topicsButton.attr("data-search", topics[j]);
    topicsButton.text(topics[j]);


    $(".js-button-box").append(topicsButton);

}
}


function display(){

//Clears out the gifs at every click
$(".js-gif-box").empty();

let target = $(this).data("search");
console.log(target);

let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Xf0hnGeWnHIBhnq3lXRZSAj470HT1XbM&q=" + target + "&limit=10&offset=0&rating=PG&lang=en"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

let results = response.data;
console.log(results);

    for(var i = 0; i<results.length; i++){
        //Assigns a still image to a variable
        let imgURL = results[i].images.downsized_still.url;
        //Assigns a gif to a variable
        let gifURL = results[i].images.downsized.url;
        //Creates an html object to hold the image, and assigns a source attribute
        let img = $("<img class='imgBox'>");//
            img.attr("src", imgURL);
            img.attr("data-state", "static");
            img.attr("data-static", imgURL);
            img.attr("data-animate", gifURL);
        //Creates a div to contain the image
        let gifBox = $("<div class='gifBox'>");
            //Places the image into the new div
            gifBox.append(img);
                //Places the image div onto its container on the index page
                $(".js-gif-box").append(gifBox);

};

});
};

function search(){
event.preventDefault();

let userInput = $(".js-input").val().trim();
topics.push(userInput);
$(".js-button-box").empty();
generateButtons();
};

generateButtons();

//Attatches a click function to the buttons. Needs to be set to "document" in order to function on all 
//loop-generated buttons
$(document).on("click", "#show", display);
$(".js-submit").on("click", search);

})