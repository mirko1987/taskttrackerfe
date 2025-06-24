import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import { TaskProvider } from './state/context/TaskContext';
import HomeScreen from './screen/HomeScreen';
import CreateTaskScreen from './screen/CreateTaskScreen';

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  CreateTask: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Lista de Tareas' }}
          />
          <Stack.Screen 
            name="CreateTask" 
            component={CreateTaskScreen}
            options={{ title: 'Agregar Tarea' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </TaskProvider>
  );
}
