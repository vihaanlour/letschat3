var firebaseConfig = {
  apiKey: "AIzaSyCveckGMsQ_1w5K0p1_LH4RXYzcd2kXCcE",
  authDomain: "kwitternew-cd648.firebaseapp.com",
  databaseURL: "https://kwitternew-cd648-default-rtdb.firebaseio.com",
  projectId: "kwitternew-cd648",
  storageBucket: "kwitternew-cd648.appspot.com",
  messagingSenderId: "385292923694",
  appId: "1:385292923694:web:ad178574ea9c693aff80bf",
  measurementId: "G-9X8RJE7BQ6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0,
  });
  document.getElementById("msg").value = "";
}
function getData() {
  firebase
    .database()
    .ref("/" + room_name)
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Start code
          name = message_data["name"];
          message = message_data["message"];
          like = message_data["like"];
          name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
          row = name_with_tag + message_with_tag + like_button + span_with_tag;
          document.getElementById("output").innerHTML += row;
          //End code
        }
      });
    });
}
getData();

function updateLike(firebase_message_id) {
  likes = document.getElementById(firebase_message_id).value;
  updated_likes = Number(likes) + 1;
  firebase.database().ref(room_name).child(firebase_message_id).update({
    like: updated_likes,
  });
}

function logOut() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
