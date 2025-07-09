// Central configuration for all trip dates
// This file contains all date constants used throughout the application

export const TRIP_CONFIG = {
  // Core trip dates
  START_DATE: '2026-01-17',
  END_DATE: '2026-01-24',
  
  // Flight details
  OUTBOUND_FLIGHT: {
    DATE: '2026-01-17',
    TIME: '05:50',
    TIMEZONE: '+02:00', // Tel Aviv time (UTC+2)
  },
  
  RETURN_FLIGHT: {
    DATE: '2026-01-24',
    TIME: '10:30',
    TIMEZONE: '+01:00', // Grenoble time (UTC+1)
  },
  
  // Notification periods
  WEATHER_NOTIFICATIONS: {
    // Start 1 month before trip
    START_OFFSET_MONTHS: -1,
    // End on the last day of the trip
    END_DATE: '2026-01-24',
  },
  
  RESTAURANT_NOTIFICATIONS: {
    // Start 1 week before trip
    START_DATE: '2026-01-10',
    // End on the last day of the trip
    END_DATE: '2026-01-24',
  },
  
  // Accommodation details
  ACCOMMODATION: {
    CHECK_IN: 'January 17, 2026',
    CHECK_OUT: 'January 24, 2026',
    DURATION: '7 nights',
  },
  
  // Google Calendar date formats
  GOOGLE_CALENDAR: {
    START_DATE: '20260117',
    END_DATE: '20260125', // End date is exclusive in Google Calendar
  },
};

// Helper functions to get Date objects
export const getTripDates = () => ({
  startDate: new Date(TRIP_CONFIG.START_DATE),
  endDate: new Date(TRIP_CONFIG.END_DATE),
});

export const getFlightDates = () => ({
  outboundDate: new Date(`${TRIP_CONFIG.OUTBOUND_FLIGHT.DATE}T${TRIP_CONFIG.OUTBOUND_FLIGHT.TIME}:00${TRIP_CONFIG.OUTBOUND_FLIGHT.TIMEZONE}`),
  returnDate: new Date(`${TRIP_CONFIG.RETURN_FLIGHT.DATE}T${TRIP_CONFIG.RETURN_FLIGHT.TIME}:00${TRIP_CONFIG.RETURN_FLIGHT.TIMEZONE}`),
});

export const getWeatherNotificationDates = () => {
  const tripStart = new Date(TRIP_CONFIG.START_DATE);
  const oneMonthBefore = new Date(tripStart);
  oneMonthBefore.setMonth(oneMonthBefore.getMonth() + TRIP_CONFIG.WEATHER_NOTIFICATIONS.START_OFFSET_MONTHS);
  
  const tripEnd = new Date(TRIP_CONFIG.WEATHER_NOTIFICATIONS.END_DATE);
  const tripEndDateEndOfDay = new Date(tripEnd);
  tripEndDateEndOfDay.setHours(23, 59, 59, 999);
  
  return {
    startDate: oneMonthBefore,
    endDate: tripEndDateEndOfDay,
  };
};

export const getRestaurantNotificationDates = () => ({
  startDate: new Date(TRIP_CONFIG.RESTAURANT_NOTIFICATIONS.START_DATE),
  endDate: new Date(`${TRIP_CONFIG.RESTAURANT_NOTIFICATIONS.END_DATE}T23:59:59Z`),
});