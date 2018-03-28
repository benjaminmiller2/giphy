$(document).ready(function(){

//Creates global variables
let topics = ["firefly", "buffy", "the next generation", "deep space nine", "battlestar galactica", "babylon 5", "farscape"]
let results;
let imgURL;
let gifURL;

//Creates several functions
//1)Create buttons; 2) Display the images/gifs; 3) Add new search/buttons; 4) Toggle still images and gifs
function generateButtons(){

    //Creates a loop to generate one button per array item
    for(let i = 0; i<topics.length; i++){
    
        //Assigns new html button to variable
        let topicsButton = $("<button class='buttons'>");

            //Assigns attributes to that variable
            topicsButton.attr("id", "gifButton");
            topicsButton.attr("data-search", topics[i]);
            topicsButton.text(topics[i]);

                //Places the new buttons to the DOM
                $(".js-button-box").append(topicsButton);

}
};

function display(){

    //Clears out the gifs at every click
    $(".js-gif-box").empty();

        //Assigns the text that had been assigned to the buttons to a variable that can be added to the API query
        let searchItem = $(this).data("search");
        
        console.log(searchItem);

            //Assigns the API query to a variable
            let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Xf0hnGeWnHIBhnq3lXRZSAj470HT1XbM&q=" + searchItem + "&limit=15&offset=0&rating=&lang=en"

                //Calls up data from the API
                $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                    
                    //Assings a variable to part of the data-path for simplicity
                    results = response.data;
                    console.log(results);

                        //Creates a loop to generate html holders for each item in the response, set to (15)
                        //and to display them on the DOM
                        for(var j = 0; j<results.length; j++){
        
                            //Assigns a still image to a variable
                            imgURL = results[j].images.downsized_still.url;
        
                            //Assigns a gif to a variable
                            gifURL = results[j].images.downsized.url;
        
                                //Creates an html object to hold the image,
                                //Assigns attributes to the image: source, state markers
                                let img = $("<img class='imgBox js-newState'>");//
                                img.attr("src", imgURL);
                                img.attr("data-state", "inactive");
                                img.attr("data-inactive", imgURL);
                                img.attr("data-active", gifURL);

                                    //Creates a div to contain the image
                                    let gifBox = $("<div class='gifBox'>");
        
                                        //Places the image into the new div
                                        gifBox.append(img);
        
                                            //Places the image div onto its container on the index page
                                            $(".js-gif-box").append(gifBox);

                                            console.log(gifURL);
                        };

                });
    };

function search(){

    //prevents the page from reloading on click
    event.preventDefault();

        //Assigns user input to a usable variable
        let userInput = $(".js-input").val().trim();

            //Pushes the input into the array, and triggers the creation of a new button
            topics.push(userInput);

                //Clears out the buttons on click to so that the array is not generated everytime  
                $(".js-button-box").empty();

                    //Re-generates buttons for the new array
                    generateButtons();
};

function animate() {

    //I borrowed this code from an example on github. My initial attempt was to use the image source 
    //as the basis of the conditional - as in "let status = $(this).attr('scr'); if(status === imgURL{
    //$(this).attr('src', gifURL)". However, I was not able to make this work. 
    //While I understand the gist of this code, I'm still unclear on "data-state", etc, as an attribute.
    //jQuery documentation on the internet hasn't been helpful
    
    //Creates a conditional where it if the image clicked is in one state it, it then changes to another
    let status = $(this).attr("data-state");
    if (status === "inactive") {
        $(this).attr("src", $(this).attr("data-active"));
        $(this).attr("data-state", gifURL);
      } else {
        $(this).attr("src", $(this).attr("data-inactive"));
        $(this).attr("data-state", imgURL);
}
};

//Generates the buttons on page load
generateButtons();

//Attatches a click function to the buttons. Needs to be set to "document" in order to function on all 
//loop-generated buttons
$(document).on("click", "#gifButton", display);
$(".js-submit").on("click", search);
$(document).on("click", ".js-newState", animate);

})