import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View, StyleSheet,} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StatusBar } from 'expo-status-bar';
import { getBackgroundColorAsync } from 'expo-system-ui';

type TempObj = {
  identifier: string;
  name: string;
  value: number;
}

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<TempObj[]>([]);
  const [serverIP, setServerIP] = useState("");

  const handleIPAddressChange = (newIP: string) => {
    setServerIP(newIP);
  };

  const getTemps = async () => {
    try {
      fetch(`http://${serverIP}:8000/data`)
        .then((response) => response.json())
        .then((json) => {
          const filteredData = json.filter((e: { name: string | string[]; }) => e.name.includes("GPU Hot Spot") || e.name.includes("Core (Tctl/Tdie)"))
          setData(filteredData);
        })
      // console.log(json);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const MINUTE_MS = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      getTemps();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [serverIP, data]);

  return (
    
    <SafeAreaProvider style={{backgroundColor: "#151718"}}>
      {isLoading ? (
        <ActivityIndicator style={{backgroundColor: "white"}}/>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            hidden={true}
          />
          <FlatList
            style={{marginTop: 175}}
            data={data}
            keyExtractor={({identifier}) => identifier}
            renderItem={({item}) => (
                <ThemedView style={styles.titleContainer}>
                  <ThemedText type="title">
                    {item.value.toFixed(1)}
                  </ThemedText>
                  <ThemedText type="subtitle">
                    {item.name} (°C)
                  </ThemedText>
                </ThemedView>
            )}
          />
            <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={handleIPAddressChange}
              value={serverIP}
              placeholder={"Enter IP Address..."}
              keyboardType='numeric'
              placeholderTextColor="white"
            />
          </SafeAreaView>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'background',
    borderColor: "white",
    color: "white",
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 2,
    height: 250,
    
  },
});

export default App;