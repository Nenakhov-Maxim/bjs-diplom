const logoutButton = new LogoutButton();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();
const ratesBoard = new RatesBoard();


logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

setInterval(refreshRates(), 6000);

function refreshRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(response.success, 'Зачисление средств прошло успешно')
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(response.success, 'Конвертация средств прошла успешно')
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(response.success, 'Средства успешно отправлены')
        } else {
            favoritesWidget.setMessage(response.success, response.error)
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
            favoritesWidget.setMessage(response.success, 'Пользователь успешно добавлен в список избранного')
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    });
}
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удален из списка избранного')
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error)
        }
    });
}