const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    // Must be 10 digits or +91 format internally handled contextually
    // Let's accept +91XXXXXXXXXX or similar
    // The requirement says: Must be 10 digits, Format: +91XXXXXXXXXX
    if (!phone) return false;
    const phoneStr = phone.toString();
    if (phoneStr.startsWith('+91') && phoneStr.length === 13) {
        const numbers = phoneStr.replace('+91', '');
        return /^\d{10}$/.test(numbers);
    } else if (/^\d{10}$/.test(phoneStr)) {
        return true;
    }
    return false;
};

const validatePassword = (password) => {
    if (!password || typeof password !== 'string') return false;
    return password.length >= 6;
};

const validateCoordinates = (lat, lng) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) return false;
    if (latitude < -90 || latitude > 90) return false;
    if (longitude < -180 || longitude > 180) return false;

    return true;
};

module.exports = {
    validateEmail,
    validatePhone,
    validatePassword,
    validateCoordinates
};
