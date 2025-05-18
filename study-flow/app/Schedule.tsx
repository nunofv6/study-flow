import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Button, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timetable from 'react-native-calendar-timetable'
import moment from "moment"
import ScheduleBlobs from '@/components/ScheduleBlobs';
import CustomScheduleModal from '@/components/CustomScheduleModal';

export default function Schedule() {
  const [date, setDate] = useState(new Date());
  const [itemsByDate, setItemsByDate] = useState<{
    [key: string]: {
      title: string;
      startDate: Date;
      endDate: Date;
    }[];
  }>({
    [moment().format('YYYY-MM-DD')]: [
      {
        title: 'Teste de CD',
        startDate: moment().subtract(1, 'hour').toDate(),
        endDate: moment().add(1, 'hour').toDate(),
      },
    ],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(moment().format("YYYY-MM-DDTHH:mm"));
  const [end, setEnd] = useState(moment().add(1, 'hour').format("YYYY-MM-DDTHH:mm"));

  const selectedDateKey = moment(date).format('YYYY-MM-DD');
  const items = itemsByDate[selectedDateKey] || [];

  const handleSaveEvent = (event) => {
    const key = moment(event.startDate).format('YYYY-MM-DD');
    setItemsByDate(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), event],
    }));
  };

  const handleDayChange = (offset: number) => {
    setDate(prev => moment(prev).add(offset, 'day').toDate());
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.weekdayBar}>
        {Array.from({ length: 7 }).map((_, i) => {
          const d = moment().startOf('week').add(i + 1, 'days'); // Mon–Sun
          return (
            <TouchableOpacity key={i} onPress={() => setDate(d.toDate())}>
              <Text style={[
                styles.weekdayText,
                moment(date).isSame(d, 'day') && styles.selectedDay
              ]}>
                {d.format('ddd D')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <ScrollView style={{ flex: 1, borderWidth: 2, backgroundColor: '#f1f5f9'}}>
          <Timetable
              items={items}
              renderItem={props => <ScheduleBlobs {...props}/>}
              date={date}
          />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  weekdayBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  weekdayText: {
    fontSize: 14,
    color: '#444',
  },
  selectedDay: {
    color: '#007AFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  navButton: {
    fontSize: 22,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '600',
}});