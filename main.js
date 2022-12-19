import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue, orderByChild} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const db = getDatabase();
const playerRef = ref(db,"players");
getPlayerData();

let readBtn = document.getElementById("btn-read");
readBtn.addEventListener("click", getPlayerDataB);

let btnSignup = document.getElementById("btn-signup"); //signup btn
btnSignup.addEventListener("click", function (e) {
e.preventDefault();
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
//let email = $("#email").val();
//let password = $("#password").val();
console.log(`Sign-ing up user with ${email} and password ${password}`);
//[STEP 4: Signup our user]
signUpUserWithEmailAndPassword(email, password);
});


function getPlayerData() {
  //const playerRef = ref(db, "players");
  //PlayerRef is declared at the top using a constant
  //get(child(db,`players/`))
  get(playerRef)
    .then((snapshot) => {//retrieve a snapshot of the data using a callback
      if (snapshot.exists()) {//if the data exist
        try {
          //let's do something about it
          var content = "";
          snapshot.forEach((childSnapshot) => {//looping through each snapshot
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Aray / forEach
            console.log("GetPlayerData: childkey " + childSnapshot.key);
          });
        } catch (error) {
          console.log("Error getPlayerData" + error);
        }
      }
    });
}//end getPlayerData

//Working with Auth
const auth = getAuth();
//retrieve element from form
var frmCreateUser = document.getElementById("frmCreateUser");
//we create a button listener to listen when someone clicks
frmCreateUser.addEventListener("submit", function(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //createUser(email, password);
  console.log("email" + email + "password" + password);
});


//create a new user based on email n password into Auth service
//user will get signed in
//userCredential is an object that gets
function signUpUserWithEmailAndPassword(email, password) {
  console.log("creating the user");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signedin
      const user = userCredential.user;
      console.log("created user ... " + JSON.stringify(userCredential));
      console.log("User is now signed in ");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}

//[STEP 4] Setup our player function to display info
function getPlayerDataB(e) {
    e.preventDefault();
    //playerRef is declared at the top using a constant
    //const playerRef = ref(db, "players");
    //get(child(db,`players/`))
    get(playerRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
    if (snapshot.exists()) {
    //if the data exist
    try {
    //let's do something about it
    var playerContent = document.getElementById("player-content");
    var content = "";
    snapshot.forEach((childSnapshot) => {
    //looping through each snapshot
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    console.log("User key: " + childSnapshot.key);
    console.log("Username: " + childSnapshot.child("userName").val());
    content += `username: <tr>
    <td>${childSnapshot.child("userName").val()}</td>
    </tr><br>`;
    });
    //update our table content
    playerContent.innerHTML = content;
    } catch (error) {
    console.log("Error getPlayerData" + error);
    }
    }else{
    //@TODO what if no data ?
    console.log("No data");
    }
    });
    } //end getPlayerData


    var currentTimestamp = new Date().getTime();
    var playerData = {
    active: true,
    createdOn: currentTimestamp,
    displayName: "testPlayer",
    email: "someemail@email.com",
    lastLoggedIn: currentTimestamp,
    updatedOn: currentTimestamp,
    userName: "some user name",
    };
    //set(ref(db, `players/${uuid}`), playerData);
    
onValue(playerRef, (snapshot) => {
  //const data = snapshot.val();
  updatePlayerContent(snapshot);
  });