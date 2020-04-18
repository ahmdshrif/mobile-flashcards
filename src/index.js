import quizScreen from "./component/Quiz";
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./component/Home";
import newDeckScreen from "./component/newDeck";
import newCardScreen from "./component/newCard";
import deckDetailsScreen from "./component/deckDetails";
import { saveDeckTitle, getDecks } from "./utits/api";
const Stack = createStackNavigator();

function MyStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={MyTabs} />
            <Stack.Screen name="newCard" component={newCardScreen} />
            <Stack.Screen name="quiz" component={quizScreen} />
            <Stack.Screen name="deckDerails" component={deckDetailsScreen} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="newDeck" component={newDeckScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
