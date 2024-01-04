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