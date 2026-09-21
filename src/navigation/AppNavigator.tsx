import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import BookingScreen from '../screens/BookingScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import DriverDetailsScreen from '../screens/DriverDetailsScreen';
import CancelBookingScreen from '../screens/CancelBookingScreen';
import LiveTrackingScreen from '../screens/LiveTrackingScreen';
import CancellationConfirmationScreen from '../screens/CancellationConfirmationScreen';

import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PickupConfirmationScreen from '../screens/PickupConfirmationScreen';
import RideStartedScreen from '../screens/RideStartedScreen';
import DestinationReachedScreen from '../screens/DestinationReachedScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
        />

        <Stack.Screen
          name="CarDetails"
          component={CarDetailsScreen}
        />

        <Stack.Screen
          name="Booking"
          component={BookingScreen}
        />

        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethodsScreen}
        />

        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
        />

        <Stack.Screen
          name="MyBookings"
          component={MyBookingsScreen}
        />

        <Stack.Screen
          name="BookingDetails"
          component={BookingDetailsScreen}
        />

              <Stack.Screen
            name="DriverDetails"
            component={DriverDetailsScreen}
          />

      <Stack.Screen
        name="CancelBooking"
        component={CancelBookingScreen}
      />

      <Stack.Screen
        name="LiveTracking"
        component={LiveTrackingScreen}
      />


<Stack.Screen
  name="CancellationConfirmation"
  component={CancellationConfirmationScreen}
/>

<Stack.Screen
  name="Notification"
  component={NotificationScreen}
/>

<Stack.Screen
  name="Profile"
  component={ProfileScreen}
/>

<Stack.Screen
  name="PickupConfirmation"
  component={PickupConfirmationScreen}
/>

<Stack.Screen
  name="RideStarted"
  component={RideStartedScreen}
/>
<Stack.Screen
  name="DestinationReached"
  component={DestinationReachedScreen}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;