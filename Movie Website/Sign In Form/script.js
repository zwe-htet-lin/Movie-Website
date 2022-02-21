const allInputs = document.querySelectorAll("input");

const formSignIn = document.querySelector(".formSignIn");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

const formSignUp = document.querySelector(".formSignUp");
const username = document.querySelector(".username");
const email2 = document.querySelector(".email2");
const password2 = document.querySelector(".password2");
const confirmPassword = document.querySelector(".confirmPassword");

const eyeBtn = document.querySelector(".eyeBtn");
const eyeBtn2 = document.querySelector(".eyeBtn2");
const eyeBtn3 = document.querySelector(".eyeBtn3");

const signInBtn = document.querySelector(".signInBtn");
const signUpBtn = document.querySelector(".signUpBtn");
const signInForm = document.querySelector(".signInForm");
const signUpForm = document.querySelector(".signUpForm");

// Input text effect
allInputs.forEach(input => {
    input.addEventListener("focus", () => {
        const parent = input.parentElement;
        parent.classList.add("active");
    });
    input.addEventListener("blur", () => {
        const parent = input.parentElement;
        parent.classList.remove("active");
    });
});

// Sign in password input show and hide
eyeBtn.addEventListener("click", () => {
    if(password.type === "password"){
        password.type = "text";
        eyeBtn.textContent = "visibility";
    } else{
        password.type = "password";
        eyeBtn.textContent = "visibility_off";
    }
});
// Sign up password input show and hide
eyeBtn2.addEventListener("click", () => {
    if(password2.type === "password"){
        password2.type = "text";
        eyeBtn2.textContent = "visibility";
    } else{
        password2.type = "password";
        eyeBtn2.textContent = "visibility_off";
    }
});
// Sign up confirm password input show and hide
eyeBtn3.addEventListener("click", () => {
    if(confirmPassword.type === "password"){
        confirmPassword.type = "text";
        eyeBtn3.textContent = "visibility";
    } else{
        confirmPassword.type = "password";
        eyeBtn3.textContent = "visibility_off";
    }
});

// Show error
const showError = (input,message) => {
    const field = input.parentElement;
    const fieldContainer = field.parentElement;
    fieldContainer.classList.add("error");

    const small = fieldContainer.querySelector("small");
    small.textContent = message;
};
// Show success
const showSuccess = (input) => {
    const field = input.parentElement;
    const fieldContainer = field.parentElement;
    fieldContainer.classList.remove("error");
    fieldContainer.classList.add("success");
};
//Check email has a special character or not
const isEmail = (email) => {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

// Check sign in inputs are empty or not
const checkSignInInputs = () => {

    //check email is empty or not
    if(email.value === ""){
        showError(email,"Missing email");
    }else if(!isEmail(email.value)){
        showError(email,"Please use a valid email");
    }else{
        showSuccess(email);
    };

    // Check password is empty or not
    if(password.value === ""){
        showError(password,"Missing password");
    }else if(password.value.length < 6){
        showError(password,"Password must be at least 6 characters");
    }else if(password.value.length > 15){
        showError(password,"Password must be less than 15 characters");
    }else{
        showSuccess(password);
    }

    const allFieldContainer = formSignIn.querySelectorAll(".fieldContainer");
    if(allFieldContainer[0].classList.contains("success") && allFieldContainer[1].classList.contains("success")){
        window.location.href = "../index.html";
    };
};
// Sign in submit error and success effect
formSignIn.addEventListener("submit", async (event) => {
    event.preventDefault();
    checkSignInInputs();
});

// Check sign up inputs are empty or not
const checkSignUpInputs = () => {
    if(username.value === ""){
        showError(username,"Username cannot be blank");
    }else{
        showSuccess(username);
    };

    if(email2.value === ""){
        showError(email2,"Email cannot be blank");
    }else if(!isEmail(email2.value)){
        showError(email2,"Please use a valid email");
    }else{
        showSuccess(email2);
    };

    if(password2.value === ""){
        showError(password2,"Password cannot be blank");
    }else if(password2.value.length < 6){
        showError(password2,"Password must be at least 6 characters");
    }else if(password2.value.length > 15){
        showError(password2,"Password must be less than 15 characters");
    }else{
        showSuccess(password2);
    };
    
    if(confirmPassword.value === ""){
        showError(confirmPassword,"Password cannot be blank");
    }else if(confirmPassword.value !== password2.value){
        showError(confirmPassword,"Password do not match");
    }else{
        showSuccess(confirmPassword);
    };

    const allFieldContainer = formSignUp.querySelectorAll(".fieldContainer");
    if(allFieldContainer[0].classList.contains("success") && allFieldContainer[1].classList.contains("success")
       && allFieldContainer[2].classList.contains("success") && allFieldContainer[3].classList.contains("success")){
        window.location.href = "../index.html";
    };
};
// Sing up submit error and success effect
formSignUp.addEventListener("submit",(event)=> {
    event.preventDefault();
    checkSignUpInputs();
});

// Sign up and sign in form show and hide animation
signUpBtn.addEventListener("click",() => {
    signInForm.classList.add("hide");
    signInForm.classList.remove("show")
    signUpForm.classList.add("show");
})

signInBtn.addEventListener("click", () => {
    signUpForm.classList.remove("show");
    signInForm.classList.remove("hide");
    signInForm.classList.add("show");
})