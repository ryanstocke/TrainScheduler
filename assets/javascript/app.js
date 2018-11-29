$(document).ready(function(){
  $('.timepicker').timepicker();
});

var config = {
  apiKey: "AIzaSyCQyBs_i4SQXBGaVzIBnpRKtg5iHpkvGgU",
  authDomain: "trainsimulator-58053.firebaseapp.com",
  databaseURL: "https://trainsimulator-58053.firebaseio.com",
  projectId: "trainsimulator-58053",
  storageBucket: "trainsimulator-58053.appspot.com",
  messagingSenderId: "1070569809801"
};
firebase.initializeApp(config);

//need get from firebase 
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

//grabs information from the form
$("#addTrainBtn").on("click", function () {
  event.preventDefault();
  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrain = $("#firstInput").val().trim();
  frequency = $("#frequencyInput").val().trim();
  
  if (trainName == "") {
    alert('Enter a train name.');
    return false;
  }
  if (destination == "") {
    alert('Enter a destination.');
    return false;
  }
  if (firstTrain == "") {
    alert('Enter a first train time.');
    return false;
  }
  if (frequency == "") {
    alert('Enter a frequency');
    return false;
  }
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstInput").val("");
  $("#frequencyInput").val("");
});




database.ref().on("child_added", function(childSnapshot) {

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  var timeConvert = moment(firstTrain, "hh:mm").subtract(1, "years");

  var currentTime = moment();

  var difference = currentTime.diff(moment(timeConvert), "minutes");

  var remainder = difference % frequency;

  var minutesAway = frequency - remainder;

  var nextTrain = currentTime.add(minutesAway, "minutes");

  var nextArrival = moment(nextTrain).format("hh:mm");

  $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});






  // NO CODE BELOW THIS LINE