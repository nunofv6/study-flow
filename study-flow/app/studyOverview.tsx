import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

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
                  {/* Top Bar */}
                  <View style={styles.topBar}>
                    <TouchableOpacity>
                      <Image
                        source={require('../assets/images/Menu.png')} // Substitua pelo caminho da sua imagem
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.title}>Study Overview</Text>
                    <TouchableOpacity onPress={() => router.push('/profile')}>
                      <Image
                        source={require('../assets/images/User.png')} // Substitua pelo caminho da sua imagem
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
      

      {/* Chart Section */}
      <View style={styles.content}>
        <Image
          source={require('../assets/images/Chart1.png')} // Substitua pelo caminho da sua imagem do gráfico
          style={styles.chart}
          resizeMode="contain"
        />
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
  chart: {
    width: '100%',
    height: 400, // Ajuste conforme necessário para o tamanho do gráfico
  },
});

export default StudyOverview;