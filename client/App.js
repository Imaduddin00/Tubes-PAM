import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import DrawerNavigatorRoutes from './Screen/DrawerNavigationRoutes';
import AddEmployee from './Screen/AddEmployee';
import HomeScreen from './Screen/HomeScreen';
import NavigationDrawerHeader from './Screen/Components/NavigationDrawerHeader';
import EmployeeDetail from './Screen/EmployeeDetail';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigatorRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddEmployee"
          component={AddEmployee}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmployeeDetail"
          component={EmployeeDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;