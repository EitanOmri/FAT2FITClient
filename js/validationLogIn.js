function validation() {
    const username = document.login.UserName.value;
    const password = document.login.password.value;
    let flag = true; //valid is ok
    if (username === '') {
        document.getElementById('usernameValid').innerHTML = 'user name is empty, please put a username';
        flag = false;
    }
    let answer=testLogInSubmit(username, password);
    if (answer === false) {
        document.getElementById('errorValid').innerHTML = 'user name or password is incorrect';
        flag = false;
    } else {
        document.getElementById('errorValid').innerHTML = '';
    }
    if (password === '') {
        document.getElementById('passwordValid').innerHTML = 'password is empty, please put a password';
        flag = false;
    } else {
        if (password.length <= 5) {
            document.getElementById('passwordValid').innerHTML = 'password is short, please choose a longer password';
            flag = false;
        }
        else{
            document.getElementById('passwordValid').innerHTML = '';

        }
    }
    return flag;
}

let request;
if (navigator.appName === 'Microsoft Internet Explorer') {
    request = new ActiveXObject('Microsoft.XMLHTTP');
} else {
    request = new XMLHttpRequest();
}

function testLogInSubmit(username, password) {
    request.abort();
    request.open('GET', 'http://localhost:8080/controller/UserController/testLogIn?userName=' + username + '&password=' + password, false);
    let flag = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            if (request.responseText === 'false') //the test failed
                flag = false;
        }
    };
    request.send(null);
    return flag;
}


