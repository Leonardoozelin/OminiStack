import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, AsyncStorage, Platform, Image, StyleSheet, ScrollView, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(()=>{ 
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.10.5:3333', {
                query: { user_id }
            });

            socketio.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`);
            })
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                { techs.map(tech => <SpotList key={tech} tech={tech} />) }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    }
}) 