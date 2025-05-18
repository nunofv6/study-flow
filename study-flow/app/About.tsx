import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,  } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

export default function AboutScreen() {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [start, setStart] = useState(new Date());

  return (
    <View>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={(date) => {
          setStart(date);
          setPickerVisible(false);
        }}
        onCancel={() => setPickerVisible(false)}
      />

      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <Text>{moment(start).format("MMM D, h:mm A")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
