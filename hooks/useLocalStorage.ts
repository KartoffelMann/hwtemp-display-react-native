import AsyncStorage from '@react-native-async-storage/async-storage';
import { BetterLog } from './useDebuggingTools';

export const storeData = async (key: string, value: string) => {
    try {
      BetterLog("useLocalStorage.tsx", "storeData", "saved key: " + key + " value: " + value, false)
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Error saving key: " + key + " value: " + value)
    }
};

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            BetterLog("useLocalStorage.tsx", "getData", "looking for " + key + " value: " + value, false)
            return value
        }
    }
    catch (e) {
        console.error("error reading value")
    }
};