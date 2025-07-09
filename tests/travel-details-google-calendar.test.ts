import { describe, it, expect } from 'vitest'
import { TRIP_CONFIG } from '../src/config/trip-dates'

// Test helper function to validate Google Calendar URL format
function validateGoogleCalendarUrl(url: string): boolean {
    const requiredParams = ['action=TEMPLATE', 'text=', 'dates=', 'location=', 'details='];
    return requiredParams.every(param => url.includes(param));
}

// Test helper function to parse Google Calendar URL parameters
function parseGoogleCalendarUrl(url: string) {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    
    urlObj.searchParams.forEach((value, key) => {
        params[key] = decodeURIComponent(value);
    });
    
    return params;
}

// Mock the createGoogleCalendarUrl function from TravelDetailsTab
function createGoogleCalendarUrl(flight: any, date: string): string {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    
    // Parse the date and time
    const flightDate = new Date(date);
    const [hours, minutes] = flight.departureTime.split(':');
    flightDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Calculate arrival time (4.5 hours flight duration)
    const arrivalDate = new Date(flightDate.getTime() + (4.5 * 60 * 60 * 1000));
    
    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDate = (date: Date): string => {
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
function createVacationCalendarUrl(): string {
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

describe('Google Calendar Integration', () => {
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

    describe('Outbound Flight', () => {
        it('should generate correct Google Calendar URL for outbound flight', () => {
            const url = createGoogleCalendarUrl(outboundFlight, TRIP_CONFIG.OUTBOUND_FLIGHT.DATE);
            const params = parseGoogleCalendarUrl(url);
            
            expect(validateGoogleCalendarUrl(url)).toBe(true);
            expect(params.action).toBe('TEMPLATE');
            expect(params.text).toBe('ISRAIR 6H141 - Tel Aviv (TLV) to Grenoble (GNB)');
            expect(params.location).toBe('Tel Aviv (TLV) - Grenoble (GNB)');
            expect(params.dates).toBe('20260117T055000Z/20260117T102000Z');
        });

        it('should include flight details in event description', () => {
            const url = createGoogleCalendarUrl(outboundFlight, TRIP_CONFIG.OUTBOUND_FLIGHT.DATE);
            const params = parseGoogleCalendarUrl(url);
            
            expect(params.details).toContain('ISRAIR 6H141');
            expect(params.details).toContain('Tel Aviv (TLV)');
            expect(params.details).toContain('Grenoble (GNB)');
            expect(params.details).toContain('Estimated Duration: 4.5 hours');
        });
    });

    describe('Return Flight', () => {
        it('should generate correct Google Calendar URL for return flight', () => {
            const url = createGoogleCalendarUrl(returnFlight, TRIP_CONFIG.RETURN_FLIGHT.DATE);
            const params = parseGoogleCalendarUrl(url);
            
            expect(validateGoogleCalendarUrl(url)).toBe(true);
            expect(params.action).toBe('TEMPLATE');
            expect(params.text).toBe('ISRAIR 6H142 - Grenoble (GNB) to Tel Aviv (TLV)');
            expect(params.location).toBe('Grenoble (GNB) - Tel Aviv (TLV)');
            expect(params.dates).toBe('20260124T103000Z/20260124T150000Z');
        });

        it('should include flight details in event description', () => {
            const url = createGoogleCalendarUrl(returnFlight, TRIP_CONFIG.RETURN_FLIGHT.DATE);
            const params = parseGoogleCalendarUrl(url);
            
            expect(params.details).toContain('ISRAIR 6H142');
            expect(params.details).toContain('Grenoble (GNB)');
            expect(params.details).toContain('Tel Aviv (TLV)');
            expect(params.details).toContain('Estimated Duration: 4.5 hours');
        });
    });

    describe('Vacation Event', () => {
        it('should generate correct Google Calendar URL for vacation event', () => {
            const url = createVacationCalendarUrl();
            const params = parseGoogleCalendarUrl(url);
            
            expect(validateGoogleCalendarUrl(url)).toBe(true);
            expect(params.action).toBe('TEMPLATE');
            expect(params.text).toBe('Vacation - Skiing in Les Arcs');
            expect(params.location).toBe('Les Arcs, France');
            expect(params.dates).toBe(`${TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE}/${TRIP_CONFIG.GOOGLE_CALENDAR.END_DATE}`);
        });

        it('should include vacation details in event description', () => {
            const url = createVacationCalendarUrl();
            const params = parseGoogleCalendarUrl(url);
            
            expect(params.details).toContain('Skiing vacation in Les Arcs, France');
            expect(params.details).toContain('Arc 1950 Village');
            expect(params.details).toContain('Out of office');
        });

        it('should calculate correct vacation duration', () => {
            const startDate = new Date(TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            const endDate = new Date(TRIP_CONFIG.GOOGLE_CALENDAR.END_DATE.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            const durationDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            
            expect(durationDays).toBe(8); // Google Calendar end date is exclusive, so 8 days = 7 nights
        });
    });

    describe('Flight Duration Calculation', () => {
        it('should calculate correct 4.5 hour flight duration for outbound flight', () => {
            const url = createGoogleCalendarUrl(outboundFlight, TRIP_CONFIG.OUTBOUND_FLIGHT.DATE);
            const params = parseGoogleCalendarUrl(url);
            
            const startDate = new Date(params.dates.split('/')[0].replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
            const endDate = new Date(params.dates.split('/')[1].replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
            const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
            
            expect(durationHours).toBe(4.5);
        });

        it('should calculate correct 4.5 hour flight duration for return flight', () => {
            const url = createGoogleCalendarUrl(returnFlight, TRIP_CONFIG.RETURN_FLIGHT.DATE);
            const params = parseGoogleCalendarUrl(url);
            
            const startDate = new Date(params.dates.split('/')[0].replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
            const endDate = new Date(params.dates.split('/')[1].replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
            const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
            
            expect(durationHours).toBe(4.5);
        });
    });

    describe('URL Encoding', () => {
        it('should properly encode special characters in flight information', () => {
            const url = createGoogleCalendarUrl(outboundFlight, '2026-01-17');
            const params = parseGoogleCalendarUrl(url);
            
            expect(params.text).toContain('ISRAIR 6H141');
            expect(params.text).toContain('(TLV)');
            expect(params.text).toContain('(GNB)');
        });

        it('should preserve newlines in event details', () => {
            const url = createGoogleCalendarUrl(outboundFlight, '2026-01-17');
            const params = parseGoogleCalendarUrl(url);
            
            expect(params.details).toContain('\n');
        });
    });

    describe('Add All to Calendar Functionality', () => {
        it('should generate valid URLs for all three calendar events', () => {
            const outboundUrl = createGoogleCalendarUrl(outboundFlight, TRIP_CONFIG.OUTBOUND_FLIGHT.DATE);
            const returnUrl = createGoogleCalendarUrl(returnFlight, TRIP_CONFIG.RETURN_FLIGHT.DATE);
            const vacationUrl = createVacationCalendarUrl();
            
            expect(validateGoogleCalendarUrl(outboundUrl)).toBe(true);
            expect(validateGoogleCalendarUrl(returnUrl)).toBe(true);
            expect(validateGoogleCalendarUrl(vacationUrl)).toBe(true);
        });

        it('should maintain date consistency across all events', () => {
            const outboundUrl = createGoogleCalendarUrl(outboundFlight, TRIP_CONFIG.OUTBOUND_FLIGHT.DATE);
            const returnUrl = createGoogleCalendarUrl(returnFlight, TRIP_CONFIG.RETURN_FLIGHT.DATE);
            const vacationUrl = createVacationCalendarUrl();
            
            const outboundParams = parseGoogleCalendarUrl(outboundUrl);
            const returnParams = parseGoogleCalendarUrl(returnUrl);
            const vacationParams = parseGoogleCalendarUrl(vacationUrl);
            
            expect(outboundParams.dates).toContain(TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE);
            expect(returnParams.dates).toContain(TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE.replace('17', '24'));
            expect(vacationParams.dates).toBe(`${TRIP_CONFIG.GOOGLE_CALENDAR.START_DATE}/${TRIP_CONFIG.GOOGLE_CALENDAR.END_DATE}`);
        });
    });
});