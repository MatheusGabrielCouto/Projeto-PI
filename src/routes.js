import React from 'react'
import {createStackNavigator } from '@react-navigation/stack'

import Main from './pages/Main';
import Book from './pages/Book';


const Routes = () => {
  const Stack = createStackNavigator();
  return(
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Book" component={Book} />
      </Stack.Navigator>
  )
}

export default Routes;