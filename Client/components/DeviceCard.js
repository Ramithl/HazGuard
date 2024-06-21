import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const DeviceCard = (props) => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('Device')}}>
            <Text style={styles.deviceTitle}>Your HazGuard</Text>
            <View style={styles.glanceview}>
                <Text style={styles.glancetext}>78%</Text>
                <Text style={styles.glancetext}>35C</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#57C155',
        height: 120,
        flex: 1,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'column',
        // alignItems: 'center',
        paddingHorizontal: 10
    },

    deviceTitle: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 15,
        fontWeight: '400'
    },

    glanceview: {
        flex: 1,
        flexDirection: 'row',
        // alignSelf: 'center',
        justifyContent: 'space-around'
    },

    glancetext: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'flex-end',
        marginBottom: 15,
        fontWeight: '700'
    },

})


export default DeviceCard;