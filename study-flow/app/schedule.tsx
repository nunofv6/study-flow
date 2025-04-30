import { useRouter } from "expo-router";
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity } from "react-native";

const Schedule = () => {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Schedule</Text>
            <View>
            </View>
        </ScrollView>
    );
}

Schedule.options = {
    headerShown: false
  };

const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 60,
      backgroundColor: "#F8F9FA",
    },
    header: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    cardGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    card: {
      width: "48%",
      height: 100,
      backgroundColor: "#fff",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
    },
    cardText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
    },
});

export default Schedule;