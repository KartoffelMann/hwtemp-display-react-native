import { Text, type TextProps, StyleSheet } from 'react-native';
import { ThemedText, ThemedTextProps } from './ThemedText';
import { ThemedView } from "./ThemedView";
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { TempObj } from '@/app/(tabs)';

export type TempTextProps = ThemedTextProps & {
    tempObj: TempObj;
}

export function TempText({
    tempObj,
}: TempTextProps) {

    function getTemp(tempObj: TempObj)
    {
        if(tempObj.identifier.includes("fan") || tempObj.identifier.includes("Fan"))
        {
            return tempObj.value.toFixed(0)
        }
        else 
        {
            return tempObj.value.toFixed(1)
        }
    }

    function getUnit(tempObj: TempObj)
    {
        if(tempObj.identifier.includes("fan") || tempObj.identifier.includes("Fan"))
        {
            return `${tempObj.name} RPM`
        }
        else
        {
            return `${tempObj.name} °C`
        }
    }

    return (
        <ThemedView style={styles.titleContainer}>
            <ThemedText
                type="title"
            >
                {getTemp(tempObj)}
            </ThemedText>

            <ThemedText type="subtitle">
                {getUnit(tempObj)}
            </ThemedText>
        </ThemedView>
    )

}

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