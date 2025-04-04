import WeatherQueryResponse from "@/data/models/WeatherQueryResponse";
import { storeData } from "@/storage/DataStore";
import {WEATHER_KEY} from '@env'

const weatherURL = "https://api.weatherstack.com/current?access_key=" + WEATHER_KEY + "&query=Niagara Falls";

interface WeatherClient {
    getWeather(): Promise<WeatherQueryResponse | undefined>;
};

const weatherClient: WeatherClient = {
    getWeather: async() => {
        try {
            const options = { method: 'GET'};
            console.log(weatherURL);
            
            const response = await fetch( weatherURL, options );

            const result = await response.text();
            console.log(result);

            const responseObject: WeatherQueryResponse = await JSON.parse(result);
            
	        console.log(responseObject);
            storeData(result);

            return responseObject;
        } catch (error) {
            console.error(error);
        }   
        return undefined
    }
};
export default weatherClient;
