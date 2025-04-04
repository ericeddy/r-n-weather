interface WeatherQueryResponse {
    request: ResponseRequest
    location: ResponseLocation
    current: ResponseCurrent
}
interface ResponseRequest {
    type: string
    query: string
    language: string
    unit: string
}
interface ResponseLocation {
    name: string
    country: string
    region: string
    lat: string
    lon: string
    timezone_id: string
    localtime: string
    localtime_epoch: number
    utc_offset: string
}
interface ResponseCurrent {
    observation_time: string
    temperature: number
    weather_code: number
    weather_icons: Array<string>
    weather_descriptions: Array<string>
    astro: ResponseAstro 
    air_quality: ResponseAirQuality
    wind_speed: number
    wind_degree: number
    wind_dir: string
    pressure: number
    precip: number
    humidity: number
    cloudcover: number
    feelslike: number
    uv_index: number
    visibility: number
}
interface ResponseAstro {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: number
}
interface ResponseAirQuality {
    co: string
    no2:string
    o3: string
    so2:string
    pm2_5: string
    pm10: string
    "us-epa-index": string
    "gb-defra-index": string
}

export default WeatherQueryResponse;

/*

{
    "request": {
        "type": "City",
        "query": "New York, United States of America",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "New York",
        "country": "United States of America",
        "region": "New York",
        "lat": "40.714",
        "lon": "-74.006",
        "timezone_id": "America/New_York",
        "localtime": "2019-09-07 08:14",
        "localtime_epoch": 1567844040,
        "utc_offset": "-4.0"
    },
    "current": {
        "observation_time": "12:14 PM",
        "temperature": 13,
        "weather_code": 113,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        "weather_descriptions": [
            "Sunny"
        ],
        "astro": {
            "sunrise": "06:31 AM",
            "sunset": "05:47 PM",
            "moonrise": "06:56 AM",
            "moonset": "06:47 PM",
            "moon_phase": "Waxing Crescent",
            "moon_illumination": 0
        },
        "air_quality": {
            "co": "468.05",
            "no2": "32.005",
            "o3": "55",
            "so2": "7.4",
            "pm2_5": "6.66",
            "pm10": "6.66",
            "us-epa-index": "1",
            "gb-defra-index": "1"
        },
        "wind_speed": 0,
        "wind_degree": 349,
        "wind_dir": "N",
        "pressure": 1010,
        "precip": 0,
        "humidity": 90,
        "cloudcover": 0,
        "feelslike": 13,
        "uv_index": 4,
        "visibility": 16
    }
}

*/