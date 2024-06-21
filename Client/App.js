import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import DeviceScreen from './screens/Device';
import QRCode from './screens/QRcode';

const Stack = createNativeStackNavigator();

const HomeHeader = () => {
  return(
    <View style={styles.homeHeaderStyles}>
      <Text style={{ color: 'white', fontSize: 30, alignSelf: 'flex-end' }}>Hey, </Text>
      <Text style={styles.homeHeaderTextStyles}>Ramith!</Text>
    </View>
  )
}

// const DeviceHeader = () => {
//   return(
//     <View style={styles.deviceHeaderStyles}>
//       <View style={styles.deviceHeaderTitle}><Text style={{fontSize:30, color: 'white', fontWeight: '600'}}>Your HazGuard</Text></View>
//       <View style={styles.deviceHeaderWarning}><Text style={{fontWeight: '500'}}>HaZGuard Is Working Fine</Text></View>
//     </View>
//   )
// }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={homeOptions}/>
        <Stack.Screen name="Device" component={DeviceScreen} options={deciveOptions}/>
        <Stack.Screen name="QRCode" component={QRCode} options={deciveOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const homeOptions = {
  title: 'Home',
  header: ()=> <HomeHeader/>,
}

const deciveOptions = {
  title: 'Device',
  headerBackVisible: false,
  // header: () => <DeviceHeader/>,
  headerTransparent: true
}




const styles = StyleSheet.create({


  // Home screen styles
  homeHeaderStyles: {
    height: 100,
    backgroundColor: '#262626',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  homeHeaderTextStyles: {
    color: '#57C155',
    fontSize: 30,
    alignSelf: 'flex-end'
  },

  // Device screen styles
  deviceHeaderStyles: {
    height: 130,
    backgroundColor: '#57C155',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 10
    
  },
  deviceHeaderTitle: {
    color: 'white',
    fontSize: 30,
    flex: 4,
    justifyContent: 'flex-end',
  },
  deviceHeaderWarning: {
    flex: 1,
    justifyContent: 'center',
  }
})


export default App;