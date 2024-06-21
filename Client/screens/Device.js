import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chart from '../components/Chart.js';
import GlanceView from '../components/GlanceView.js';
import { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { io } from 'socket.io-client';
import { Button } from 'react-native-elements';



const socket = io.connect("http://18.142.53.80:3000/");


const DeviceScreen = ({ navigation }) => {


    const DeviceHeader = ({ data }) => {
        return (
            <View>
            {isLoading ? (<View style={{
                height: 130,
                backgroundColor: "#57C155",
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                paddingBottom: 10
            }}>
                <View style={styles.deviceHeaderTitle}><Text style={{ fontSize: 30, color: 'white', fontWeight: '600' }}>Your HazGuard</Text></View>
                <View style={styles.deviceHeaderWarning}><Text style={{ fontWeight: '500' }}>Loading Data</Text></View>
            </View>) : (<View style={{
                height: 130,
                backgroundColor: data.temp[4] > 40 || data.co[4] > 20 || data.flame[4] > 20000 || !dcdata.connected > 20000 ? "#FF0000" : "#57C155",
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                paddingBottom: 10
            }}>
                <View style={styles.deviceHeaderTitle}><Text style={{ fontSize: 30, color: 'white', fontWeight: '600' }}>Your HazGuard</Text></View>
                <View style={styles.deviceHeaderWarning}><Text style={{ fontWeight: '500' }}>{data.temp[4] > 40 ? 'High Temperature Risk' : data.co[4] > 20 ? 'We Detected Smoke. Please Check!' : data.flame[4] > 50000 ? 'Flammable Gas In The Area. Be Careful!' : 'Hazguard Is Working Fine'}</Text></View>
            </View>)}
            </View>
            
        )
    }

    // const [header, changeHeader] = useState(route.params.header);

    const [chartParentWidth, setChartParentWidth] = useState(0);
    const [data, setData] = useState([]);
    const [flame_data, setFlame] = useState([]);
    const [dcdata, setDCData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            header: () => <DeviceHeader data={data} />,
        });
    }, [navigation, data]);

    const sendMessage = () => {
        socket.emit("client", { alarm: 1 })
    }

    useEffect(() => {
        socket.on('message', (payload) => {
            setData(payload)
            setIsLoading(false);
            //   console.log(payload)
        })
    }, [])

    useEffect(() => {
        socket.on('hazdc', (payload) => {
            setDCData(payload);
            setFlame([...Array(40)].map(e=>~~(Math.random()*40)))
            setIsLoading(false);
              console.log(payload)
        })
    }, [])  


    return (
        <View style={styles.device} >
            {isLoading ? (
                <ActivityIndicator size="large" color="#57C155" />
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer}>

                    <View style={styles.th}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 11 }}>Temperature</Text>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 38,
                                    fontWeight: '400'
                                }}>{data.temp[4]}</Text>
                                <Text style={{ fontSize: 12, lineHeight: 25, fontWeight: '800', color: 'white' }}>o</Text><Text style={{ fontSize: 38, fontWeight: '400', color: 'white' }}>C</Text>
                            </View>

                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#606060', alignSelf: 'stretch', borderRadius: 10, marginVertical: 10 }}></View>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ color: 'white', fontSize: 11 }}>Humidity</Text>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 38,
                                    fontWeight: '400'
                                }}>{data.humd[4]}</Text><Text style={{
                                    color: 'white',
                                    fontSize: 38,
                                    fontWeight: '400'
                                }}>%</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Button
                            title="Alarm"
                            buttonStyle={{
                                backgroundColor: '#2089DC',
                                borderWidth: 0,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                width: 150,
                                marginVertical: 25,
                                alignSelf: 'center'
                            }}
                            icon={{
                                name: 'bell',
                                type: 'font-awesome',
                                size: 20,
                                color: 'white',
                            }}
                            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                            onPress={sendMessage}
                        />
                    </View>

                    <GlanceView data={data} />


                    <View>
                        <Chart width={chartParentWidth} data={data.temp} title={"Temperature"} max={45} min={25} />
                        <Chart width={chartParentWidth} data={data.humd} title={"Humidity"} max={100} min={30} />
                        <Chart width={chartParentWidth} data={data.co} title={"CO"} max={80} min={0} />
                        <Chart width={chartParentWidth} data={[1208.123,1320.656,1232.134,1423.243,1332.213]} title={"Flammable"} max={150} min={0} />
                    </View>

                </ScrollView>
            )}
        </View>
    );
}
// ADD SCROLLVIEW
const styles = StyleSheet.create({
    device: {
        backgroundColor: '#262626',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        paddingTop: 160,
        // paddingRight: 20,
    },


    contentContainer: {


    },

    th: {
        backgroundColor: '#323232',
        paddingVertical: 10,
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },

    button: {
        paddingVertical: 20,
        borderRadius: 30,
        height: 130
    },

    deviceHeaderStyles: {


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

export default DeviceScreen;