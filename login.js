// Animations
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});


// Check Register Error
const form = document.querySelector('form')
const username = document.getElementById('username')
const usernameError = document.querySelector("#username-error")
const email = document.getElementById('email')
const emailError = document.querySelector("#email-error")
const password = document.getElementById('password')
const passwordError = document.querySelector("#password-error")

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
    const small = formControl.querySelector('small')
    small.innerText = ''
}

// Check email is valid
function checkEmail(email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

email.addEventListener("input", function(){
    if (!checkEmail(email.value)) {
        emailError.textContent = "*Email is not valid"
    }else {
        emailError.textContent = "";
    }
})

// Check length input user name
username.addEventListener("input", function(){
    if (username.value.length < 4) {
        usernameError.textContent = "*Username must be at least 8 characters."
    }else if(username.value.length > 20){
        usernameError.textContent = "*Username must be less than 20 characters.";
    }else {
        usernameError.textContent = "";
    }
})

// Check length input password
password.addEventListener("input", function(){
    if (password.value.length < 8) {
        passwordError.textContent = "*Password must be at least 8 characters."
    }else if(password.value.length > 20){
        passwordError.textContent = "*Password must be less than 20 characters."
    }else {
        passwordError.textContent = "";
    }
})


// Check required fields
function checkRequired(inputArr) {
    let isRequired = false
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `*${getFieldName(input)} is required`)
            isRequired = true
        }else {
            showSuccess(input)
        }
    })

    return isRequired
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!checkRequired([username, email, password])) {
        // checkLength(username, 3, 15)
        // checkLength(password, 6, 25)
        // checkEmail(email)
    } 
})

// Check Login Error

let lgForm = document.querySelector('.form-lg')
let lgEmail = document.querySelector('.email-2')
let lgEmailError = document.querySelector(".email-error-2")
let lgPassword = document.querySelector('.password-2')
let lgPasswordError = document.querySelector(".password-error-2")

function showError2(input, message) {
    const formControl2 = input.parentElement
    formControl2.className = 'form-control2 error'
    const small2 = formControl2.querySelector('small')
    small2.innerText = message
}

function showSuccess2(input) {
    const formControl2 = input.parentElement
    formControl2.className = 'form-control2 success'
    const small2 = formControl2.querySelector('small')
    small2.innerText = '';
}

// Check email is valid
function checkEmail2(lgEmail) {
    const emailRegex2 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex2.test(lgEmail);
}

lgEmail.addEventListener("input", function(){
    if (!checkEmail2(lgEmail.value)) {
        lgEmailError.textContent = "*Email is not valid"
    }else {
        lgEmailError.textContent = "";
    }
})

// Check length input passwrod
lgPassword.addEventListener("input", function(){
    if (lgPassword.value.length < 8) {
        lgPasswordError.textContent = "*Password must be at least 8 characters."
    }else if (lgPassword.value.length > 20){
        lgPasswordError.textContent = "*Password must be less than 20 characters."
    }else {
        lgPasswordError.textContent = "";
    }
})

function checkRequiredLg(inputArr2) {
    let isRequiredLg = false
    inputArr2.forEach(function(input){
        if (input.value.trim() === '') {
            showError2(input, `*${getFieldNameLg(input)} Please enter your information in this field`)
            isRequiredLg = true
        }else {
            showSuccess2(input)
        }
    })

    return isRequiredLg
}

function getFieldNameLg(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

lgForm.addEventListener('submit', function (e){
    e.preventDefault()

    if (!checkRequiredLg([lgEmail, lgPassword])) {
        checkEmail2(lgEmail)
    }
})

// Në pjesën e Login form submission
lgForm.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!checkRequiredLg([lgEmail, lgPassword])) {
        checkEmail2(lgEmail)
        
        // Nëse të gjitha validimet janë të suksesshme, ridrejto në index.html
        window.location.href = 'indexi.html';
    }
})

lgForm.addEventListener('submit', function (e) {
    e.preventDefault()
    
    const isEmailValid = checkEmail2(lgEmail.value) && lgEmail.value.trim() !== '';
    const isPasswordValid = lgPassword.value.length >= 8 && lgPassword.value.length <= 20;
    
    if (isEmailValid && isPasswordValid) {
        window.location.href = 'indexi.html';
    } else {
        if (!isEmailValid) {
            showError2(lgEmail, '*Email is not valid');
        }
        if (!isPasswordValid) {
            showError2(lgPassword, '*Password must be 8-20 characters');
        }
    }
})

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Parandalon submit-in default të formës

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Reset errors
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    let isValid = true;

    // Validimi i Username
    if (username.value.trim() === '') {
        usernameError.textContent = 'Username është i detyrueshëm!';
        isValid = false;
    } else if (username.value.length < 4) {
        usernameError.textContent = 'Username duhet të jetë së paku 4 karaktere!';
        isValid = false;
    }

    // Validimi i Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        emailError.textContent = 'Email është i detyrueshëm!';
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Email jo valid!';
        isValid = false;
    }

    // Validimi i Password
    if (password.value.trim() === '') {
        passwordError.textContent = 'Password është i detyrueshëm!';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password duhet të jetë së paku 6 karaktere!';
        isValid = false;
    }

    // Nëse të gjitha janë valide, ridrejto në login.html
    if (isValid) {
        // Mund të shtosh këtu ruajtjen në localStorage ose në server
        localStorage.setItem('registeredUser', JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value // Në praktikë, passwordi duhet të hash-ohet!
        }));

        alert('Regjistrimi u krye me sukses! Ju do të ridrejtoheni në Login.');
        window.location.href = 'login.html'; // Ndrysho nëse login faqja jote ka emër tjetër
    }
});
        

// Ruaj të dhënat në localStorage
const userData = {
    username: username.value,
    email: email.value,
    password: password.value // Në prodhim, duhet të përdorësh hashing (bcrypt)
};
localStorage.setItem('registeredUser', JSON.stringify(userData));

// Lexo të dhënat nga localStorage (në login.html)
const savedUser = JSON.parse(localStorage.getItem('registeredUser'));
if (savedUser) {
    console.log('Përdoruesi i regjistruar:', savedUser.email);
}