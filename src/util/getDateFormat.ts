export const getDateFormat = (newDate: Date) : string => {
    const startYear = newDate.getFullYear();
    const startMonth = String(newDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(newDate.getDate()).padStart(2, '0');
    return `${startYear}-${startMonth}-${startDay}`;
}