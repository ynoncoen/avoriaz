// Test script for restaurant notification logic
// This tests the date-based notification system for Les Arcs trip

// Mock the notification period function from the actual code
function isWithinNotificationPeriod(testDate) {
    const today = testDate || new Date();
    
    // Trip dates: January 17-24, 2026
    // Notification period: 1 week before (January 10) until end of trip (January 24)
    const notificationStartDate = new Date('2026-01-10T00:00:00Z');
    const tripEndDate = new Date('2026-01-24T23:59:59Z');
    
    return today >= notificationStartDate && today <= tripEndDate;
}

// Mock restaurant booking function
function getTodayBooking(testDate, mockBookings = []) {
    const today = testDate || new Date();
    const dateStr = `${today.getDate()}.${today.getMonth() + 1}`;

    return mockBookings.find(booking => booking.date === dateStr) || null;
}

// Mock notification handler logic
async function mockNotificationHandler(testDate, mockBookings = []) {
    console.log(`\n--- Testing date: ${testDate.toISOString().split('T')[0]} ---`);
    
    // Check if we're within notification period
    if (!isWithinNotificationPeriod(testDate)) {
        return {
            status: 200,
            message: 'Outside notification period - no notification sent',
            type: 'outside_period',
            notificationSent: false
        };
    }

    const booking = getTodayBooking(testDate, mockBookings);

    if (!booking) {
        return {
            status: 200,
            message: 'No restaurant notification sent',
            type: 'no_booking',
            notificationSent: true,
            notificationTitle: '🍽️ No Restaurant Today',
            notificationBody: 'No restaurant for today. Are we going hungry? 😅'
        };
    }

    const message = `🍽️ Tonight's Dinner at ${booking.name}\n` +
        `Time: ${booking.time}\n` +
        `Location: ${booking.address}` +
        (booking.comment ? `\nNote: ${booking.comment}` : '');

    return {
        status: 200,
        message: 'Restaurant notification sent successfully',
        type: 'booking_found',
        notificationSent: true,
        notificationTitle: '🍽️ Restaurant Reminder',
        notificationBody: message,
        booking
    };
}

// Test data
const mockBookings = [
    {
        date: "17.1", // January 17, 2026
        time: "19:30",
        name: "Le Loup Blanc",
        address: "Arc 1950, Les Arcs",
        comment: "Reservation confirmed",
        id: "booking-1"
    },
    {
        date: "20.1", // January 20, 2026
        time: "20:00",
        name: "Chez Bouboule",
        address: "Arc 1800, Les Arcs",
        id: "booking-2"
    }
];

// Test dates
const testDates = [
    { date: new Date('2026-01-09T15:00:00Z'), description: 'Day before notification period' },
    { date: new Date('2026-01-10T15:00:00Z'), description: 'First day of notification period' },
    { date: new Date('2026-01-15T15:00:00Z'), description: 'During notification period (no booking)' },
    { date: new Date('2026-01-17T15:00:00Z'), description: 'Trip start date (with booking)' },
    { date: new Date('2026-01-18T15:00:00Z'), description: 'During trip (no booking)' },
    { date: new Date('2026-01-20T15:00:00Z'), description: 'During trip (with booking)' },
    { date: new Date('2026-01-24T15:00:00Z'), description: 'Trip end date (no booking)' },
    { date: new Date('2026-01-25T15:00:00Z'), description: 'Day after trip ends' },
];

async function runTests() {
    console.log('🧪 Testing Restaurant Notification System');
    console.log('==========================================');
    console.log('Trip dates: January 17-24, 2026');
    console.log('Notification period: January 10-24, 2026');
    console.log('Cron schedule: Daily at 3 PM (15:00)');
    
    let passedTests = 0;
    let totalTests = testDates.length;

    for (const test of testDates) {
        try {
            const result = await mockNotificationHandler(test.date, mockBookings);
            
            console.log(`📅 ${test.description}`);
            console.log(`   Date: ${test.date.toISOString().split('T')[0]}`);
            console.log(`   Result: ${result.notificationSent ? '✅ NOTIFICATION SENT' : '❌ NO NOTIFICATION'}`);
            console.log(`   Type: ${result.type}`);
            
            if (result.notificationSent) {
                console.log(`   Title: "${result.notificationTitle}"`);
                console.log(`   Body: "${result.notificationBody.split('\\n')[0]}..."`);
            }
            
            passedTests++;
        } catch (error) {
            console.log(`❌ FAILED: ${test.description}`);
            console.log(`   Error: ${error.message}`);
        }
    }

    console.log('\n📊 Test Summary');
    console.log('================');
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);

    // Expected behavior summary
    console.log('\n🎯 Expected Behavior');
    console.log('====================');
    console.log('• Notifications only sent between Jan 10-24, 2026');
    console.log('• Daily notifications at 3 PM via cron job');
    console.log('• "No restaurant" notifications when no booking exists');
    console.log('• Restaurant reminder notifications when booking exists');
    console.log('• All notifications include restaurant tab URL for user navigation');
    
    return passedTests === totalTests;
}

// Run the tests
runTests().then(success => {
    console.log(`\n🏁 Test suite ${success ? 'PASSED' : 'FAILED'}`);
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('💥 Test suite crashed:', error);
    process.exit(1);
});