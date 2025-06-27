# Tests

This directory contains test files for the Les Arcs ski trip application.

## Restaurant Notification Tests

### `restaurant-notification.test.js`

Tests the backend notification system that sends daily restaurant reminders.

**Key Features Tested:**
- Date range validation (notifications only sent Jan 10-24, 2026)
- Restaurant booking logic
- "No restaurant" fallback notifications
- Notification content formatting

**Run Tests:**
```bash
# Run directly with Node.js
node tests/restaurant-notification.test.js

# Or use npm script
npm run test:notifications
```

**Test Coverage:**
- ✅ Dates outside notification period (no notifications sent)
- ✅ Dates within notification period but no bookings (fallback notification)
- ✅ Dates with restaurant bookings (reminder notification)
- ✅ Trip start and end dates
- ✅ Notification content formatting

## Google Calendar Integration Tests

### `travel-details-google-calendar.test.js`

Tests the Google Calendar integration functionality in the TravelDetailsTab component.

**Key Features Tested:**
- Google Calendar URL generation
- Flight duration calculation (4.5 hours Tel Aviv to Grenoble)
- Date/time formatting for Google Calendar
- URL parameter encoding
- Event details formatting

**Run Tests:**
```bash
# Run directly with Node.js
node tests/travel-details-google-calendar.test.js

# Or use npm script
npm run test:calendar
```

**Test Coverage:**
- ✅ Outbound flight URL generation (Jan 17, 2026 at 05:50)
- ✅ Return flight URL generation (Jan 24, 2026 at 10:30)
- ✅ Proper URL encoding of special characters
- ✅ Flight duration calculation (4.5 hours standard)
- ✅ Google Calendar URL format validation
- ✅ Event details include all flight information

## Trip Configuration

**Trip Dates:** January 17-24, 2026  
**Notification Period:** January 10-24, 2026 (1 week before until trip end)  
**Cron Schedule:** Daily at 3 PM (15:00) UTC  
**Destination:** Les Arcs - Arc 1950, France

## Expected Behavior

The notification system should:
1. Only send notifications between January 10-24, 2026
2. Send "No restaurant today" messages when no booking exists for that date
3. Send restaurant reminder messages when a booking exists for that date
4. Include restaurant details (name, time, location, notes) in booking reminders
5. Direct users to the restaurants tab via notification URL