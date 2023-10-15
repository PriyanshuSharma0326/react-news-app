export const formatDate = (originalTimestamp) => {
    const date = new Date(originalTimestamp);
    const formattedTimestamp = date.toLocaleString('en-US', { timeZone: 'IST' });
    return formattedTimestamp;
}
