import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';



const chartConfig = {
    backgroundGradientFrom: "#053353",
    backgroundGradientTo: "#055B98",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: true // optional
};


const Chart = (props) => {

    const ChartData = {
        // labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: props.data
            },
            {
                data: new Array(props.data.length).fill(props.min),
                color: () => 'transparent',
                strokeWidth: 0,
                withDots: false,
                withShadows: false

            },
            {
                data: new Array(props.data.length).fill(props.max),
                color: () => 'transparent',
                strokeWidth: 0,
                withDots: false,
                withShadows: false
            }
        ]
    }

    // const ChartData = {
    //     // labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //         {
    //             data: [35,33,37,40,39,29,28,30,34]
    //         },
    //         { data: [props.max, props.min], color: () => 'transparent', strokeWidth: 0, withDots: true, }
    //     ]
    // }

    return (
        <View>
            <Text style={styles.charttitle}>{props.title}</Text>
            <LineChart
                data={ChartData}
                width={Dimensions.get("window").width - 40} // from react-native
                height={250}
                // yAxisLabel="@"
                // yAxisSuffix="k"
                // yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    // margin: 20,
                    borderRadius: 10
                }}
                withVerticalLines={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    charttitle: {
        color: '#B0B0B0',
        paddingBottom: 10,
        paddingTop: 20,
        // fontSize: 16
        fontWeight: '600'
    }
})

export default Chart;