// pages/api/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';

// Cache weather data for 30 minutes
const cache = new NodeCache({ stdTTL: 1800 });

async function scrapeWeatherData() {
    const cacheKey = 'avoriaz-weather';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

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

        const weatherData = [];
        const dates: string[] = [];

        // Extract dates
        $('.forecast-table__dates th').each((_, elem) => {
            const date = $(elem).text().trim();
            if (date) dates.push(date);
        });

        // Process each row of data
        const processRow = (selector: string) => {
            const values: string[] = [];
            $(selector).each((_, elem) => {
                values.push($(elem).text().trim());
            });
            return values;
        };

        // Extract data for each day
        for (let i = 0; i < dates.length; i++) {
            const timeSlots = ['AM', 'PM', 'night'];
            const dayData = {
                date: dates[i],
                periods: timeSlots.map((time, timeIndex) => {
                    // Calculate the correct index in the data arrays
                    const dataIndex = i * 3 + timeIndex;

                    // Extract temperature
                    const temps = processRow('.forecast-table-temp__row td');
                    const temp = parseInt(temps[dataIndex]) || 0;

                    // Extract weather condition
                    const weatherRow = $('.forecast-table-weather__row td');
                    const weatherCell = weatherRow[dataIndex];
                    const weatherClass = $(weatherCell).find('div').attr('class') || '';
                    const weather = parseWeatherClass(weatherClass);

                    // Extract wind data
                    const windSpeeds = processRow('.forecast-table-wind__row td');
                    const windSpeed = parseInt(windSpeeds[dataIndex]) || 0;

                    const windDirs = processRow('.forecast-table-wind-dir__row td');
                    const windDir = windDirs[dataIndex];

                    // Extract snow data
                    const snowfall = processRow('.forecast-table-snow__row td');
                    const snow = parseFloat(snowfall[dataIndex]) || 0;

                    // Extract rain data
                    const rainfall = processRow('.forecast-table-rain__row td');
                    const rain = parseFloat(rainfall[dataIndex]) || 0;

                    // Extract freeze level
                    const freezeLevels = processRow('.forecast-table-freezing-level__row td');
                    const freezeLevel = parseInt(freezeLevels[dataIndex]) || 0;

                    return {
                        time,
                        temp,
                        weather,
                        windSpeed,
                        windDir,
                        snowfall: snow,
                        rain,
                        freezeLevel
                    };
                })
            };

            weatherData.push(dayData);
        }

        // Cache the results
        cache.set(cacheKey, weatherData);
        return weatherData;

    } catch (error) {
        console.error('Error scraping weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
}

function parseWeatherClass(className: string): string {
    // Map weather classes to conditions
    if (className.includes('clear')) return 'clear';
    if (className.includes('snow')) return 'snow';
    if (className.includes('light-snow')) return 'lightSnow';
    if (className.includes('rain')) return 'rain';
    if (className.includes('cloud')) return 'cloudy';
    return 'cloudy';
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data = await scrapeWeatherData();
        res.setHeader('Cache-Control', 's-maxage=1800');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data: ' + error });
    }
}