import { StyleSheet, Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemeProvider } from '@react-navigation/native';

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style={{backgroundColor: "#151718"}}>
            <SafeAreaView>
                <ThemedText>
                  Ideas for settings: Ping timer (secs), add more sensors, edit sensor menu, change the filter. OOH. Allow user to view the sensors from the json (list the sensors in a modal or something). Move the IP address here
                </ThemedText>
            </SafeAreaView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
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
