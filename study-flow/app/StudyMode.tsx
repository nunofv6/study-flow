// app/StudyMode.tsx
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useRouter } from 'expo-router';

export default function StudyMode() {
  const router = useRouter();

  // which modal is showing
  const [techniqueModalVisible, setTechniqueModalVisible] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible]     = useState(false);

  // track selection & duration
  const [technique, setTechnique] = useState<'pomodoro'|'custom'|null>(null);
  const [duration, setDuration]   = useState('25'); // default 25 for pomodoro
  const [activeUntil, setActiveUntil] = useState<Date|null>(null);

  // end study mode timer
  useEffect(() => {
    if (!activeUntil) return;
    const ms = activeUntil.getTime() - Date.now();
    if (ms <= 0) {
      endStudyMode();
    } else {
      const timer = setTimeout(endStudyMode, ms);
      return () => clearTimeout(timer);
    }
  }, [activeUntil]);

  const endStudyMode = () => {
    setActiveUntil(null);
    Alert.alert('Study Mode Ended', 'Notifications are now enabled again.');
  };

  // 1️⃣ Entry point: choose technique
  const onActivatePress = () => {
    setTechnique(null);
    setTechniqueModalVisible(true);
  };

  // user picks Pomodoro
  const choosePomodoro = () => {
    setTechnique('pomodoro');
    setDuration('25');
    setTechniqueModalVisible(false);
    setConfirmModalVisible(true);
  };

  // user picks Custom
  const chooseCustom = () => {
    setTechnique('custom');
    setDuration('30');
    setTechniqueModalVisible(false);
    setDurationModalVisible(true);
  };

  // 2️⃣ Custom flow: after entering minutes, show confirm
  const onDurationStart = () => {
    const mins = parseInt(duration, 10);
    if (isNaN(mins) || mins <= 0) {
      Alert.alert('Invalid Duration', 'Please enter a positive number of minutes.');
      return;
    }
    setDurationModalVisible(false);
    setConfirmModalVisible(true);
  };

  const onCancelDuration = () => {
    setDurationModalVisible(false);
    setTechniqueModalVisible(true);
  };

  // 3️⃣ Confirmation modal
  const onConfirm = () => {
    setConfirmModalVisible(false);
    const mins = parseInt(duration, 10);
    const until = new Date(Date.now() + mins * 60 * 1000);
    setActiveUntil(until);
    Alert.alert(
      'Study Mode Activated',
      technique === 'pomodoro'
        ? `Started Pomodoro: ${mins} minutes of focus.`
        : `Notifications disabled for ${mins} minute${mins>1?'s':''}.`
    );
    setTechnique(null);
  };

  const onCancelConfirm = () => {
    setConfirmModalVisible(false);
    if (technique === 'custom') {
      setDurationModalVisible(true);
    } else {
      setTechniqueModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Study Mode</Text>

      {activeUntil ? (
        <Text style={styles.activeText}>
          🛑 Active until{' '}
          {activeUntil.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      ) : (
        <Text style={styles.inactiveText}>
          📵 Notifications are enabled.
        </Text>
      )}

      <Button
        title={activeUntil ? 'Extend Study Mode' : 'Activate Study Mode'}
        onPress={onActivatePress}
      />

      {/* ── Technique Selection Modal ── */}
      <Modal
        transparent
        animationType="fade"
        visible={techniqueModalVisible}
        onRequestClose={() => setTechniqueModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Choose Study Technique</Text>
            <View style={styles.modalButtonsColumn}>
              <Button title="Pomodoro" onPress={choosePomodoro} />
              <View style={styles.spacer} />
              <Button title="Custom Time" onPress={chooseCustom} />
              <View style={styles.spacer} />
              <Button title="Cancel" color="#BB0000" onPress={() => setTechniqueModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Duration Modal ── */}
      <Modal
        transparent
        animationType="slide"
        visible={durationModalVisible}
        onRequestClose={onCancelDuration}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Set Study Duration</Text>
            <Text style={styles.modalText}>
              How many minutes would you like to block notifications?
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
              placeholder="Number of hours"
            />
            <View style={styles.modalButtons}>
              <Button title="Back" onPress={onCancelDuration} />
              <Button title="Next" onPress={onDurationStart} />
            </View>
          </View>
        </View>
      </Modal>

      {/* ── Confirmation Modal ── */}
      <Modal
        transparent
        animationType="fade"
        visible={confirmModalVisible}
        onRequestClose={onCancelConfirm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {technique === 'pomodoro'
                ? 'Start Pomodoro?'
                : 'Confirm Study Mode'}
            </Text>
            <Text style={styles.modalText}>
              {technique === 'pomodoro'
                ? 'All your notifications will be disabled for 25 minutes followed by a 5 minute break.'
                : 'All your notifications will be disabled so you can focus on your study!'}
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" color="#BB0000" onPress={() => setTechniqueModalVisible(false)} />
              <Button title="Confirm" onPress={onConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

StudyMode.options = {
  headerShown: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  inactiveText: {
    fontSize: 16,
    marginBottom: 12,
  },
  activeText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#d9534f',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonsColumn: {
    flexDirection: 'column',
  },
  spacer: { height: 12 },
});
