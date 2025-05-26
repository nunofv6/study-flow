import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Dias abreviados para caber melhor
  datasets: [
    {
      data: [2, 3, 4, 1, 5, 2, 0], // Exemplo de horas estudadas por dia
      color: (opacity = 1) => `#d9b4b5`, // Cor da linha (rosa do design)
      strokeWidth: 3,
    },
  ],
  legend: ["Study Hours (hours/day)"], // Legenda personalizada
};

const chartConfig = {
  backgroundGradientFrom: "#f5e4e5",
  backgroundGradientTo: "#f5e4e5",
  decimalPlaces: 0,
  color: (opacity = 1) => `#d9b4b5`, // Cor dos números e eixos
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor dos labels do eixo X
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#d9b4b5",
  },
  style: {
    borderRadius: 16,
  },
};

const StudyOverview = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [granularity, setGranularity] = useState("days");
  const [showTimeOptions, setShowTimeOptions] = useState(false);

  const getChartData = () => {
    switch (granularity) {
      case "weeks":
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              data: [10, 15, 8, 12],
              color: (opacity = 1) => `#d9b4b5`,
              strokeWidth: 3,
            },
          ],
          legend: ["Study Hours (hours/week)"],
        };
      case "months":
        return {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: [120,80, 70, 80, 90, 120, 70, 0, 0, 20, 70, 90], // Adjusted data for realistic student patterns
              color: (opacity = 1) => `#d9b4b5`,
              strokeWidth: 3,
            },
          ],
          legend: ["Study Hours (hours/month)"],
        };
      default:
        return chartData;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowTimeOptions(!showTimeOptions)}
      >
        <Text style={styles.toggleButtonText}>{showTimeOptions ? "Hide Options" : "Show Time Options"}</Text>
      </TouchableOpacity>

      {/* Granularity Buttons */}
      {showTimeOptions && (
        <View style={styles.granularityButtons}>
          <TouchableOpacity
            style={[styles.granularityButton, granularity === "days" && styles.activeButton]}
            onPress={() => setGranularity("days")}
          >
            <Text style={styles.granularityButtonText}>Days</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.granularityButton, granularity === "weeks" && styles.activeButton]}
            onPress={() => setGranularity("weeks")}
          >
            <Text style={styles.granularityButtonText}>Weeks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.granularityButton, granularity === "months" && styles.activeButton]}
            onPress={() => setGranularity("months")}
          >
            <Text style={styles.granularityButtonText}>Months</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Chart Section */}
      <View style={styles.content}>
        <LineChart
          data={getChartData()}
          width={screenWidth - 32}
          height={300}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9b4b5", // Darker pink
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  chart: {
    borderRadius: 16,
  },
  granularityButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  granularityButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#d9b4b5",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#d9b4b5",
  },
  granularityButtonText: {
    color: "#000",
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#d9b4b5",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  toggleButtonText: {
    color: "#000",
  },
});

export default StudyOverview;