import { useRouter } from "expo-router";
import React from "react";
import { useLayoutEffect, useState } from 'react';
import moment from "moment"
import { StyleSheet, Text, View, Button, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

const Schedule = () => {
  return(
    <ScrollView contentContainerStyle={styles.container}>
        <Text>Schedule</Text>
        <FullCalendar
          plugins={[ timeGridPlugin ]}
          initialView="timeGridPlugin"
        />
        <View>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5e4e5', // Light pink background
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#d9b4b5', // Darker pink
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    icon: {
      width: 24,
      height: 24,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      alignItems: 'center',
      width: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    cardIcon: {
      width: 48,
      height: 48,
      marginBottom: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      textAlign: 'center',
      color: '#555',
      marginBottom: 12,
    },
    addButton: {
      backgroundColor: '#000',
      borderRadius: 50,
      paddingVertical: 6,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 26,
      color: '#fff',
      fontWeight: 'bold',
    },
    cardTime: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
});

export default Schedule;