// moment().format();

var config = {
    apiKey: "AIzaSyDkxv05vz_yXDGLosj6DOFKPTZlvuT3qYY",
    authDomain: "train-schedule-a0190.firebaseapp.com",
    databaseURL: "https://train-schedule-a0190.firebaseio.com",
    projectId: "train-schedule-a0190",
    storageBucket: "train-schedule-a0190.appspot.com",
    messagingSenderId: "576614233876"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();
  

  $("#addTrainBtn").on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }

      trainData.ref().push(newTrain);

      alert("Train Added!");

      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

    return false;

  })

  trainData.ref().on("child_added", function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot.val().destination;
      var frequency = snapshot.val().frequency;
      var firstTrain = snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  })
  