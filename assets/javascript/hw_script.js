// Create array
var topics = ["scooby doo", "sailor moon", "space ghost", "thundercats", "bugs bunny", "porky pig", "my little pony", "strawberry shortcake", "tom and jerry", "snagglepuss", "yogi bear", "spongebob"];


// Functions

function renderButtons() {

	// Clear buttons before appending
	$("#displayButtons").empty();

	// Loop through topics array
	for (i=0; i < topics.length; i++) {
		console.log(topics[i]);
		// Create button
		var a = $("<button class=\"btn btn-default\">");
		// Add class of topic
		a.addClass("topics");
		// Add data-attribute
		a.attr("data-name", topics[i]);
		// Add text to button
		a.text(topics[i]);
		// Append buttons to div displayButtons
		$("#displayButtons").append(a);
	}

}

// Add topic to array
$("#submitButton").on("click", function(){

	// This line prevents the page from refreshing when a user hits "enter".
  event.preventDefault();

  // Get input
  var newTopic = $("#addTopic").val().trim();

  // Add to topics array
  topics.push(newTopic);

  // Clear input field
  $("#addTopic").val("");

  // Reset buttons
  renderButtons();

});

// Function to display Gifs on click

function displayGifs() {

	// Get topic name from button
	var topic = $(this).attr("data-name");
	// Build url to use in query to API
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	// Clear old Gifs
	$("#gifImages").empty();

	// Ajax and API
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		console.log(response);

		// Create loop to create divs for the 10 gifs in the response array
		for (i=0;i<response.data.length;i++) {

			// Create div for gif
			var gifDiv = $("<div class=\"giffy\">");
			// Create variable for rating
			var gifRating = response.data[i].rating;
			console.log(gifRating);
			gifRating = gifRating.toUpperCase();
			// Create and populate p to hold rating
			var printRating = $("<p>").text("Rating: " + gifRating);
			// Append to gifDiv
			gifDiv.append(printRating);

			// Get image urls
			var imgURL = response.data[i].images.original.url;
			var imgURL_still = response.data[i].images.original_still.url;

			// Create img
			var imgGif = $("<img height=\"200px\"data-state=\"still\" class=\"gif\">");
			imgGif.attr("src", imgURL_still);
			imgGif.attr("data-still", imgURL_still);
			imgGif.attr("data-animate", imgURL);
			//Append to gifDiv
			gifDiv.append(imgGif);

			// Append gifDiv to gifImages div on page
			$("#gifImages").append(gifDiv);
		}

	});

}

// Create initial buttons on page
renderButtons();

// Adding click event listeners to all elements with a class topics because the buttons are created dynamically
$(document).on("click", ".topics", displayGifs);

// Toggle animation on gif
$(document).on("click",".gif", function() {
	// Create variable to get image state
	var state = $(this).attr("data-state");
	console.log(state);
	// Check and see if it is animating or not
	if (state == "still") {
		// Change to animating src and change data-state
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");

	} else {
		// Change to still src and change data-state
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");

	}

})


