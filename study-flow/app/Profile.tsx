import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

const Profile = () => {
    const router = useRouter();
      const navigation = useNavigation();
      useEffect(() => {
        navigation.setOptions({
          headerShown: true,
        });
      }, [navigation]);
    


  return (
    <View style={styles.container}>
   

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/Avatar.png')} // Substitua pelo caminho da imagem do avatar
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Nome</Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/Edit.png')} // Substitua pelo caminho da sua imagem
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
  profileSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2dbff', // Purple background for avatar
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
});

export default Profile;