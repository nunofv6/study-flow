import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import FullCalendar, {
  DateClickArg,
  DayCellMountArg,
  EventInput as FCEventInput,
  EventApi
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import './styles/calendar.css';

interface EventInput extends FCEventInput {
  id: number;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  backgroundColor?: string;
  extendedProps?: {
    location?: string;
    tags?: string[];
    description?: string;
  };
}

interface NewEventData {
  title: string;
  start: string;     
  end: string;       
  allDay: boolean;
  startTime: string; 
  endTime: string;   
  priority: 'low' | 'medium' | 'high';
  location: string;
  tags: string;      
  description: string;
}

const PRIORITY_COLORS: Record<NewEventData['priority'], string> = {
  low:    '#28a745',
  medium: '#ffc107',
  high:   '#dc3545',
};

const Calendar: React.FC = () => {
  const router = useRouter();

  const [events, setEvents] = useState<EventInput[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<NewEventData>({
    title: '',
    start: '',
    end: '',
    allDay: true,
    startTime: '09:00',
    endTime:   '17:00',
    priority: 'medium',
    location: '',
    tags: '',
    description: ''
  });

  const openModalForDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm   = String(date.getMonth()+1).padStart(2,'0');
    const dd   = String(date.getDate()).padStart(2,'0');
    const iso  = `${yyyy}-${mm}-${dd}`;

    setForm({
      title: '',
      start: iso,
      end:   iso,
      allDay: true,
      startTime: '09:00',
      endTime:   '17:00',
      priority: 'medium',
      location: '',
      tags: '',
      description: ''
    });
    setModalOpen(true);
  };

  const handleModalSave = () => {
    const newEvent: EventInput = {
      id: Date.now(),
      title: form.title.trim(),
      start: form.allDay
        ? form.start
        : `${form.start}T${form.startTime}`,
      end: form.allDay
        ? form.end
        : `${form.end}T${form.endTime}`,
      allDay: form.allDay,
      backgroundColor: PRIORITY_COLORS[form.priority],
      extendedProps: {
        location:    form.location.trim(),
        tags:        form.tags.split(',').map(t => t.trim()).filter(t => t),
        description: form.description.trim()
      }
    };
    setEvents(prev => [...prev, newEvent]);
    setModalOpen(false);
  };

  const handleAddClick = (date: Date) => openModalForDate(date);

  const makeTooltipContent = (event: EventApi) => {
    const { title, startStr, endStr, allDay, backgroundColor, extendedProps } = event;
    const { location, tags, description } = extendedProps as any;
    let tip = `<strong>${title}</strong><br/>
               <em>${allDay ? 'All day' : `${startStr} → ${endStr}`}</em><br/>
               <span style="color:${backgroundColor}">Priority</span><br/>`;
    if (location)    tip += `📍 ${location}<br/>`;
    if (tags?.length)tip += `🏷️ ${tags.join(', ')}<br/>`;
    if (description) tip += `<div style="margin-top:4px;">${description}</div>`;
    return tip;
  };

  return (
    <View style={styles.calendarWrapper}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          right:  'dayGridWeek,dayGridMonth,dayGridDay',
          center: 'title',
          left:   'prev,next today'
        }}
        height={500}
        displayEventTime={false}   

        dateClick={(info: DateClickArg) => {
          if ((info.jsEvent.target as HTMLElement).classList.contains('fc-add-btn')) return;
          handleAddClick(info.date);
        }}
        dayCellDidMount={(info: DayCellMountArg) => {
          const btn = document.createElement('button');
          btn.className = 'fc-add-btn';
          btn.innerText = '+';

          const today = new Date(); today.setHours(0,0,0,0);
          if (info.date < today) {
            btn.disabled = true;
          } else {
            btn.onclick = e => {
              e.stopPropagation();
              handleAddClick(info.date);
            };
          }

          info.el.querySelector('.fc-daygrid-day-top')?.appendChild(btn);
        }}
        eventDidMount={arg => {
          tippy(arg.el, {
            content: makeTooltipContent(arg.event),
            allowHTML: true,
            theme: 'light-border',
            placement: 'top'
          });
        }}
      />

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>New Event</h2>

            <label>
              Title
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </label>

            <label>
              Start Date
              <input
                type="date"
                value={form.start}
                onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
              />
            </label>

            <label>
              End Date
              <input
                type="date"
                value={form.end}
                onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
              />
            </label>

            <label>
              Time &amp; All Day
              <div className="time-group">
                <input
                  type="time"
                  value={form.startTime}
                  disabled={form.allDay}
                  onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}
                />
                <span>to</span>
                <input
                  type="time"
                  value={form.endTime}
                  disabled={form.allDay}
                  onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))}
                />
                <label className="all-day-label">
                  <input
                    type="checkbox"
                    checked={form.allDay}
                    onChange={e => setForm(f => ({ ...f, allDay: e.target.checked }))}
                  />
                  All Day
                </label>
              </div>
            </label>

            <label>
              Priority
              <select
                value={form.priority}
                onChange={e => setForm(f => ({ ...f, priority: e.target.value as any }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label>
              Location
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              />
            </label>

            <label>
              Tags (comma-separated)
              <input
                type="text"
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              />
            </label>

            <label>
              Description / Notes
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </label>

            <div className="modal-buttons">
              <button
                onClick={handleModalSave}
                disabled={!form.title.trim()}
              >
                Save
              </button>
              <button onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </View>
  );
};

Calendar.options = { headerShown: false };

const styles = StyleSheet.create({
  calendarWrapper: {
    width: 700,
    height: 500,
    alignSelf: 'center',
  },
});

export default Calendar;
