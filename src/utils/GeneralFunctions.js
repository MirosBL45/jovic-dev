// TabTitle
export function TabTitle(newTitle) {
    return (document.title = newTitle);
}

// format date function
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(
        'en-US',
        options
    );
    return formattedDate;
}

// years of expirience
export const currentYear = new Date().getFullYear();
export const allYears = currentYear - 2021;

// A function to check the validity of an email address using regex
export function isValidEmail(email) {
    // Regex for checking email address validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Checking if all input fields are filled
export function areAllFieldsFilled(fields) {
    return fields.every((field) => field.value.trim() !== '');
}

export function isInputLengthValid(inputValue, minLength, maxLength) {
    // Removes spaces from the beginning and end of the input
    const trimmedValue = inputValue.trim();
    return trimmedValue.length >= minLength && trimmedValue.length <= maxLength;
};