import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TextInput } from 'react-native';
import { Button, Switch } from '@rneui/themed';
import { storeData, getData } from '@/hooks/useLocalStorage';

import { BetterLog } from '@/hooks/useDebuggingTools';
import AsyncStorage from '@react-native-async-storage/async-storage';

const settingsData = [
  {
    title: 'General',
    data: [
      { id: 'ipAddress', label: 'IP Address', type: 'ipAddressInput'},
      { id: 'port', label: "Port", type: "portInput"},
      { id: 'darkMode', label: 'Dark Mode (not implemented)', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Developer',
    data: [
      { id: 'clearLocalStorage', label: 'Clear Local Storage', type: 'clearLocalStorageButton'},
    ],
  },
];

const SettingsScreen = ({}) => {

  const [serverIP, setServerIP] = useState("");
  const [port, setPort] = useState("");

  const handleIPAddressChange = (newIP: string) => {
    setServerIP(newIP);
  };

  const handlePortChange = (newPort: string) => {
    setPort(newPort);
  };

  const saveIPAddress = () => {
    storeData("serverIP", serverIP)
  }

  const savePort = () => {
    storeData("port", port)
  }

  const clearLocalStorage = () => {
    BetterLog("settings.tsx", "clearLocalStorageButton", "Clearing local storage", true)
    AsyncStorage.clear()
    setServerIP("")
    setPort("")
  }
  
  useEffect(() => { 
    async function loadIpAddress() {
      try {
        const storedIp = await getData('serverIP');
        if (storedIp) {
            try{
                setServerIP(JSON.parse(storedIp).ip)
            } catch (e) {
                setServerIP(storedIp)
            }
        }
      } catch (error) {
        console.error('Error loading server IP:', error);
      }
    }
    async function loadPort() {
      try {
        const storedPort = await getData('port');
        if (storedPort) {
            try{
                setPort(JSON.parse(storedPort).port)
            } catch (e) {
                setPort(storedPort)
            }
        }
      } catch (error) {
        console.error('Error loading port:', error);
      }
    }
    loadIpAddress();
    loadPort();
   }, [serverIP, port])

  const renderItem = ({ item }) => {
    if (item.type === 'toggle') {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <Switch 
            value={item.value} 
            onValueChange={(newValue) => {}} 
            color='rgb(14, 65, 92)'
          />
        </View>
      );
    } 
    else if (item.type === 'clearLocalStorageButton') {
      return (
        <View style={styles.itemContainer}>
          <Button 
            onPress={clearLocalStorage} 
            title="Clear Local Storage"
            buttonStyle={{ backgroundColor: 'rgb(14, 65, 92)' }}
            />
        </View>
      );
    }
    else if (item.type === 'ipAddressInput') {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <TextInput
                    style={styles.input}
                    placeholder={"Enter here..."}
                    keyboardType='numeric'
                    placeholderTextColor="white"
                    onChangeText={handleIPAddressChange}
                    onSubmitEditing={saveIPAddress}
                    value={serverIP}
          />
        </View>
      )
    }
    else if (item.type === 'portInput')
    {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <TextInput
                    style={styles.input}
                    placeholder={"Enter here..."}
                    keyboardType='numeric'
                    placeholderTextColor="white"
                    onChangeText={handlePortChange}
                    onSubmitEditing={savePort}
                    value={port}
          />
        </View>
      )
    }
  };       

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SectionList
      sections={settingsData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#151718',
    color: "#FFFFFF",
  },
  sectionHeader: {
    backgroundColor: '#151718',
    color: "#FFFFFF",
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#151718',
    borderBottomWidth: 1,
    color: "#FFFFFF",
    borderColor: '#FFFFFF',
  },
  itemLabel: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  input: {
    width: 200,
    fontSize: 16,
    color: "#FFFFFF",
    borderColor: "#FFFFFF",
    textAlign: "right",
  },
});

export default SettingsScreen;