import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import weatherClient from '@/networking/WeatherClient';
import WeatherQueryResponse from '@/data/models/WeatherQueryResponse';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { clearData, readData } from '@/storage/DataStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [weather, setWeather] = useState<WeatherQueryResponse>(  )
  // const [inputText, setInputText] = useState<String>()

  const checkWeather = async() => {
    const data = await readData()
    setWeather(data)
  }
  const getWeather = async() => {
    if(loading) { return }
    setLoading(true)
    weatherClient.getWeather().then(async (w)=>{
      // save to local db // 
      await sleep(300)
      setLoading(false)
      setWeather(w)
      if(w != null) {
        console.log(w)
      }
    })
  }
  const clearWeather = async() => {
    await clearData()
    setWeather(undefined)
  }
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      checkWeather()
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemedView style={{flex: 1}}>
        <ThemedView style={styles.container} lightColor='#CCCCCC' darkColor='#444444'>
          <View><Text style={styles.clearBtn} onPress={clearWeather}>X</Text></View>
          <ThemedText style={styles.textTitle}> {weather?.request.query ?? ( loading ? ".. Weather loading .." : ".. Weather not loaded ..")} </ThemedText>
          <ThemedText style={styles.textDescription}> {weather?.current.weather_descriptions.toString() ?? ( loading ? ". . . . ." : " ")} </ThemedText>
          <ThemedText style={styles.textInfo}> {"Temperature:"} <Text style={styles.textData}>{weather?.current.temperature.toString() ?? "--"}{weather == undefined ? "" : "°C"}</Text> </ThemedText>
          <ThemedText style={styles.textInfo}> {"   Humidity:"} <Text style={styles.textData}>{weather?.current.temperature.toString() ?? "--"}{weather == undefined ? "" : "%"}</Text> </ThemedText>
          
          <View style={styles.button}><Button title='Load Weather' onPress={getWeather} color="#000000" /></View>
        </ThemedView>
      </ThemedView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    borderWidth: 6,
    borderRadius: 24,
    maxHeight: 800,
    minWidth: 320,
    alignSelf: "center",
    textAlign: 'center',
  },
  clearBtn: {
    fontWeight: "900",
    color: "#a60000",
    backgroundColor: "#CCCCCC",
    alignSelf: 'flex-end',
    alignItems: "center",
    height: 24,
    width: 24,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    userSelect: "none",
    textAlign: "center",
    lineHeight: 24
  },
  textTitle: {
    fontFamily: 'SpaceMono',
    fontWeight: "900",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 32,
    textAlign: 'center',
  }, 
  textDescription: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  textInfo: {
    marginHorizontal: 16,
    fontFamily: 'SpaceMono',
    fontSize: 14,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  textData: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    textAlign: 'left',
  },
  button: {
    marginTop: 8,
    userSelect: "none"
    
  },
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
