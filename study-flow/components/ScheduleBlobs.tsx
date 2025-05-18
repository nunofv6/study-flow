import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";

type Props = {
  style: any;
  item: {
    title: string;
    startDate: Date;
    endDate: Date;
  };
  daysTotal: number;
  dayIndex?: number;
};

export default function ScheduleBlobs({ style, item, dayIndex, daysTotal }: Props) {
  const startTime = moment(item.startDate).format("HH:mm");
  const endTime = moment(item.endDate).format("HH:mm");

  return (
    <View style={{
      ...style,
      backgroundColor: '#4CAF50',
      borderRadius: 12,
      padding: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      justifyContent: 'center'
    }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>{item.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
        <Ionicons name="time-outline" size={14} color="#fff" style={{ marginRight: 4 }} />
        <Text style={{ color: '#fff', fontSize: 12 }}>{startTime} - {endTime}</Text>
      </View>
    </View>
  );
}