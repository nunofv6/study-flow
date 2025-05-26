import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';
import ScheduleBlobs from '@/components/ScheduleBlobs';

const dayOffsets = {
  'Tue': 2,
  'Wed': 3,
  'Thu': 4,
};

const morningStart = 9;
const afternoonStart = 14;

const hardcodedSessions = [
  { day: 'Tue', slot: 'morning', title: 'CD' },
  { day: 'Wed', slot: 'afternoon', title: 'C' },
  { day: 'Thu', slot: 'morning', title: 'CD' },
];

function generateEventsForCurrentWeek() {
  const baseSunday = moment().startOf('week'); // Sunday

  return hardcodedSessions.map((session, index) => {
    const dayOffset = dayOffsets[session.day];
    const start = baseSunday.clone().add(dayOffset, 'days').set({
      hour: session.slot === 'morning' ? morningStart : afternoonStart,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const end = start.clone().add(2, 'hours');

    return {
      id: `${index}`,
      title: session.title,
      startDate: start.toDate(),
      endDate: end.toDate(),
    };
  });
}

export default function Schedule() {
  const [date, setDate] = useState(new Date());

  const items = generateEventsForCurrentWeek().filter(event =>
    moment(event.startDate).isSame(date, 'day')
  );

  const handleDayChange = (offset: number) => {
    setDate(prev => moment(prev).add(offset, 'day').toDate());
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.weekdayBar}>
        {Array.from({ length: 7 }).map((_, i) => {
          const d = moment().startOf('week').add(i + 1, 'days'); // Monday–Sunday
          return (
            <TouchableOpacity key={i} onPress={() => setDate(d.toDate())}>
              <Text style={[
                styles.weekdayText,
                moment(date).isSame(d, 'day') && styles.selectedDay
              ]}>
                {d.format('ddd')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
        <Timetable
          items={items}
          renderItem={props => <ScheduleBlobs {...props} />}
          date={date}
        />
      </ScrollView>
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
});