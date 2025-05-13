import React from "react";
import { View, Text } from "react-native";

type Props = {
    style: any;
    item: any;
    daysTotal: number;
    dayIndex?: number;
};

export default function ScheduleBlobs({ style, item, dayIndex, daysTotal }: Props) {
  return (
    <View style={{ ...style, backgroundColor: 'green', borderRadius: 10, elevation: 5 }}>
      <Text>{item.title}</Text>
      {dayIndex !== undefined && <Text>{dayIndex + 1} of {daysTotal}</Text>}
    </View>
  );
}