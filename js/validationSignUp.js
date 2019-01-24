function validation() {
    const username = document.signup.UserName.value;
    const firstName = document.signup.firstName.value;
    const lastName = document.signup.lastName.value;
    const email = document.signup.email.value;
    const password = document.signup.password.value;
    const confirmPassword = document.signup.confirmPassword.value;
    const date = document.signup.birthday.value;
    const height = document.signup.height.value;
    const weight = document.signup.weight.value;
    let flag = true;
    if (username === '') { //empty username
        document.getElementById('usernameValid').innerHTML = 'user name is empty, please put a username ';
        flag = false;
    }
    if (isUserExistOnSubmit(username)) //duplicate username
        flag = false;
    if (document.signup.checkbox.checked === false) { // must agree to EULA
        alert('you must agree to our terms');
        flag = false;
    }
    if (firstName === '') { //empty first name
        document.getElementById('firstnameValid').innerHTML = 'first name is empty, please put a first name ';
        flag = false;
    }
    if (lastName === '') { //empty last name
        document.getElementById('lastnameValid').innerHTML = 'last name is empty, please put a last name ';
        flag = false;
    }
    if (email === '') { //empty email
        document.getElementById('emailValid').innerHTML = 'email is empty, please put an email ';
        flag = false;
    }
    if (password === '') { //empty password
        document.getElementById('passwordValid').innerHTML = 'password is empty, please put a password ';
        flag = false;
    } else {
        if (password.length <= 5) { // password length must be at least 6 chars
            document.getElementById('passwordValid').innerHTML = 'password is short, please choose a longer password ';
            flag = false;
        }
    }
    if (confirmPassword === '') { //empty re password
        document.getElementById('confirmpasswordValid').innerHTML = 'confirm password is empty, please put a confirm password ';
        flag = false;

    } else {
        if (confirmPassword.localeCompare(password)) { //difference between password and re- password
            document.getElementById('confirmpasswordValid').innerHTML = 'confirm password is not the same, please put a correct confirm password ';
            flag = false;
        }
    }
    if (date === '') { //date is empty
        document.getElementById('birthdayValid').innerHTML = 'birthday is empty, please put a birthday';
        flag = false;
    }
    if (height === '') { //empty height
        document.getElementById('heightValid').innerHTML = 'height is empty, please put a height';
        flag = false;
    }
    if (weight === '') { //empty weight
        document.getElementById('weightValid').innerHTML = 'weight is empty, please put a height';
        flag = false;
    }
    return flag; //return false if the form not valid, and there not request to the server
}
//init xhr
let request;
if (navigator.appName === 'Microsoft Internet Explorer') {
    request = new ActiveXObject('Microsoft.XMLHTTP');
} else {
    request = new XMLHttpRequest();
}
//in every key up we call this function and check if the username is exist in the DB
function isUserExist(username) {
    request.abort();
    request.open('GET', 'http://localhost:8080/controller/UserController/isExistUserName?userName=' + username, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let str = '';
            if (request.responseText === 'true') //the username already exist
                str = 'the username already exist';
            document.getElementById('usernameValid').innerHTML = str;
        }
    };
    request.send(null);
}

//another checking if the username already exist, now when the user submit the form
function isUserExistOnSubmit(username) {
    request.abort();
    request.open('GET', 'http://localhost:8080/controller/UserController/isExistUserName?userName=' + username, true);
    let flag = false;
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            if (request.responseText === 'true') //the username already exist
                flag = true;
        }
    };
    request.send(null);
    return flag;
}