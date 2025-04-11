import { Stack, SplashScreen, Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from '../src/context/AuthContext';
import { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStateProvider } from '../src/context/GlobalStateContext';

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f5f5',
  },
};

export default function Layout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <GlobalStateProvider>
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: '#666',
                tabBarStyle: {
                  height: 80,
                  paddingBottom: 20,
                  paddingTop: 8,
                  backgroundColor: '#fff',
                  borderTopWidth: 1,
                  borderTopColor: '#e0e0e0',
                  elevation: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: '500',
                },
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: 'Budget',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="wallet" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="goals"
                options={{
                  title: 'Goals',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="flag" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="ai"
                options={{
                  title: 'AI',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="robot" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="discounts"
                options={{
                  title: 'Discounts',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="tag" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="transactions"
                options={{
                  title: 'Transactions',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="currency-usd" size={size} color={color} />
                  ),
                }}
              />
            </Tabs>
          </GlobalStateProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 