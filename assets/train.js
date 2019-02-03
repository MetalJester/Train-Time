var config = {
    apiKey: "AIzaSyBmdbUKKM--WLlBwoXvGGbdr7x1UVq3Dic",
    authDomain: "my-new-project-8d8e3.firebaseapp.com",
    databaseURL: "https://my-new-project-8d8e3.firebaseio.com",
    projectId: "my-new-project-8d8e3",
    storageBucket: "my-new-project-8d8e3.appspot.com",
    messagingSenderId: "796413688784"
};
firebase.initializeApp(config);  //intitalize and configure database

var database = firebase.database(); // naming the database as a variable to use within the code

$("#add-train-btn").on("click", function (event) { // on click event for the submit button
    event.preventDefault();

    var name = $("#train-name-input").val().trim();  // variables for each input of the form
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {    //saving the input info as new object 
        name: name,
        destination: destination,
        startTime: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);  // pushing the new object to the database

    console.log(newTrain.name);         // console log checks for each field of the form
    console.log(newTrain.destination);
    console.log(newTrain.startTime);  
    console.log(newTrain.frequency);

    $("#train-name-input").val("");     // clearing the form upon submittal so it's ready for the next input
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

})











// moment(currentTime).format("hh:mm")

    // moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X")