

 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgNZ_XkOy002oooh27ZWKqTliEAcxwMTk",
    authDomain: "train-schedule-d330d.firebaseapp.com",
    databaseURL: "https://train-schedule-d330d.firebaseio.com",
    projectId: "train-schedule-d330d",
    storageBucket: "train-schedule-d330d.appspot.com",
    messagingSenderId: "236459203107"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


     $("#add-train").on("click", function() {
         event.preventDefault();
     	
     	var name = $("#train-name-input").val().trim();
     	var destination = $("#destination-input").val().trim();
     	var firstTrainTime = $("#first-train-time-input").val().trim();
     	var frequency = $("#frequency-input").val().trim();

      var newTrain = {
        name,
        destination,
        firstTrainTime,
        frequency,
      };
      //push new data to firebase
      database.ref().push(newTrain);

      console.log(name);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

      //clear all text boxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-time-input").val("");
      $("#frequency-input").val("");
    });

    //create firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot);
      console.log(childSnapshot.val());

    //store everything in a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainOne = childSnapshot.val().firstTrainTime;
    var trainFrequency = childSnapshot.val().frequency;

   
    //add momentjs here//
   // var tFrequency ="#frequency-input";
   // var firstTime = "#first-train-time-input";
    var firstTimeConverted = moment(trainOne, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

      //current time
      var currentTime = moment();
      console.log("CURRENT TIME: "+ moment(currentTime).format("hh:mm"));

  //  //difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("Difference in time: " + diffTime);

      //time apart (remainder)
      var tRemainder = diffTime % trainFrequency;
      console.log(tRemainder);

  //    //minutes until train
      var tMinutesTillTrain = trainFrequency - tRemainder;
      console.log("minutes till train " + tMinutesTillTrain);

      //next train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

      var catchTrain =moment(nextTrain).format("HH:mm");

   // });
  //add each train's data to the table
    $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + catchTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
    


        });
      
 

