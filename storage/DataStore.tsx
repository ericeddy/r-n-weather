import WeatherQueryResponse from '@/data/models/WeatherQueryResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async(value: string) => {
    try {
        await AsyncStorage.setItem('lastWeather', value);
    } catch (e) {
        // saving error
        console.error(e)
    }
}
export const readData = async() => {
    try {
        const value = await AsyncStorage.getItem('lastWeather');
        if (value !== null) {
            return JSON.parse(value) as WeatherQueryResponse
        }
    } catch (e) {
        // error reading value
        console.error(e)
    }
}
export const clearData = async() => {
    try {
        await AsyncStorage.removeItem('lastWeather')
    } catch (e) {
        // saving error
        console.error(e)
    }
}
