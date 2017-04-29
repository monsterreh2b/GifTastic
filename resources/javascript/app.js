// SETUP VARIABLES
// ==========================================================
var topics = ["Michael Jordan", "Magic Johnson", "Larry Bird", "Karl Malone"];


// FUNCTIONS
// ==========================================================
// Function for displaying basketball players
      function renderButtons() {

        // Delete the content inside the topics-view div prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $('#topics-view').empty();
        // Loop through the array of topics, then generate buttons for each topic in the array
        for (var i=0;i<topics.length; i++){
          var a= $("<button>");
          a.addClass("topic");
          a.attr("data-name", topics[i]);
          
          // console.log(a.attr("data-state"));
          a.text(topics[i]);
          $("#topics-view").append(a);
          
        }

      }


      $(document).on("click", ".topic", function() {
      var person = $(this).attr("data-name");
      var state = $(this).attr("data-state");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      
  

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        	console.log(response);
          var results = response.data;
          
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
         personImage.addClass("giphy");
            //when you create the images, set one attribute to be the 
            //still and one to be the moving gif url
            //then in your click function later, you can reference the 
            //data-still if it needs to be still or data-moving if it needs 
            //
            personImage.attr("src", results[i].images.fixed_height_still.url);
           personImage.attr("data-state","still");
           personImage.attr("data-still", results[i].images.fixed_height_still.url);
           personImage.attr("data-animate", results[i].images.fixed_height.url);
            // console.log($(this).attr("data-state"));
            gifDiv.append(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);

            
            
          }
         // $(document).on("click", ".giphy", function() {
          $(".giphy").on("click",function(){
            var state = $(this).attr("data-state");
          
if (state === 'still'){
        $(this).attr("src", $(this).attr("data-animate")); 
        $(this).attr("data-state","animate");
      }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});
        });
        // $(document).on("click", ".new", function() {
  
      
 // });

    });


// METHODS
// ==========================================================
 // This function handles events where the add topic button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // Write code to grab the text the user types into the input field
        // Write code to add the new topic into the topics array
        var topic = $("#topic-input").val().trim();
        // The renderButtons function is called, rendering the list of topic buttons
        topics.push(topic);
        $("#topic-input").val("");
        renderButtons();
      });
      renderButtons();
