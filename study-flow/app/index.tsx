import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity } from "react-native";

export default function Index() {
  const router = useRouter();
  
  return (
      <ScrollView>
        <Text style={{ textAlign: 'center' }}>For testing purposes</Text>
        <OutlinedButton title="Go to About" onPress={() => router.push("/about")} />
        <OutlinedButton title="Go to Dashboard" onPress={() => router.push("/dashboard")} />
        <OutlinedButton title="Go to Schedule" onPress={() => router.push("/schedule")} />
        <OutlinedButton title="Go to Calendar" onPress={() => router.push("/calendar")} />
        <Text style={{ textAlign: 'center' }}>Study Flow</Text>
      </ScrollView>
  );
}

const OutlinedButton = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
