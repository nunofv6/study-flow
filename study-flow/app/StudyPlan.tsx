import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AddCourses() {
  const [courses, setCourses] = useState<string[]>([]);
  const [newCourse, setNewCourse] = useState('');
  const [freeTime, setFreeTime] = useState<{ [key: string]: { morning: boolean; afternoon: boolean } }>(
    Object.fromEntries(daysOfWeek.map(day => [day, { morning: false, afternoon: false }]))
  );

  const router = useRouter();

  const toggleSlot = (day: string, slot: 'morning' | 'afternoon') => {
    setFreeTime(prev => ({
      ...prev,
      [day]: { ...prev[day], [slot]: !prev[day][slot] },
    }));
  };

  const addCourse = () => {
    if (newCourse.trim()) {
      setCourses([...courses, newCourse.trim()]);
      setNewCourse('');
    }
  };

  const handleNext = () => {
    router.push({
      pathname: '/GeneratedPlan',
      params: {
        data: JSON.stringify({ courses, freeTime }),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Courses</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Course name"
          style={styles.input}
          value={newCourse}
          onChangeText={setNewCourse}
        />
        <Button title="Add" onPress={addCourse} />
      </View>

      {courses.map((course, index) => (
        <Text key={index} style={styles.courseItem}>{course}</Text>
      ))}

      <Text style={styles.heading}>Select Free Time</Text>
      {daysOfWeek.map(day => (
        <View key={day} style={styles.dayRow}>
          <Text style={styles.dayText}>{day}</Text>
          <TouchableOpacity
            style={[styles.slot, freeTime[day].morning && styles.selectedSlot]}
            onPress={() => toggleSlot(day, 'morning')}
          >
            <Text>Morning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.slot, freeTime[day].afternoon && styles.selectedSlot]}
            onPress={() => toggleSlot(day, 'afternoon')}
          >
            <Text>Afternoon</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Generate Plan" onPress={handleNext} disabled={courses.length === 0} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginRight: 10, borderRadius: 5 },
  courseItem: { backgroundColor: '#eee', padding: 8, borderRadius: 5, marginBottom: 5 },
  dayRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  dayText: { width: 40 },
  slot: { padding: 8, marginHorizontal: 5, borderWidth: 1, borderColor: '#007AFF', borderRadius: 5 },
  selectedSlot: { backgroundColor: '#007AFF', borderColor: '#005BB5', color: 'white' },
});