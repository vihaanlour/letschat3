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

userName = localStorage.getItem("user_name");
document.getElementById("userName").innerHTML = "Welcome " + userName + "!";

function addRoom() {
  roomName = document.getElementById("roomName").value;
  firebase.database().ref("/").child(roomName).update({
    purpose: "adding room name",
  });
  localStorage.setItem("room_name", roomName);
  window.location = "kwitter_page.html";
}
function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        //Start code
        row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
        document.getElementById("output").innerHTML += row;
        //End code
      });
    });
}
getData();

function redirectToRoomName(name) {
  localStorage.setItem("room_name", roomName);
  window.location = "kwitter_page.html";
}
function logOut() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
