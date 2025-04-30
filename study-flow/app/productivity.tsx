import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

const StudyStatistics = () => {
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
            source={require('../assets/images/Menu.png')} // Substitua pelo caminho da sua imagem
            style={styles.icon}
        />
        </TouchableOpacity>
        <Text style={styles.title}>Productivuty</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
        <Image
            source={require('../assets/images/User.png')} // Substitua pelo caminho da sua imagem
            style={styles.icon}
        />
        </TouchableOpacity>
    </View>

      {/* Statistics Section */}
      <View style={styles.content}>
        {/* Last Studying Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last studying session:</Text>
          <Image
            source={require('../assets/images/Chart2.png')} // Substitua pelo caminho da sua imagem
            style={styles.chart}
            resizeMode="contain"
          />
        </View>

        {/* All Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All time:</Text>
          <Image
            source={require('../assets/images/Chart3.png')} // Substitua pelo caminho da sua imagem
            style={styles.chart}
            resizeMode="contain"
          />
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
  chart: {
    width: '90%',
    height: 200, // Ajuste conforme necessário para o tamanho do gráfico
  },
});

export default StudyStatistics;