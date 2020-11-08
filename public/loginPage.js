"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = autorizationCheck;
userForm.registerFormCallback = registerCheck;

function autorizationCheck(data) {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error)
        }
    });
}

function registerCheck(data) {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error)
        }
    });
}