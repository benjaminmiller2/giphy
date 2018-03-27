
let search = "futurama";
let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Xf0hnGeWnHIBhnq3lXRZSAj470HT1XbM&q=" + search + "&limit=5&offset=0&rating=PG&lang=en"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);

    let gifImage = $("<img>");
   

    $(".js-gif").append(gifImage);
    
    gifImage.attr("src", response.data[0].images.downsized.url);


});