import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('Profile')}> {/* Replace with navigation logic */}
            <Image
              source={require("../assets/images/User.png")}
              style={{ width: 24, height: 24, marginRight: 16 }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
