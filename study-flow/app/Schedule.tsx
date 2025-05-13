import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Modal } from 'react-native';
import Timetable from 'react-native-calendar-timetable'
import moment from "moment"
import ScheduleBlobs from '@/components/ScheduleBlobs';

export default function Schedule() {
  const [date] = React.useState(new Date());
  const [items, setItems] = useState([
    {
      title: 'Teste de CD',
      startDate: moment().subtract(1, 'hour').toDate(),
      endDate: moment().add(1, 'hour').toDate(),
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(moment().format("YYYY-MM-DDTHH:mm"));
  const [end, setEnd] = useState(moment().add(1, 'hour').format("YYYY-MM-DDTHH:mm"));

  const handleAddEvent = () => {
    setItems(prev => [
      ...prev,
      {
        title,
        startDate: moment(start, "YYYY-MM-DDTHH:mm").toDate(),
        endDate: moment(end, "YYYY-MM-DDTHH:mm").toDate(),
      }
    ]);
    setModalVisible(false);
    setTitle("");
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Add Event" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ padding: 20 }}>
          <Text>Title</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Event title" />
          <Text>Start (ISO)</Text>
          <TextInput value={start} onChangeText={setStart} placeholder="YYYY-MM-DDTHH:mm:ss" />
          <Text>End (ISO)</Text>
          <TextInput value={end} onChangeText={setEnd} placeholder="YYYY-MM-DDTHH:mm:ss" />
          <Button title="Save Event" onPress={handleAddEvent} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      
      <ScrollView style={{ flex: 1, borderWidth: 2, borderColor: 'red' }}>
          <Timetable
              items={items}
              renderItem={props => <ScheduleBlobs {...props}/>}
              date={date}
          />
      </ScrollView>
    </View>
  );
}