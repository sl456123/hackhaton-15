

  import { getAuth, createUserWithEmailAndPassword  , auth} from "./firebase.js";




let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value.trim();

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("✅ User created:", user);
      window.location.href = "./login.html";
    })
    .catch((error) => {
      console.error("❌ Error:", error.message);
    });
});

