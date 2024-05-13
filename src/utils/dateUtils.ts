export const getFormattedDateTime = (date: string | Date) => {
  // Convert input to Date object if it's not already
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }

  // Get day, month, and year
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();

  // Get time
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be displayed as 12

  // Add "th", "st", "nd", or "rd" suffix to day
  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }

  // Return formatted date and time
  return `${month} ${day}${daySuffix}, ${year} ${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
