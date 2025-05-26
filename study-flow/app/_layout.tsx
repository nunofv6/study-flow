import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="Index" options={{ title: 'Home' }} />
      <Drawer.Screen name="Dashboard" options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="Schedule" options={{ title: 'Schedule' }} />
      <Drawer.Screen name="Calendar" options={{ title: 'Calendar' }} />
      <Drawer.Screen name="StudyPlan" options={{ title: 'Study Plan' }} />
      <Drawer.Screen name="Profile" options={{ title: 'Profile' }} />
      <Drawer.Screen name="Productivity" options={{ title: 'Productivity' }} />
      <Drawer.Screen name="StudyOverview" options={{ title: 'Study Overview' }} />
      <Drawer.Screen name="About" options={{ title: 'About' }} />
    </Drawer>
  )
}
