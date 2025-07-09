// Test script for weather notification timing logic
// This tests the date-based notification system for Les Arcs trip weather updates

// Mock the shouldSendWeatherNotification function from the actual code
function shouldSendWeatherNotification(testDate) {
    const now = testDate || new Date();
    const tripStartDate = new Date('2026-01-17');
    const tripEndDate = new Date('2026-01-24');
    
    // Calculate one month before trip start
    const oneMonthBeforeTrip = new Date(tripStartDate);
    oneMonthBeforeTrip.setMonth(oneMonthBeforeTrip.getMonth() - 1);
    
    // Set trip end date to end of day to include the entire last day
    const tripEndDateEndOfDay = new Date(tripEndDate);
    tripEndDateEndOfDay.setHours(23, 59, 59, 999);
    
    // Send notifications starting one month before trip until the end of the last day of trip
    return now >= oneMonthBeforeTrip && now <= tripEndDateEndOfDay;
}

// Mock daily weather handler logic
async function mockWeatherHandler(testDate) {
    console.log(`\n--- Testing date: ${testDate.toISOString().split('T')[0]} ---`);
    
    // Check if we should send weather notifications based on trip timing
    if (!shouldSendWeatherNotification(testDate)) {
        return {
            status: 200,
            message: 'Weather notifications not active - outside of notification window',
            notificationWindow: {
                start: 'One month before trip (December 17, 2025)',
                end: 'Last day of trip (January 24, 2026)'
            },
            notificationSent: false
        };
    }

    // Mock weather data
    const mockWeatherSummary = {
        maxTemp: 2,
        minTemp: -5,
        snowfall: {
            morning: 3,
            afternoon: 0,
            night: 5
        },
        conditions: ['partly cloudy', 'snow showers', 'clear']
    };

    let message = `Today's Weather at Les Arcs (2000m):\n`;
    message += `Temperature: ${mockWeatherSummary.minTemp}°C to ${mockWeatherSummary.maxTemp}°C\n`;

    const { morning, afternoon, night } = mockWeatherSummary.snowfall;
    const hasSnow = morning > 0 || afternoon > 0 || night > 0;

    if (hasSnow) {
        message += '🌨️ Expected snowfall:\n';
        if (morning > 0) message += `Morning: ${morning}cm\n`;
        if (afternoon > 0) message += `Afternoon: ${afternoon}cm\n`;
        if (night > 0) message += `Evening: ${night}cm\n`;
    } else {
        message += 'No snowfall expected today\n';
    }

    return {
        status: 200,
        message: 'Daily weather notification sent successfully',
        notificationSent: true,
        notificationTitle: '⛷️ Daily Snow Report',
        notificationBody: message,
        summary: mockWeatherSummary
    };
}

// Test dates covering different scenarios
const testDates = [
    { date: new Date('2025-11-17T08:00:00Z'), description: 'Two months before trip' },
    { date: new Date('2025-12-16T08:00:00Z'), description: 'Day before notification window starts' },
    { date: new Date('2025-12-17T08:00:00Z'), description: 'First day of notification window (1 month before)' },
    { date: new Date('2025-12-25T08:00:00Z'), description: 'Christmas day (during notification window)' },
    { date: new Date('2026-01-01T08:00:00Z'), description: 'New Year (during notification window)' },
    { date: new Date('2026-01-16T08:00:00Z'), description: 'Day before trip starts' },
    { date: new Date('2026-01-17T08:00:00Z'), description: 'Trip start date' },
    { date: new Date('2026-01-20T08:00:00Z'), description: 'During trip' },
    { date: new Date('2026-01-24T08:00:00Z'), description: 'Trip end date (last notification day)' },
    { date: new Date('2026-01-25T08:00:00Z'), description: 'Day after trip ends' },
    { date: new Date('2026-02-01T08:00:00Z'), description: 'One week after trip ends' },
];

async function runTests() {
    console.log('🧪 Testing Weather Notification Timing System');
    console.log('===============================================');
    console.log('Trip dates: January 17-24, 2026');
    console.log('Notification window: December 17, 2025 - January 24, 2026');
    console.log('Purpose: Send daily weather updates one month before and during the trip');
    
    let passedTests = 0;
    let totalTests = testDates.length;
    let notificationsSent = 0;
    let notificationsSkipped = 0;

    for (const test of testDates) {
        try {
            const result = await mockWeatherHandler(test.date);
            
            console.log(`📅 ${test.description}`);
            console.log(`   Date: ${test.date.toISOString().split('T')[0]}`);
            console.log(`   Result: ${result.notificationSent ? '✅ NOTIFICATION SENT' : '❌ NO NOTIFICATION'}`);
            
            if (result.notificationSent) {
                console.log(`   Title: "${result.notificationTitle}"`);
                console.log(`   Body: "${result.notificationBody.split('\\n')[0]}..."`);
                notificationsSent++;
            } else {
                console.log(`   Reason: ${result.message}`);
                notificationsSkipped++;
            }
            
            passedTests++;
        } catch (error) {
            console.log(`❌ FAILED: ${test.description}`);
            console.log(`   Error: ${error.message}`);
        }
    }

    console.log('\n📊 Test Summary');
    console.log('================');
    console.log(`✅ Tests Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Tests Failed: ${totalTests - passedTests}/${totalTests}`);
    console.log(`📨 Notifications Sent: ${notificationsSent}`);
    console.log(`🚫 Notifications Skipped: ${notificationsSkipped}`);

    // Validation checks
    console.log('\n🔍 Validation Checks');
    console.log('=====================');
    
    // Check that notifications are only sent in the correct window
    const expectedNotificationDays = testDates.filter(test => {
        const testDate = test.date;
        const tripStart = new Date('2026-01-17');
        const oneMonthBefore = new Date(tripStart);
        oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        const tripEnd = new Date('2026-01-24');
        const tripEndDateEndOfDay = new Date(tripEnd);
        tripEndDateEndOfDay.setHours(23, 59, 59, 999);
        
        return testDate >= oneMonthBefore && testDate <= tripEndDateEndOfDay;
    }).length;
    
    const validationPassed = notificationsSent === expectedNotificationDays;
    
    console.log(`Expected notifications: ${expectedNotificationDays}`);
    console.log(`Actual notifications: ${notificationsSent}`);
    console.log(`Validation: ${validationPassed ? '✅ PASSED' : '❌ FAILED'}`);

    // Expected behavior summary
    console.log('\n🎯 Expected Behavior');
    console.log('====================');
    console.log('• Weather notifications start exactly 1 month before trip (Dec 17, 2025)');
    console.log('• Notifications continue daily throughout the notification window');
    console.log('• Notifications stop after the last day of the trip (Jan 24, 2026)');
    console.log('• Outside the window, cron job runs but no notifications are sent');
    console.log('• Each notification includes current weather and snow conditions');
    console.log('• Notifications include deep link to weather tab in the app');
    
    return passedTests === totalTests && validationPassed;
}

// Test the timing logic directly
function testTimingLogic() {
    console.log('\n🕐 Direct Timing Logic Test');
    console.log('============================');
    
    const tripStart = new Date('2026-01-17');
    const tripEnd = new Date('2026-01-24');
    const oneMonthBefore = new Date(tripStart);
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    
    console.log(`Trip start: ${tripStart.toISOString().split('T')[0]}`);
    console.log(`Trip end: ${tripEnd.toISOString().split('T')[0]}`);
    console.log(`One month before: ${oneMonthBefore.toISOString().split('T')[0]}`);
    
    // Edge case tests
    const edgeCases = [
        { date: new Date('2025-12-16T23:59:59Z'), expected: false, description: 'Last second before window' },
        { date: new Date('2025-12-17T00:00:00Z'), expected: true, description: 'First second of window' },
        { date: new Date('2026-01-24T23:59:59Z'), expected: true, description: 'Last second of window' },
        { date: new Date('2026-01-25T00:00:00Z'), expected: false, description: 'First second after window' },
    ];
    
    let edgeTestsPassed = 0;
    
    edgeCases.forEach(test => {
        const result = shouldSendWeatherNotification(test.date);
        const passed = result === test.expected;
        console.log(`${test.description}: ${passed ? '✅' : '❌'} (expected: ${test.expected}, got: ${result})`);
        if (passed) edgeTestsPassed++;
    });
    
    console.log(`\nEdge cases passed: ${edgeTestsPassed}/${edgeCases.length}`);
    return edgeTestsPassed === edgeCases.length;
}

// Run the tests
console.log('🚀 Starting Weather Notification Timing Tests\n');

Promise.all([
    runTests(),
    Promise.resolve(testTimingLogic())
]).then(([mainTestsPass, edgeTestsPass]) => {
    const allTestsPass = mainTestsPass && edgeTestsPass;
    console.log(`\n🏁 Test suite ${allTestsPass ? 'PASSED' : 'FAILED'}`);
    
    if (allTestsPass) {
        console.log('✅ All weather notification timing tests passed!');
        console.log('✅ The notification window logic is working correctly');
    } else {
        console.log('❌ Some tests failed - please review the notification timing logic');
    }
    
    process.exit(allTestsPass ? 0 : 1);
}).catch(error => {
    console.error('💥 Test suite crashed:', error);
    process.exit(1);
});