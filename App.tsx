import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import RequestScreen from './src/Screens/RequestScreen';
import TodoScreen from './src/Screens/TodoScreen';

export type RootStackParamList = {
   Home: undefined,
   Todos: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={RequestScreen} />
          <Stack.Screen name="Todos" component={TodoScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
