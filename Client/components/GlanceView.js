import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GasDetails from './GasDetails';

const GlanceView = (props) => {
    return (
        <View>
            <Text style={styles.sectiontitle}>Gas Levels</Text>
        <View style={styles.card} >
            
            <GasDetails gas={'CO'} ppm={props.data.co[4]}/>
            <GasDetails gas={'Flammable'} ppm={1326.564}/>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#323232',
        flex: 1,
        borderRadius: 10,
        marginVertical: 20,
        flexDirection: 'column',
        // alignItems: 'center',
        paddingHorizontal: 10,
    },

    sectiontitle: {
        color: '#B0B0B0',
        paddingBottom: 0,
        paddingTop: 20,
        fontWeight: '600'
    }

})


export default GlanceView;