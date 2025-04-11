import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const AddGoalModal = ({ visible, onDismiss, onSubmit }) => {
  const [goalName, setGoalName] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingDate, setSelectingDate] = useState('start'); // 'start' or 'end'

  const handleSubmit = () => {
    if (!goalName || !amount || !startDate || !endDate) return;

    onSubmit({
      name: goalName,
      icon: 'airplane', // Default icon, you can modify this based on goal name
      color: '#FFD93D', // Default color
      amount: parseFloat(amount),
      startDate,
      endDate,
    });

    // Reset form
    setGoalName('');
    setAmount('');
    setStartDate(null);
    setEndDate(null);
    onDismiss();
  };

  const handleDateSelect = (date) => {
    if (selectingDate === 'start') {
      setStartDate(date.dateString);
    } else {
      setEndDate(date.dateString);
    }
    setShowCalendar(false);
  };

  if (showCalendar) {
    return (
      <Portal>
        <Modal visible={true} onDismiss={() => setShowCalendar(false)} contentContainerStyle={styles.calendarModal}>
          <Calendar
            onDayPress={handleDateSelect}
            minDate={new Date().toISOString().split('T')[0]}
            markedDates={{
              [startDate || '']: { selected: true, selectedColor: '#6200ee' },
              [endDate || '']: { selected: true, selectedColor: '#6200ee' }
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#666',
              selectedDayBackgroundColor: '#6200ee',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#6200ee',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#6200ee',
              selectedDotColor: '#ffffff',
              arrowColor: '#6200ee',
              monthTextColor: '#2d4150',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14
            }}
          />
        </Modal>
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Goal</Text>
          <TouchableOpacity onPress={onDismiss}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Goal Name</Text>
            <TextInput
              value={goalName}
              onChangeText={setGoalName}
              style={styles.input}
              placeholder="Enter goal name"
              mode="flat"
              underlineColor="transparent"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Target Amount</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter amount"
              mode="flat"
              underlineColor="transparent"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setSelectingDate('start');
                setShowCalendar(true);
              }}
            >
              <MaterialCommunityIcons name="calendar" size={24} color="#666" />
              <Text style={styles.dateText}>
                {startDate || 'Select start date'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setSelectingDate('end');
                setShowCalendar(true);
              }}
            >
              <MaterialCommunityIcons name="calendar" size={24} color="#666" />
              <Text style={styles.dateText}>
                {endDate || 'Select end date'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Add Goal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  calendarModal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    height: 50,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    gap: 10,
  },
  dateText: {
    color: '#666',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6200ee',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddGoalModal; 