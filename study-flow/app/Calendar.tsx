import { useRouter } from "expo-router";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { StyleSheet, View } from "react-native";

const Calendar = () => {
  const router = useRouter();

  return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events = {[
          { title: 'Teste C', start: '2025-05-16'},
        ]}

        headerToolbar={{
          right: 'dayGridWeek, dayGridMonth, dayGridDay',
          center: 'title',
          left: 'prev,next today'
        }}
        // fix the vertical height so it doesn’t collapse
        height={500}
        // optional: controls width/height ratio instead of explicit height
        // aspectRatio={1.35}
      />
  );
};

Calendar.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  calendarWrapper: {
    // could be a number of px, or percentages, or even rem
    width: 350,
    height: 500,           // match FullCalendar’s height so no overflow
    alignSelf: "center",   // center it horizontally
  },
});

export default Calendar;
