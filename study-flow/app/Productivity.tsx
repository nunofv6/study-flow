import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, TextInput } from "react-native";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newChartName, setNewChartName] = useState("");
  const [editingChart, setEditingChart] = useState(null);

  const handleSaveChartName = () => {
    if (editingChart === "lastSession") {
      setLastSessionChartName(newChartName);
    } else if (editingChart === "allTime") {
      setAllTimeChartName(newChartName);
    }
    setIsModalVisible(false);
    setNewChartName("");
    setEditingChart(null);
  };

  const [lastSessionChartName, setLastSessionChartName] = useState("Last studying session");
  const [allTimeChartName, setAllTimeChartName] = useState("All time");

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
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{lastSessionChartName}:</Text>
            <TouchableOpacity
              onPress={() => {
                setEditingChart("lastSession");
                setIsModalVisible(true);
              }}
            >
              <Image
                source={require('../assets/images/Edit.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
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
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{allTimeChartName}:</Text>
            <TouchableOpacity
              onPress={() => {
                setEditingChart("allTime");
                setIsModalVisible(true);
              }}
            >
              <Image
                source={require('../assets/images/Edit.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
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

      {/* Modal for editing chart names */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Chart Name</Text>
            <TextInput
              style={styles.input}
              value={newChartName}
              onChangeText={setNewChartName}
              placeholder="Enter new chart name"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { marginRight: 8 }]}
                onPress={handleSaveChartName}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#d9b4b5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StudyStatistics;