import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const pieDataLastSession = [
  {
    name: "Study Time",
    population: 70,
    color: "#d9b4b5",
    legendFontColor: "#222",
    legendFontSize: 14,
  },
  {
    name: "Procrastination Time",
    population: 30,
    color: "#f5e4e7",
    legendFontColor: "#222",
    legendFontSize: 14,
  },
];

const pieDataAllTime = [
  {
    name: "Study Time",
    population: 60,
    color: "#d9b4b5",
    legendFontColor: "#222",
    legendFontSize: 14,
  },
  {
    name: "Procrastination Time",
    population: 40,
    color: "#f5e4e5",
    legendFontColor: "#222",
    legendFontSize: 14,
  },
];

const StudyStatistics = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
 
      {/* Statistics Section */}
      <View style={styles.content}>
        {/* Last Studying Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last studying session:</Text>
          <PieChart
            data={pieDataLastSession}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
            absolute
          />
        </View>

        {/* All Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All time:</Text>
          <PieChart
            data={pieDataAllTime}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
            absolute
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d9b4b5',
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
});

export default StudyStatistics;
