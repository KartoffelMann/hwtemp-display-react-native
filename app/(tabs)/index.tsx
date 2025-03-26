import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useEffect, useState, useRef} from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View, StyleSheet, AppState,} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StatusBar } from 'expo-status-bar';
import { getBackgroundColorAsync } from 'expo-system-ui';
import { getData } from '@/hooks/useLocalStorage';

import { BetterLog, printDebug } from '@/hooks/useDebuggingTools';
import { TempText } from '@/components/TempText';

export type TempObj = {
  identifier: string;
  name: string;
  value: number;
}

const App = () => {

  const [isPinging, setIsPinging] = useState(false);
  const [data, setData] = useState<TempObj[]>([]);


  const getTemps = async () => {
    try {
      let serverIP = await getData("serverIP")
      let port = await getData("port")
      BetterLog("index.tsx", "getTemps", "pinging " + serverIP + ":" + port, false)
      fetch(`http://${serverIP}:${port}/data`)
        .then((response) => response.json())
        .then((json) => {
          const filteredData = json.filter((e: { name: string | string[]; }) => (e.identifier.includes("cpu") || (e.identifier.includes("gpu") && !e.identifier.includes("fan"))))
          setData(filteredData);
        })

    } catch (error) {
      console.log(error);
    } finally {

    }
  };

  const MINUTE_MS = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      getTemps();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [data, isPinging]);

  return (
    
    <SafeAreaProvider style={{backgroundColor: "#151718"}}>     
      <SafeAreaView style={{flex: 1}}>
        {(data && data.length > 0) ? (
          <FlatList
          style={{paddingTop: 125, paddingBottom: 140}}
          data={data}
          keyExtractor={({identifier}) => identifier}
          renderItem={({item}) => (
            <TempText tempObj={item}/>
          )}
        />
        ) : (
            <View style={{marginVertical: "auto"}}>
              <ThemedText style={{fontSize: 50, textAlign: "center", marginHorizontal: "auto", verticalAlign: "middle"}}>
                {data === null ? "Loading..." : "Go to Settings and enter your PC's IP address. Turn on and configure the server"}
              </ThemedText>
            </View>
        )}
        
      </SafeAreaView> 
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 5,
    height: 350,
    marginHorizontal: 2
  },
});

export default App;