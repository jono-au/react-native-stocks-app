import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import TabBarIcon from './components/TabBarIcons';
import StocksScreen from './screens/StocksScreen';
import SearchScreen from './screens/SearchScreen';
import Home from './screens/Home';
import { ListContext } from './contexts/ListContext';
import axios from 'axios';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import {Provider} from 'react-redux';
import store from './redux/store';

const Tab = createBottomTabNavigator();

function MyTabs({ navigation }){
  return(
    <Tab.Navigator>

      <Tab.Screen 
      name="Home" 
      component={Home}
      options={{
        title: "Home",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="home" />
        ),
      }}
      />

      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-search" />
          ),
        }}
         />
      <Tab.Screen 
        name="Stocks" 
        component={StocksScreen} 
        options={{
          title: "Stocks",
          tabBarIcon: ({ focused }) => (
        
            <TabBarIcon focused={focused} name="md-trending-up" />
          ),  
        }}
        />
   
    </Tab.Navigator>
  );  
}


const Stack = createStackNavigator();

function MainStackNavigator(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={MyTabs} options={{headerLeft: null}}/>
    </Stack.Navigator>
  );
};


function StockApp() {
    //set company list context across app
    const [companyList, setCompanyList] = useState([]);
  
  //First set the company list to MongoList
  useEffect(() => {
  axios.get('http://172.22.27.231:3000/stockslist/60ba2de149785f2fb774b3ea')
          .then((response) => {setCompanyList((JSON.parse(response.data.list)))})
          .catch(err => response.status(400).json('Error: '+ err));
        
        }, []);

  return (
   
      <ListContext.Provider value={{companyList, setCompanyList}}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </ListContext.Provider>
  );
};


export default function App() {

    return (
      <Provider store={store}>
        <StockApp />
      </Provider>
    );
  };


