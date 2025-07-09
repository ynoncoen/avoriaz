// Test script to verify the notification date logic
const { getRestaurantNotificationDates } = require('../src/config/trip-dates');

function isWithinNotificationPeriod(testDate) {
    const today = testDate || new Date();
    const { startDate, endDate } = getRestaurantNotificationDates();
    
    return today >= startDate && today <= endDate;
}

// Test dates
const testDates = [
    new Date('2026-01-09T12:00:00Z'), // Day before notification period starts
    new Date('2026-01-10T00:00:00Z'), // First day of notification period
    new Date('2026-01-15T12:00:00Z'), // During notification period (before trip)
    new Date('2026-01-17T12:00:00Z'), // Trip start date
    new Date('2026-01-20T12:00:00Z'), // During trip
    new Date('2026-01-24T23:59:59Z'), // Trip end date
    new Date('2026-01-25T00:00:00Z'), // Day after trip ends
];

console.log('Testing notification period logic:');
console.log('Notification period: January 10, 2026 - January 24, 2026');
console.log('Trip dates: January 17, 2026 - January 24, 2026\n');

testDates.forEach(date => {
    const shouldNotify = isWithinNotificationPeriod(date);
    console.log(`${date.toISOString().split('T')[0]}: ${shouldNotify ? '✅ SEND NOTIFICATION' : '❌ NO NOTIFICATION'}`);
});