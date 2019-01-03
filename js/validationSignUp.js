function validation() {
    const username = document.signup.UserName.value;
    const firstname = document.signup.firstName.value;
    const lastname = document.signup.lastName.value;
    const email = document.signup.email.value;
    const password = document.signup.password.value;
    const confirmpassword = document.signup.confirmPassword.value;
    const date = document.signup.birthday.value;
    const height = document.signup.height.value;
    const weight = document.signup.weight.value;
    let flag = true;
    if (username === '') {
        document.getElementById('usernameValid').innerHTML = 'user name is empty, please put a username ';
        flag = false;
    }
    if (isUserExistOnSubmit(username))
        flag = false;
    if (document.signup.checkbox.checked === false) {
        alert('you must agree to our terms');
        flag = false;
    }
    if (firstname === '') {
        document.getElementById('firstnameValid').innerHTML = 'first name is empty, please put a first name ';
        flag = false;
    }
    if (lastname === '') {
        document.getElementById('lastnameValid').innerHTML = 'last name is empty, please put a last name ';
        flag = false;
    }
    if (email === '') {
        document.getElementById('emailValid').innerHTML = 'email is empty, please put an email ';
        flag = false;
    }
    if (password === '') {
        document.getElementById('passwordValid').innerHTML = 'password is empty, please put a password ';
        flag = false;
    } else {
        if (password.length <= 5) {
            document.getElementById('passwordValid').innerHTML = 'password is short, please choose a longer password ';
            flag = false;
        }
    }
    if (confirmpassword === '') {
        document.getElementById('confirmpasswordValid').innerHTML = 'confirm password is empty, please put a confirm password ';
        flag = false;

    } else {
        if (confirmpassword.localeCompare(password)) {
            document.getElementById('confirmpasswordValid').innerHTML = 'confirm password is not the same, please put a correct confirm password ';
            flag = false;
        }
    }
    if (date === '') {
        document.getElementById('birthdayValid').innerHTML = 'birthday is empty, please put a birthday';
        flag = false;
    }
    if (height === '') {
        document.getElementById('heightValid').innerHTML = 'height is empty, please put a height';
        flag = false;
    }
    if (weight === '') {
        document.getElementById('weightValid').innerHTML = 'weight is empty, please put a height';
        flag = false;
    }
    return flag;
}

let request;
if (navigator.appName === 'Microsoft Internet Explorer') {
    request = new ActiveXObject('Microsoft.XMLHTTP');
} else {
    request = new XMLHttpRequest();
}

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