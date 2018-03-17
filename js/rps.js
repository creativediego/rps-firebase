 $(document).ready(function() {



     // Initialize Firebase
     var config = {
         apiKey: "AIzaSyDi3JnOxTqaNGlsdSCddhKNajSmxf2ZJko",
         authDomain: "rps-game-3459b.firebaseapp.com",
         databaseURL: "https://rps-game-3459b.firebaseio.com",
         projectId: "rps-game-3459b",
         storageBucket: "",
         messagingSenderId: "218858079582"
     };
     firebase.initializeApp(config);


     var database = firebase.database();
     var playerID = 1;
     var playersRef = database.ref("players");
     var chatRef = database.ref("chat");

     var playerOneJoined = false;
     var playerTwoJoined = false;
     var playerOnePlayed = false;
     var playerTwoPlayed = false;
     var currentPlayer;
     var playerName;

     var rock = "<button class='rock'>ROCK</button>"
     var paper = "<button class='paper'>PAPER</button>"
     var scissors = "<button class='scissors'>SCISSORS</button>"

     /*
          database.ref("chat").on("child_added", function(snapshot) {


              console.log(snapshot.numChildren())

              if (snapshot.exists()) {
                  $("#chat-display").append(`<p>${snapshot.val().name}: ${snapshot.val().message}</p>`);
              }
          });
     */
     database.ref("chat/1").on("value", function(snapshot) {

         if (snapshot.child("status").exists() === false) {
             $("#chat-display").append(`<p>${snapshot.val().name}: ${snapshot.val().message}</p>`);


         } else {

             $("#chat-display").append(`<p>${snapshot.val().name} ${snapshot.val().status}</p>`);

         }

     });

     database.ref("chat/2").on("value", function(snapshot) {

         if (snapshot.child("status").exists() === false) {
             $("#chat-display").append(`<p>${snapshot.val().name}: ${snapshot.val().message}</p>`);


         } else {

             $("#chat-display").append(`<p>${snapshot.val().name} ${snapshot.val().status}</p>`);

         }



     });

     /*
     database.ref("chat").on("value", function(snapshot) {

         $("#chat-display").append(`<p>${snapshot.val().name} ${snapshot.val().status}</p>`);

     });

*/
     playersRef.on("value", function(snapshot) {
         let data = snapshot.val();

         if (snapshot.child("1").exists()) {

             $("#player-one").text(data[1].name)
             playerOneJoined = true;

         }

         if (snapshot.child("2").exists()) {
             $("#player-two").text(data[2].name)
             playerTwoJoined = true;
         }


         if (playerOneJoined === true && playerTwoJoined === true) {


             playersRef.update(turn = { turn: 1 })
                 //$("#player-one-choices").append(rock).append(paper).append(scissors);


         }

     });




     $(".rock").on("click", function() {

         let choice = $(this).attr("class")

         database.ref(`chat/ ${currentPlayer}/choice`).set();


     });





     $("#start").on("click", function(e) {
         e.preventDefault();

         playerName = $("#player-name").val().trim();

         player = {

             name: $("#player-name").val().trim(),
             losses: 0,
             wins: 0

         }

         if (playerOneJoined === false) {


             database.ref("players/1").set(player);
             $("#start-screen").html(`Hi, ${playerName}. You are Player 1.`)
             currentPlayer = 1


         } else if (playerTwoJoined === false) {

             database.ref("players/2").set(player);
             $("#start-screen").html(`Hi, ${playerName}. You are Player 2.`)
             currentPlayer = 2
         }


         firebase.database().ref("players/" + currentPlayer).onDisconnect().remove();


         firebase.database().ref("chat/" + currentPlayer).onDisconnect().update({

             status: "has disconnected"

         })

         //firebase.database().ref("chat/" + currentPlayer).onDisconnect().remove();

     });



     $("#send-chat").on("click", function(e) {
         e.preventDefault();
         let chatMessage = $("#chat-message").val().trim();

         chat = {
             name: playerName,
             message: chatMessage
         }

         database.ref("chat/" + currentPlayer).set(chat);

         //chatRef.push(chat);
         //CHECK IF PLAYER NAME HAS BEEN SET
         /* if (playerName !== "")
             chatRef.push(chat);
*/
     });

 });

 //IF NUMBER OF CHAT MESSAGES EXCEEDS 20, remove and restart