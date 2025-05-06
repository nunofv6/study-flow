import { useRouter } from "expo-router";

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Dashboard = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        {/* First Card */}
        <View style={styles.card}>
          <Image
            source={require('../assets/images/Livros.png')} // Substitua pelo caminho da sua imagem
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>Still don’t have a plan?</Text>
          <Text style={styles.cardSubtitle}>Let us create your first study plan!</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/Schedule')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Second Card */}
        <View style={styles.card}>
          <Image
            source={require('../assets/images/Clock.png')} // Substitua pelo caminho da sua imagem
            style={styles.cardIcon}
          />
          <Text style={styles.cardTime}>2h</Text>
          <Text style={styles.cardSubtitle}>You still have free time!</Text>
        </View>
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

export default Dashboard;