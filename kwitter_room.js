var firebaseConfig = {
      apiKey: "AIzaSyATMDZq3gko-cDvsjBjclu8_fK2pImZ0vE",
      authDomain: "kwitter-chat-463cd.firebaseapp.com",
      projectId: "kwitter-chat-463cd",
      storageBucket: "kwitter-chat-463cd.appspot.com",
      messagingSenderId: "382990099175",
      appId: "1:382990099175:web:c55b7f12583fa4f79eb842",
      measurementId: "G-G33X2KFT0S"
    };

 firebase.initializeApp("firebaseConfig")

 user_name=localStorage.getItem("user_name");

 room_name=localStorage.getItem("room_name");

 document.getElementById("user_name").innerHTML = "Welcome" + user_name + "!";

 function addroom()
{
      room_name=document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });

      localStorage.setItem("room_name" , room_name);

      window.location = "kwitter_page.html";
}


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + "onclick = 'redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
  document.getElementById("msg").value="";
}