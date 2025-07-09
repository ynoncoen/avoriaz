import { describe, it, expect } from 'vitest'
import { getRestaurantNotificationDates } from '../src/config/trip-dates'

// Mock restaurant booking function
function getTodayBooking(testDate: Date, mockBookings: any[] = []) {
    const today = testDate || new Date();
    const dateStr = `${today.getDate()}.${today.getMonth() + 1}`;

    return mockBookings.find(booking => booking.date === dateStr) || null;
}

// Mock the notification period function from the actual code
function isWithinNotificationPeriod(testDate: Date) {
    const today = testDate || new Date();
    const { startDate, endDate } = getRestaurantNotificationDates();
    
    return today >= startDate && today <= endDate;
}

// Mock notification handler logic
async function mockNotificationHandler(testDate: Date, mockBookings: any[] = []) {
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

describe('Restaurant Notification System', () => {
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

    it('should not send notifications before notification period', async () => {
        const testDate = new Date('2026-01-09T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(false);
        expect(result.type).toBe('outside_period');
    });

    it('should send notifications during notification period', async () => {
        const testDate = new Date('2026-01-10T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(true);
        expect(result.type).toBe('no_booking');
    });

    it('should send "no restaurant" notification when no booking exists', async () => {
        const testDate = new Date('2026-01-15T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(true);
        expect(result.type).toBe('no_booking');
        expect(result.notificationTitle).toBe('🍽️ No Restaurant Today');
        expect(result.notificationBody).toBe('No restaurant for today. Are we going hungry? 😅');
    });

    it('should send restaurant reminder when booking exists', async () => {
        const testDate = new Date('2026-01-17T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(true);
        expect(result.type).toBe('booking_found');
        expect(result.notificationTitle).toBe('🍽️ Restaurant Reminder');
        expect(result.notificationBody).toContain('Le Loup Blanc');
        expect(result.notificationBody).toContain('19:30');
        expect(result.booking).toBeDefined();
    });

    it('should handle no booking during trip', async () => {
        const testDate = new Date('2026-01-18T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(true);
        expect(result.type).toBe('no_booking');
    });

    it('should handle booking with different restaurant', async () => {
        const testDate = new Date('2026-01-20T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(true);
        expect(result.type).toBe('booking_found');
        expect(result.notificationBody).toContain('Chez Bouboule');
        expect(result.notificationBody).toContain('20:00');
    });

    it('should handle last day of trip', async () => {
        const testDate = new Date('2026-01-24T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(true);
        expect(result.type).toBe('no_booking');
    });

    it('should not send notifications after trip ends', async () => {
        const testDate = new Date('2026-01-25T15:00:00Z');
        const result = await mockNotificationHandler(testDate, mockBookings);
        
        expect(result.notificationSent).toBe(false);
        expect(result.type).toBe('outside_period');
    });
});