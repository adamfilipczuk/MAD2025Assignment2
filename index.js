import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './src/components/store.js';

import Home from './src/screens/home.js';
import Product from './src/screens/product.js';
import Description from './src/screens/description.js';
import Cart from './src/screens/cart.js';
import LoginScreen from './src/screens/login.js';
import ProfileScreen from './src/screens/profile.js';
import MyOrdersScreen from './src/screens/order.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ---------- Stack Screens ----------
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Description" component={Description} />
    </Stack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={Cart} />
    </Stack.Navigator>
  );
}

function MyOrdersStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyOrdersMain" component={MyOrdersScreen} />
    </Stack.Navigator>
  );
}

function LoginStackScreen({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// ---------- Tabs ----------


function MainTabs({ user, setUser, setIsFirstTime }) {
  const cartItems = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const newOrdersCount = useSelector((state) =>
    state.orders.filter((order) => !order.isPaid || !order.isDelivered).length
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'MyOrders') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          tabBarBadge: totalCount > 0 ? totalCount : null,
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrdersStackScreen}
        options={{
          tabBarBadge: newOrdersCount > 0 ? newOrdersCount : null,
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfileScreen
            user={user}
            onLogout={async () => {
              await AsyncStorage.clear();
              setUser(null);
              setIsFirstTime(true);
            }}
          />
        )}
      />
    </Tab.Navigator>
  );
}


// ---------- Main App ----------
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimeout);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const checkLoginStatus = async () => {
        try {
          const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');
          const userDataStr = await AsyncStorage.getItem('userData');

          if (!hasLoggedIn || !userDataStr) {
            setIsFirstTime(true);
          } else {
            setUser(JSON.parse(userDataStr));
            setIsFirstTime(false);
          }
        } catch (error) {
          console.error('Error reading login status:', error);
          setIsFirstTime(true);
        }
      };

      checkLoginStatus();
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('./src/assets/splash.png')} style={styles.logo} />
      </View>
    );
  }

  if (isFirstTime === null) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isFirstTime ? (
          <LoginStackScreen
            onLogin={(loggedInUser) => {
              setUser(loggedInUser);
              setIsFirstTime(false);
            }}
          />
        ) : (
          <MainTabs user={user} setUser={setUser} setIsFirstTime={setIsFirstTime} />
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

registerRootComponent(App);
