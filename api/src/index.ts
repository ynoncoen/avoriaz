import {VercelRequest, VercelResponse} from '@vercel/node';
import * as cheerio from 'cheerio';

interface SnowConditions {
    topDepth: number;
    bottomDepth: number;
    freshSnowfall: number;
    lastSnowfall: string;
}

interface PeriodForecast {
    time: 'AM' | 'PM' | 'night';
    temp: number;
    weather: string;
    windSpeed: number;
    windDir: string;
    snowfall: number;
    rain: number;
    freezeLevel: number;
}

interface DayForecast {
    date: string;
    periods: PeriodForecast[];
}

interface WeatherResponse {
    data: DayForecast[];
    snowConditions: SnowConditions;
    error?: string;
}

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
): Promise<void> {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Access-Control-Max-Age', '86400');

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    try {
        const [weatherData, snowConditions] = await Promise.all([
            scrapeWeatherData(),
            scrapeSnowConditions()
        ]);

        // Cache the response for 30 minutes
        response.setHeader('Cache-Control', 's-maxage=1800');
        response.status(200).json({
            data: weatherData,
            snowConditions
        });
    } catch (error) {
        console.error('Error in weather API:', error);
        response.status(500).json({error: 'Failed to fetch weather data'});
    }
}

async function scrapeSnowConditions(): Promise<SnowConditions> {
    try {
        const response = await fetch('https://www.snow-forecast.com/resorts/Avoriaz/6day/top');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Find the snow-depths-table
        const snowDepths: SnowConditions = {
            topDepth: 0,
            bottomDepth: 0,
            freshSnowfall: 0,
            lastSnowfall: ''
        };

        $('.snow-depths-table__table tbody tr').each((_, row) => {
            const label = $(row).find('th').text().toLowerCase();
            const valueCell = $(row).find('td');

            if (label.includes('top snow depth')) {
                const match = valueCell.text().match(/(\d+)/);
                if (match) {
                    snowDepths.topDepth = parseInt(match[1]);
                }
            }
            else if (label.includes('bottom snow depth')) {
                const match = valueCell.text().match(/(\d+)/);
                if (match) {
                    snowDepths.bottomDepth = parseInt(match[1]);
                }
            }
            else if (label.includes('fresh snowfall')) {
                const match = valueCell.text().match(/(\d+)/);
                if (match) {
                    snowDepths.freshSnowfall = parseInt(match[1]);
                }
            }
            else if (label.includes('last snowfall')) {
                snowDepths.lastSnowfall = valueCell.text().trim();
            }
        });

        return snowDepths;
    } catch (error) {
        console.error('Error scraping snow conditions:', error);
        throw error;
    }
}

async function scrapeWeatherData(): Promise<DayForecast[]> {
    try {
        const response = await fetch('https://www.snow-forecast.com/resorts/Avoriaz/6day/top', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const weatherData: DayForecast[] = [];

        // Extract dates and weekdays
        const dates: string[] = [];
        $('.forecast-table-days__cell').each((_, elem) => {
            const dateStr = $(elem).data('date');
            if (typeof dateStr === 'string') {
                dates.push(dateStr);
            }
        });

        // Process data for each day
        for (let i = 0; i < dates.length; i++) {
            const dayForecast: DayForecast = {
                date: dates[i],
                periods: []
            };

            // Calculate indices for AM, PM, and night periods
            const baseIndex = i * 3;
            const timeSlots: ('AM' | 'PM' | 'night')[] = ['AM', 'PM', 'night'];

            // Process each time period
            for (let j = 0; j < 3; j++) {
                const currentIndex = baseIndex + j;

                // Extract weather icon and description
                const weatherCell = $(`.forecast-table__row[data-row="weather"] .forecast-table__cell`).eq(currentIndex);
                const weatherIcon = weatherCell.find('img').attr('alt') || '';

                // Extract temperature
                const tempCell = $(`.forecast-table__row[data-row="temperature-max"] .forecast-table__cell`).eq(currentIndex);
                const tempValue = tempCell.find('.temp-value').data('value');
                const temp = parseInt(typeof tempValue === 'string' || typeof tempValue === 'number' ? String(tempValue) : '0');

                // Extract wind speed
                const windCell = $(`.forecast-table__row[data-row="wind"] .forecast-table__cell`).eq(currentIndex);
                const windSpeedText = windCell.find('.wind-icon__val').text();
                const windSpeed = parseInt(windSpeedText || '0');
                const windDir = windCell.find('.wind-icon__tooltip').text() || '';

                // Extract snowfall
                const snowCell = $(`.forecast-table__row[data-row="snow"] .forecast-table__cell`).eq(currentIndex);
                const snowValue = snowCell.find('.snow-amount__value').text();
                const snowfall = parseFloat(snowValue || '0');

                // Extract rain
                const rainCell = $(`.forecast-table__row[data-row="rain"] .forecast-table__cell`).eq(currentIndex);
                const rainValue = rainCell.find('.rain-amount').text();
                const rain = parseFloat(rainValue || '0');

                // Extract freezing level
                const freezeCell = $(`.forecast-table__row[data-row="freezing-level"] .forecast-table__cell`).eq(currentIndex);
                const freezeValue = freezeCell.find('.level-value').data('value');
                const freezeLevel = parseInt(typeof freezeValue === 'string' || typeof freezeValue === 'number' ? String(freezeValue) : '0');

                dayForecast.periods.push({
                    time: timeSlots[j],
                    temp,
                    weather: parseWeatherType(weatherIcon),
                    windSpeed,
                    windDir,
                    snowfall,
                    rain,
                    freezeLevel
                });
            }

            weatherData.push(dayForecast);
        }

        return weatherData;
    } catch (error) {
        console.error('Error scraping weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
}

function parseWeatherType(weatherIcon: string): string {
    const iconMapping: Record<string, string> = {
        'clear': 'clear',
        'part cloud': 'partlyCloudy',
        'light snow': 'lightSnow',
        'mod snow': 'moderateSnow',
        'heavy snow': 'heavySnow',
        'snow shwrs': 'snowShowers',
        'light rain': 'lightRain',
        'mod. rain': 'moderateRain',
        'heavy rain': 'heavyRain',
        'cloud': 'cloudy'
    };

    for (const [key, value] of Object.entries(iconMapping)) {
        if (weatherIcon.toLowerCase().includes(key)) {
            return value;
        }
    }

    return 'unknown';
}
