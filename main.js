import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase,query, ref, get, child, set, onValue, orderByChild, orderByValue} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
//Working with Auth
const auth = getAuth();
const db = getDatabase();
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



    var rankNo=0;
    var tbody=document.getElementById('tbody1');

function AddItemToTable(name,timeMin,timeSec){
  if(rankNo<=8){
  let trow=document.createElement("tr");
  let td1=document.createElement('td');
  let td2=document.createElement('td');
  let td3=document.createElement('td');

  td1.innerHTML=++rankNo;
  td2.innerHTML=name;
  td3.innerHTML=timeMin+"m:"+timeSec+"s";

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);

  tbody.appendChild(trow);}
}
function AddLeaderboardData(player){
  rankNo=0;
  tbody.innerHTML="";
  player.forEach(element => {
    AddItemToTable(element.userName,element.fastestMin,element.fastestSec);
  });
}

function GetLeaderboardData(){
  const dbref =query(ref(db,"leaderboards"),orderByChild("fastestMin"));
  get(dbref).then((snapshot)=>{
    var players=[];
    snapshot.forEach(childSnapshot=>{
      players.push(childSnapshot.val());
    });
    AddLeaderboardData(players);
  })
}
window.onload=GetLeaderboardData;


