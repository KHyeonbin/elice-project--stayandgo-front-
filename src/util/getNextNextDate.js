export const getNextNextDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    console.log(date);
    return date;
}