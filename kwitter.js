function addUser() {
  userName = document.getElementById("userName").value;
  localStorage.setItem("user_name", userName);
  window.location = "kwitter_room.html";
}
