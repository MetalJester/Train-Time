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

    var trainName = $("#train-name-input").val().trim();  // variables for each input of the form
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {    //saving the input info as new object 
        name: trainName,
        destination: trainDestination,
        startTime: firstTrain,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);  // pushing the new object to the database

    $("#train-name-input").val("");     // clearing the form upon submittal so it's ready for the next input
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

})


database.ref().on("child_added", function (dbSnapshot) {
    console.log(dbSnapshot.val());

    // Store everything into a variable.
    var dbName = dbSnapshot.val().name;
    var dbDestination = dbSnapshot.val().destination;
    var dbStart = dbSnapshot.val().startTime;
    var dbFreq = dbSnapshot.val().frequency;    

    //set the current time as a variable
    var currentTime = moment();   

    // set the train start time as a variable and convert
    var trainTime = moment(dbStart, "HH:mm");
    
    // calculate the number of minutes until the next train arrives
    var arrival = currentTime.diff(trainTime, 'minutes');
    var last = arrival % dbFreq;
    var away = dbFreq - last;
   
    //calculate the time the next train will arrive
    var nextTrain = currentTime.add(away, 'minutes');
    var arrivalTime = nextTrain.format("HH:mm");
   
    // Create a new row upon submittal
    var newRow = $("<tr>").append(
        $("<td>").text(dbName),
        $("<td>").text(dbDestination),
        $("<td>").text(dbFreq),
        $("<td>").text(arrivalTime),
        $("<td>").text(away)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});








// moment(currentTime).format("hh:mm")

    // moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X")