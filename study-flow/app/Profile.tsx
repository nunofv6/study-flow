import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";

const Profile = () => {
    const router = useRouter();


  return (
    <View style={styles.container}>
      {/* Top Bar */}
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/Menu.png')} // Substitua pelo caminho da sua imagem
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity onPress={() => router.push('/profile')}>
                <Image
                  source={require('../assets/images/User.png')} // Substitua pelo caminho da sua imagem
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

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
          onPress={() => router.push('productivity')}
        >
          <Text style={styles.buttonText}>Productivity</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('studyOverview')}
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