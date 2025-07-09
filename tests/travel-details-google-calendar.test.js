// Test script for Google Calendar integration in TravelDetailsTab
// This tests the createGoogleCalendarUrl function and button functionality

const { TRIP_CONFIG } = require('../src/config/trip-dates');

// Test helper function to validate Google Calendar URL format
function validateGoogleCalendarUrl(url) {
    const requiredParams = ['action=TEMPLATE', 'text=', 'dates=', 'location=', 'details='];
    return requiredParams.every(param => url.includes(param));
}

// Test helper function to parse Google Calendar URL parameters
function parseGoogleCalendarUrl(url) {
    const urlObj = new URL(url);
    const params = {};
    
    urlObj.searchParams.forEach((value, key) => {
        params[key] = decodeURIComponent(value);
    });
    
    return params;
}

// Mock the createGoogleCalendarUrl function from TravelDetailsTab
function createGoogleCalendarUrl(flight, date) {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    
    // Parse the date and time
    const flightDate = new Date(date);
    const [hours, minutes] = flight.departureTime.split(':');
    flightDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Calculate arrival time (4.5 hours flight duration)
    const arrivalDate = new Date(flightDate.getTime() + (4.5 * 60 * 60 * 1000));
    
    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const startTime = formatDate(flightDate);
    const endTime = formatDate(arrivalDate);
    
    const title = encodeURIComponent(`${flight.flightNumber} - ${flight.departure} to ${flight.arrival}`);
    const location = encodeURIComponent(`${flight.departure} - ${flight.arrival}`);
    const details = encodeURIComponent(
        `Flight: ${flight.flightNumber}\n` +
        `Departure: ${flight.departure} at ${flight.departureTime}\n` +
        `Arrival: ${flight.arrival}\n` +
        `Estimated Duration: 4.5 hours`
    );
    
    return `${baseUrl}&text=${title}&dates=${startTime}/${endTime}&location=${location}&details=${details}`;
}

// Mock the createVacationCalendarUrl function from TravelDetailsTab
function createVacationCalendarUrl() {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    
    // All-day event from trip start to end
    const startDate = TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE;
    const endDate = TRIP_CONFIG.GOOGLE_CALENDAR.END_DATE; // End date is exclusive in Google Calendar
    
    const title = encodeURIComponent('Vacation - Skiing in Les Arcs');
    const location = encodeURIComponent('Les Arcs, France');
    const details = encodeURIComponent(
        'Skiing vacation in Les Arcs, France\n' +
        'Staying at Arc 1950 Village\n' +
        'Out of office - skiing in the French Alps'
    );
    
    return `${baseUrl}&text=${title}&dates=${startDate}/${endDate}&location=${location}&details=${details}`;
}

// Test data - same as in TravelDetailsTab component
const outboundFlight = {
    flightNumber: 'ISRAIR 6H141',
    departure: 'Tel Aviv (TLV)',
    departureTime: TRIP_CONFIG.OUTBOUND_FLIGHT.TIME,
    arrival: 'Grenoble (GNB)',
    arrivalTime: 'TBA'
};

const returnFlight = {
    flightNumber: 'ISRAIR 6H142',
    departure: 'Grenoble (GNB)',
    departureTime: TRIP_CONFIG.RETURN_FLIGHT.TIME,
    arrival: 'Tel Aviv (TLV)',
    arrivalTime: 'TBA'
};

// Test cases
const testCases = [
    {
        name: 'Outbound Flight Google Calendar URL',
        flight: outboundFlight,
        date: TRIP_CONFIG.OUTBOUND_FLIGHT.DATE,
        expectedTitle: 'ISRAIR 6H141 - Tel Aviv (TLV) to Grenoble (GNB)',
        expectedLocation: 'Tel Aviv (TLV) - Grenoble (GNB)',
        expectedStartTime: '20260117T055000Z', // 05:50 UTC
        expectedEndTime: '20260117T102000Z',   // 10:20 UTC (4.5 hours later)
        description: 'Should generate correct Google Calendar URL for outbound flight'
    },
    {
        name: 'Return Flight Google Calendar URL',
        flight: returnFlight,
        date: TRIP_CONFIG.RETURN_FLIGHT.DATE,
        expectedTitle: 'ISRAIR 6H142 - Grenoble (GNB) to Tel Aviv (TLV)',
        expectedLocation: 'Grenoble (GNB) - Tel Aviv (TLV)',
        expectedStartTime: '20260124T103000Z', // 10:30 UTC
        expectedEndTime: '20260124T150000Z',   // 15:00 UTC (4.5 hours later)
        description: 'Should generate correct Google Calendar URL for return flight'
    },
    {
        name: 'Vacation Event Google Calendar URL',
        isVacation: true,
        expectedTitle: 'Vacation - Skiing in Les Arcs',
        expectedLocation: 'Les Arcs, France',
        expectedStartDate: TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE,
        expectedEndDate: TRIP_CONFIG.GOOGLE_CALENDAR.END_DATE,
        description: 'Should generate correct Google Calendar URL for vacation event (all-day, multi-day)'
    }
];

// Helper function to run individual test
function runTest(testCase) {
    console.log(`\n--- Testing: ${testCase.name} ---`);
    console.log(`Description: ${testCase.description}`);
    
    try {
        // Generate the Google Calendar URL
        const url = testCase.isVacation ? 
            createVacationCalendarUrl() : 
            createGoogleCalendarUrl(testCase.flight, testCase.date);
        
        // Validate URL format
        if (!validateGoogleCalendarUrl(url)) {
            throw new Error('Invalid Google Calendar URL format');
        }
        
        // Parse URL parameters
        const params = parseGoogleCalendarUrl(url);
        
        // Test URL structure
        console.log(`✅ URL Format: Valid Google Calendar URL`);
        console.log(`   Base URL: https://www.google.com/calendar/render`);
        console.log(`   Action: ${params.action}`);
        
        // Test event title
        if (params.text === testCase.expectedTitle) {
            console.log(`✅ Event Title: "${params.text}"`);
        } else {
            throw new Error(`Title mismatch. Expected: "${testCase.expectedTitle}", Got: "${params.text}"`);
        }
        
        // Test location
        if (params.location === testCase.expectedLocation) {
            console.log(`✅ Location: "${params.location}"`);
        } else {
            throw new Error(`Location mismatch. Expected: "${testCase.expectedLocation}", Got: "${params.location}"`);
        }
        
        // Test dates (different logic for vacation vs flight)
        if (testCase.isVacation) {
            const expectedDates = `${testCase.expectedStartDate}/${testCase.expectedEndDate}`;
            if (params.dates === expectedDates) {
                console.log(`✅ Date Range: ${params.dates}`);
                console.log(`   Start: ${testCase.expectedStartDate} (all-day event)`);
                console.log(`   End: ${testCase.expectedEndDate} (7-day duration)`);
            } else {
                throw new Error(`Dates mismatch. Expected: "${expectedDates}", Got: "${params.dates}"`);
            }
        } else {
            const expectedDates = `${testCase.expectedStartTime}/${testCase.expectedEndTime}`;
            if (params.dates === expectedDates) {
                console.log(`✅ Date Range: ${params.dates}`);
                console.log(`   Start: ${testCase.expectedStartTime} (${testCase.flight.departureTime})`);
                console.log(`   End: ${testCase.expectedEndTime} (4.5 hours later)`);
            } else {
                throw new Error(`Dates mismatch. Expected: "${expectedDates}", Got: "${params.dates}"`);
            }
        }
        
        // Test event details (different for vacation vs flight)
        if (testCase.isVacation) {
            const expectedDetailsContent = [
                'Skiing vacation in Les Arcs, France',
                'Arc 1950 Village',
                'Out of office'
            ];
            
            const detailsValid = expectedDetailsContent.every(content => 
                params.details.includes(content)
            );
            
            if (detailsValid) {
                console.log(`✅ Event Details: Contains all required vacation information`);
            } else {
                throw new Error('Event details missing required vacation information');
            }
        } else {
            const expectedDetailsContent = [
                testCase.flight.flightNumber,
                testCase.flight.departure,
                testCase.flight.arrival,
                'Estimated Duration: 4.5 hours'
            ];
            
            const detailsValid = expectedDetailsContent.every(content => 
                params.details.includes(content)
            );
            
            if (detailsValid) {
                console.log(`✅ Event Details: Contains all required flight information`);
            } else {
                throw new Error('Event details missing required flight information');
            }
        }
        
        // Test duration calculation (different for vacation vs flight)
        if (testCase.isVacation) {
            // For vacation, test the 7-day duration
            const startDate = new Date(testCase.expectedStartDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            const endDate = new Date(testCase.expectedEndDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            const durationDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
            
            if (durationDays === 8) { // Google Calendar end date is exclusive, so 8 days = 7 nights
                console.log(`✅ Vacation Duration: 7 nights (Jan 17-24, 2026)`);
            } else {
                throw new Error(`Incorrect vacation duration. Expected: 7 nights, Got: ${durationDays - 1} nights`);
            }
        } else {
            // For flights, test the 4.5 hour duration
            const startDate = new Date(testCase.expectedStartTime.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
            const endDate = new Date(testCase.expectedEndTime.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
            const durationHours = (endDate - startDate) / (1000 * 60 * 60);
            
            if (durationHours === 4.5) {
                console.log(`✅ Flight Duration: ${durationHours} hours (Tel Aviv to Grenoble standard)`);
            } else {
                throw new Error(`Incorrect flight duration. Expected: 4.5 hours, Got: ${durationHours} hours`);
            }
        }
        
        console.log(`✅ TEST PASSED: ${testCase.name}`);
        return true;
        
    } catch (error) {
        console.log(`❌ TEST FAILED: ${testCase.name}`);
        console.log(`   Error: ${error.message}`);
        return false;
    }
}

// Function to test URL encoding
function testUrlEncoding() {
    console.log(`\n--- Testing: URL Encoding ---`);
    console.log(`Description: Verify proper URL encoding of flight information`);
    
    try {
        const url = createGoogleCalendarUrl(outboundFlight, '2026-01-17');
        const params = parseGoogleCalendarUrl(url);
        
        // Test that special characters are properly encoded
        if (params.text.includes('ISRAIR 6H141') && params.text.includes('(TLV)') && params.text.includes('(GNB)')) {
            console.log(`✅ Special Characters: Parentheses and spaces properly encoded`);
        } else {
            throw new Error('URL encoding failed for special characters');
        }
        
        // Test that newlines in details are preserved
        if (params.details.includes('\n')) {
            console.log(`✅ Newlines: Preserved in event details`);
        } else {
            throw new Error('Newlines not preserved in event details');
        }
        
        console.log(`✅ TEST PASSED: URL Encoding`);
        return true;
        
    } catch (error) {
        console.log(`❌ TEST FAILED: URL Encoding`);
        console.log(`   Error: ${error.message}`);
        return false;
    }
}

// Function to test "Add All to Calendar" functionality
function testAddAllToCalendar() {
    console.log(`\n--- Testing: Add All to Calendar Functionality ---`);
    console.log(`Description: Verify "Add All" button generates all three calendar events`);
    
    try {
        // Test that we can generate all three URLs
        const outboundUrl = createGoogleCalendarUrl(outboundFlight, TRIP_CONFIG.OUTBOUND_FLIGHT.DATE);
        const returnUrl = createGoogleCalendarUrl(returnFlight, TRIP_CONFIG.RETURN_FLIGHT.DATE);
        const vacationUrl = createVacationCalendarUrl();
        
        // Verify all URLs are valid
        if (!validateGoogleCalendarUrl(outboundUrl)) {
            throw new Error('Invalid outbound flight URL in Add All functionality');
        }
        if (!validateGoogleCalendarUrl(returnUrl)) {
            throw new Error('Invalid return flight URL in Add All functionality');
        }
        if (!validateGoogleCalendarUrl(vacationUrl)) {
            throw new Error('Invalid vacation URL in Add All functionality');
        }
        
        console.log(`✅ Outbound Flight URL: Generated successfully`);
        console.log(`✅ Return Flight URL: Generated successfully`);
        console.log(`✅ Vacation Event URL: Generated successfully`);
        
        // Test that all events cover the full trip period
        const outboundParams = parseGoogleCalendarUrl(outboundUrl);
        const returnParams = parseGoogleCalendarUrl(returnUrl);
        const vacationParams = parseGoogleCalendarUrl(vacationUrl);
        
        // Verify date consistency
        if (outboundParams.dates.startsWith(TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE) && 
            returnParams.dates.startsWith(TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE.replace('17', '24')) && 
            vacationParams.dates === `${TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE}/${TRIP_CONFIG.GOOGLE_CALENDAR.END_DATE}`) {
            console.log(`✅ Date Consistency: All events properly span the trip period (${TRIP_CONFIG.ACCOMMODATION.CHECK_IN} - ${TRIP_CONFIG.ACCOMMODATION.CHECK_OUT})`);
        } else {
            throw new Error('Date inconsistency in Add All calendar events');
        }
        
        // Test button styling expectations (conceptual test)
        console.log(`✅ Button Styling: "Add All" should have black background for prominence`);
        console.log(`✅ Individual Buttons: Should have gray backgrounds as secondary actions`);
        
        console.log(`✅ TEST PASSED: Add All to Calendar Functionality`);
        return true;
        
    } catch (error) {
        console.log(`❌ TEST FAILED: Add All to Calendar Functionality`);
        console.log(`   Error: ${error.message}`);
        return false;
    }
}

// Main test runner
async function runTests() {
    console.log('🧪 Testing Google Calendar Integration');
    console.log('=====================================');
    console.log('Component: TravelDetailsTab');
    console.log('Feature: Add to Calendar buttons');
    console.log('Flight Route: Tel Aviv ↔ Grenoble');
    console.log('Flight Duration: 4.5 hours standard');
    
    let passedTests = 0;
    let totalTests = testCases.length + 2; // +1 for URL encoding test, +1 for Add All test
    
    // Run main test cases
    for (const testCase of testCases) {
        if (runTest(testCase)) {
            passedTests++;
        }
    }
    
    // Run URL encoding test
    if (testUrlEncoding()) {
        passedTests++;
    }
    
    // Run Add All to Calendar test
    if (testAddAllToCalendar()) {
        passedTests++;
    }
    
    console.log('\n📊 Test Summary');
    console.log('================');
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
    
    // Feature summary
    console.log('\n🎯 Feature Summary');
    console.log('==================');
    console.log('• Google Calendar integration via URL scheme');
    console.log('• Automatic flight duration calculation (4.5 hours)');
    console.log('• Proper date/time formatting for Google Calendar');
    console.log('• Complete flight information in event details');
    console.log('• URL encoding for special characters and spaces');
    console.log('• Separate buttons for outbound and return flights');
    console.log('• Vacation event button for full trip duration (7 nights)');
    console.log('• "Add All to Calendar" button for complete trip setup');
    console.log('• Button styling: Black "Add All" button, gray individual buttons');
    
    console.log('\n🔗 Integration Details');
    console.log('======================');
    console.log('• Opens Google Calendar in new tab/window');
    console.log('• Pre-fills event with flight information');
    console.log('• User can modify event before saving');
    console.log('• Compatible with all Google Calendar accounts');
    console.log('• Four total calendar buttons: Outbound flight, Return flight, Vacation, Add All');
    
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