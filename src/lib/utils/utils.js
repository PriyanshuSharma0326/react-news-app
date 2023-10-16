export const formatDate = (originalTimestamp) => {
    const date = new Date(originalTimestamp);
    const formattedTimestamp = date.toLocaleString('en-US', { timeZone: 'IST' });
    return formattedTimestamp;
}

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    const regex = /^.{6,}$/;
    return regex.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phoneNumber);
};

export const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
}
