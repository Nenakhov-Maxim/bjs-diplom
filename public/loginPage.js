"use strict";
let dataAutorization = autorizationCheck;
let dataRegister = registerCheck;
const userForm = new UserForm();
userForm.loginFormCallback = dataAutorization;
userForm.registerFormCallback = registerCheck;

function autorizationCheck(data) {
    ApiConnector.login(data, response => {
        let callback = response;
        if (callback.success) {
            location.reload();
        } else {
            alert(callback.error);
        }
    });
}

function registerCheck(data) {
    ApiConnector.register(data, response => {
        let callback = response;
        console.log(callback);
        if (callback.success) {
            location.reload();
        } else {
            alert(callback.error);
        }
    });
}