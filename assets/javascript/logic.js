
let search = "futurama";
let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Xf0hnGeWnHIBhnq3lXRZSAj470HT1XbM&q=" + search + "&limit=10&offset=0&rating=PG&lang=en"



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    for(var i = 0; i<10; i++){
let results = response.data;
let imgURL = results[i].images.downsized_still.url;//still imag

let img = $("<img>");
        img.attr("src", imgURL);

let gifBox = $("<div>");

gifBox.append(img);

$(".js-gif-box").append(gifBox);


};

});