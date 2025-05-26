import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("Nome");
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  const handleSaveName = () => {
    setName(newName);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/Avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image
              source={require('../assets/images/Edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('Productivity')}
        >
          <Text style={styles.buttonText}>Productivity</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('StudyOverview')}
        >
          <Text style={styles.buttonText}>Study Overview</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select New Name</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new name"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { marginRight: 8 }]}
                onPress={handleSaveName}
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

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Logout pressed')}
        >
          <Text style={styles.buttonText}>Logout</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100, // espaço para os botões fixos
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2dbff',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  editIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  buttonSection: {
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Fixed bottom buttons
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    borderTopColor: '#ccc',
  },
});

export default Profile;