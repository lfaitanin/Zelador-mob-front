export const Utils = () => {

    const formatEmailToStore = (email) => {
        return email.replace('@', '');
    }

    function saveToken(key, value) {
        SecureStore.setItem(key, value);
    }

    function getToken(key) {
        let result = SecureStore.getItem(key);
        if (result) {
            return result;
        } else {
            alert('No values stored under that key.');
        }
    }
};