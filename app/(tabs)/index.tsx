import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View, StyleSheet,} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
    
    <SafeAreaProvider>
      {isLoading ? (
        <ActivityIndicator style={{backgroundColor: "white"}}/>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            style={{marginTop: 100}}
            data={data}
            keyExtractor={({identifier}) => identifier}
            renderItem={({item}) => (
                <ThemedView style={styles.titleContainer}>
                  <ThemedText type="title">
                    {item.value.toFixed(2)}
                  </ThemedText>
                  <ThemedText >
                    {item.name}
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
    backgroundColor: "white"
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default App;