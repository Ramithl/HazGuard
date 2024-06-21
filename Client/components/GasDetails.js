import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

const GasDetails = (props) => {
    return (
        <View style={styles.row} >
            <Text style={styles.gasname}>{props.gas}</Text>
            <Text style={styles.ppm}>{props.ppm}</Text><Text style={{
                color: '#A0A0A0',
                marginLeft: 5,
                textAlign: 'right',
                fontSize: 11,
                fontWeight: '600'
            }}>ppm</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: '#323232',
        flex: 1,
        marginVertical: 16,
        flexDirection: 'row',
        // alignItems: 'center',
        marginHorizontal: 10,
        borderColor: '#6A6A6A',
        borderBottomWidth: 1

    },

    gasname: {
        color: 'white',
        alignSelf: 'flex-start',
        fontWeight: '600',
        flex: 3
    },
    ppm: {
        color: '#A0A0A0',
        flex: 1,
        textAlign: 'right',
        fontSize: 11,
        fontWeight: '600'
    }
})


export default GasDetails;