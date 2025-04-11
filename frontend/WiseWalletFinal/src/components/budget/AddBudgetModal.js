import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const BUDGET_CATEGORIES = [
  { id: 1, name: 'Transport', icon: 'train-car', color: '#9B51E0' },
  { id: 2, name: 'Restaurant', icon: 'silverware', color: '#4A90E2' },
  { id: 3, name: 'Cloth', icon: 'hanger', color: '#27AE60' },
  { id: 4, name: 'Grocery', icon: 'cart', color: '#219653' },
  { id: 5, name: 'Medication', icon: 'medical-bag', color: '#2F80ED' },
  { id: 6, name: 'Bill', icon: 'file-document', color: '#F2994A' },
  { id: 7, name: 'Beauty', icon: 'lipstick', color: '#EB5757' },
  { id: 8, name: 'Entertainment', icon: 'gamepad-variant', color: '#6FCF97' },
];

const AddBudgetModal = ({ visible, onDismiss, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingDate, setSelectingDate] = useState('start');
  const [showCategories, setShowCategories] = useState(false);

  const handleSubmit = () => {
    if (!selectedCategory || !amount || !startDate || !endDate) return;

    onSubmit({
      category: {
        name: selectedCategory.name,
        icon: selectedCategory.icon,
        color: selectedCategory.color
      },
      amount: parseFloat(amount),
      startDate,
      endDate,
    });

    // Reset form
    setSelectedCategory(null);
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

  if (showCategories) {
    return (
      <Portal>
        <Modal visible={true} onDismiss={() => setShowCategories(false)} contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Category</Text>
            <TouchableOpacity onPress={() => setShowCategories(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryGrid}>
            {BUDGET_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                }}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <MaterialCommunityIcons name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Budget</Text>
          <TouchableOpacity onPress={onDismiss}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setShowCategories(true)}
            >
              {selectedCategory ? (
                <>
                  <MaterialCommunityIcons name={selectedCategory.icon} size={24} color={selectedCategory.color} />
                  <Text style={styles.categoryButtonText}>{selectedCategory.name}</Text>
                </>
              ) : (
                <>
                  <MaterialCommunityIcons name="shape-outline" size={24} color="#666" />
                  <Text style={styles.categoryButtonText}>Select category</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter amount"
              mode="flat"
              underlineColor="transparent"
              left={<TextInput.Affix text="$" />}
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
            <Text style={styles.submitText}>Add Budget</Text>
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
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    gap: 10,
  },
  categoryButtonText: {
    color: '#666',
    fontSize: 16,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 16,
  },
  categoryItem: {
    width: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#000',
  },
});

export default AddBudgetModal; 