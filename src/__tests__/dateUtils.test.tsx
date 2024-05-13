import { getFormattedDateTime } from '../utils/dateUtils';

describe('getFormattedDateTime', () => {
  test('returns correctly formatted date and time for valid input', () => {
    // Test with a Date object
    const dateObj = new Date('2024-05-13T12:30:00');
    expect(getFormattedDateTime(dateObj)).toBe('May 13th, 2024 12:30 PM');

    // Test with a string date
    expect(getFormattedDateTime('2024-05-13T08:15:00')).toBe('May 13th, 2024 8:15 AM');
  });

  test('throws error for invalid input', () => {
    // Test with invalid date string
    expect(() => {
      getFormattedDateTime('invalid date');
    }).toThrow('Invalid date');

    // Test with invalid date object
    expect(() => {
      getFormattedDateTime(new Date('invalid date'));
    }).toThrow('Invalid date');
  });
});
