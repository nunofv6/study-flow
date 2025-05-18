import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';

export default function CustomScheduleModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(moment().format('YYYY-MM-DD HH:mm'));
  const [end, setEnd] = useState(moment().add(1, 'hour').format('YYYY-MM-DD HH:mm'));

  const handleSave = () => {
    onSave({
      title,
      startDate: moment(start, 'YYYY-MM-DD HH:mm').toDate(),
      endDate: moment(end, 'YYYY-MM-DD HH:mm').toDate(),
    });
    setTitle('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter event title"
            style={styles.input}
          />

          <Text style={styles.label}>Start Time</Text>
          <TextInput
            value={start}
            onChangeText={setStart}
            placeholder="YYYY-MM-DD HH:mm"
            style={styles.input}
          />

          <Text style={styles.label}>End Time</Text>
          <TextInput
            value={end}
            onChangeText={setEnd}
            placeholder="YYYY-MM-DD HH:mm"
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#999' }]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    elevation: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});