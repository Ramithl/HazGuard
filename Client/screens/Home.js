import * as React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import DeviceCard from '../components/DeviceCard';
import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
    return (
       <View style={{backgroundColor: '#262626', flex: 1}}>

       
        <View style={styles.home}>
            <DeviceCard style={styles.deciveCard} />
            <DeviceCard style={styles.deciveCard} />
            
            
            <StatusBar backgroundColor={'#262626'} style="auto" />
            
        </View>
        <Button
                            title="Add New Device"
                            buttonStyle={{
                                backgroundColor: '#2089DC',
                                borderWidth: 0,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                width: 250,
                                marginVertical: 25,
                                alignSelf: 'center'
                            }}
                            icon={{
                                name: 'plus',
                                type: 'font-awesome',
                                size: 20,
                                color: 'white',
                            }}
                            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                            onPress={()=>{navigation.navigate('QRCode')}}
                           
                        />
        </View>
       
        
        
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#262626',
        flexDirection: 'row',
        flexWrap: 'wrap'
        
    },
    deciveCard: {
        flex: 1
    },
    btn: {
        // flex: 1,
       
    }
})

export default HomeScreen;