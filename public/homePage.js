const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        let callback = response;
        if (callback.success) {
            location.reload();
        } else {
            alert(callback.error);
        }
    });
}
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
setInterval(refreshRates(), 6000);

function refreshRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(response.success, 'Успешно!')
        } else {
            favoritesWidget.setMessage(response.success, 'Что-то пошло не так!')
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(response.success, 'Успешно!')
        } else {
            favoritesWidget.setMessage(response.success, 'Что-то пошло не так!')
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(response.success, 'Успешно!')
        } else {
            favoritesWidget.setMessage(response.success, 'Что-то пошло не так!')
        }
    });
}

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable;
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.setMessage(response.success, 'Успешно!')
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, 'Что-то пошло не так!')
        }
    });
}
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.setMessage(response.success, 'Успешно!')
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, 'Что-то пошло не так!')
        }
    });
}