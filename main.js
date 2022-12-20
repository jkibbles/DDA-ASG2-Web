import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, get, child, set, onValue, orderByChild} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
//Working with Auth
const auth = getAuth();
const db = getDatabase();
const playerRef = ref(db,"players");
const LeaderboardRef = ref(db,"leaderboards")
//getPlayerData();
//getLeaderboardData();
auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    console.log(user.email + " is logged in!");
    console.log(user.uid);
  } else {
    console.log('User is logged out!');
  }
});
let readBtn = document.getElementById("btn-read");
if(readBtn){
  readBtn.addEventListener("click", getPlayerDataProfile);}

//Update Leaderboard button
let updateLeaderboardBtn = document.getElementById("btn-leaderboard");
//updateLeaderboardBtn.addEventListener("click", console.log(`Updating`));
//updateLeaderboardBtn.addEventListener("click", updateLeaderboardData);
/*
updateLeaderboardBtn.addEventListener("click", function (e) {
e.preventDefault();
console.log(`Updating`);
//function to update leaderboard
updateLeaderboardData;
});
*/

let btnSignup = document.getElementById("btn-signup"); //signup btn
if(btnSignup){
btnSignup.addEventListener("click", function (e) {
e.preventDefault();
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
//let email = $("#email").val();
//let password = $("#password").val();
console.log(`Sign-ing up user with ${email} and password ${password}`);
//[STEP 4: Signup our user]
signUpUserWithEmailAndPassword(email, password);
});}

let btnSignIn = document.getElementById("btn-signin"); //signin btn
if(btnSignIn){
btnSignIn.addEventListener("click", function (e) {
e.preventDefault();
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
//let email = $("#email").val();
//let password = $("#password").val();
console.log(`Sign-ing in user with ${email} and password ${password}`);
//[STEP 4: Signup our user]
signInUserWithEmailAndPassword(email, password);
});}

let btnSignout= document.getElementById("btn-signout");
if(btnSignout){
  btnSignout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
    location.href = 'index.html';
    console.log('User signed out!');
  })}

function getLeaderboardData() {
  //const LeaderboardRef = ref(db, "leaderboards");
  //LeaderboardRef is declared at the top using a constant
  //get(child(db,`leaderboards/`))
  get(LeaderboardRef)
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
}//end getLeaderboardData


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

//retrieve element from form
var frmCreateUser = document.getElementById("frmCreateUser");
//we create a button listener to listen when someone clicks
if(frmCreateUser){
frmCreateUser.addEventListener("submit", function(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //createUser(email, password);
  console.log("email" + email + "password" + password);
});}


//create a new user based on email n password into Auth service
//user will get signed in
//userCredential is an object that gets
function signUpUserWithEmailAndPassword(email, password) {
  console.log("creating the user");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signedin
      const user = userCredential.user;
      location.href = 'home.html';
      console.log("created user ... " + JSON.stringify(userCredential));
      console.log("User is now signed in ");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}

//user will get signed in
//userCredential is an object that gets
function signInUserWithEmailAndPassword(email,password) {
  console.log("Signing in the user");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signedin
      const user = userCredential.user;
      location.href = 'home.html';
      console.log("signed in user ... " + JSON.stringify(userCredential));
      console.log("User is now signed in ");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
    });
}

//[STEP 4] Setup our player function to display info
function getPlayerDataProfile(e) {
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
    </tr><br>${childSnapshot.child("userName").val()}`;
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
    



//Setup our leaderboard function to display info
function updateLeaderboardData(e) {
  e.preventDefault();
  //LeaderboardRef is declared at the top using a constant
  //const LeaderboardRef = ref(db, "leaderboards");
  //get(child(db,`leaderboardRs/`))
  get(LeaderboardRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
  if (snapshot.exists()) {
  //if the data exist
  try {
  //let's do something about it
  var leaderboardContent = document.getElementById("leaderboard-content");
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
  leaderboardContent.innerHTML = content;
  } catch (error) {
  console.log("Error updateLeaderboardData" + error);
  }
  }else{
  //@TODO what if no data ?
  console.log("No data");
  }
  });
  } //end updateLeaderboardData

