import React, { useEffect } from "react";
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

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/Menu.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Study Overview</Text>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={require("../assets/images/User.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <View style={styles.content}>
        <LineChart
          data={chartData}
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
    backgroundColor: "#f5e4e5", // Light pink background
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
});

export default StudyOverview;
