export const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1));
    start.setHours(0, 0, 0, 0);
    return start;
  };
  
  export const formatDate = (date) => {
    if (!(date instanceof Date)) {
      throw new Error('formatDate function expects a Date object');
    }
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };