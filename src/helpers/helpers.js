import * as SecureStore from 'expo-secure-store';

const helpers = {
    formatEmailToStore: function (email) {
        return email.replace('@', '');
    },
    saveToken: function (key, value) {
        SecureStore.setItem(key, value);
    },
    getToken: function (key) {
        let result = SecureStore.getItem(key);
        if (result) {
            return result;
        } else {
            alert('No values stored under that key.');
        }
    }
};

export default helpers;