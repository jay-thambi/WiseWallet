import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Switch, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GOAL_CATEGORIES = [
  { id: 1, name: 'Buy furniture', icon: 'sofa', color: '#EB5757' },
  { id: 2, name: 'Vacation', icon: 'airplane', color: '#F2C94C' },
  { id: 3, name: 'Graduation', icon: 'school', color: '#2F80ED' },
  { id: 4, name: 'Buy boat', icon: 'sail-boat', color: '#56CCF2' },
  { id: 5, name: 'Buy house', icon: 'home', color: '#F2994A' },
];

const AddGoalModal = ({ visible, onDismiss, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [account, setAccount] = useState('');
  const [reminder, setReminder] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      category: selectedCategory,
      amount: parseFloat(amount),
      startDate,
      endDate,
      account,
      reminder,
    });
    onDismiss();
  };

  if (showCategories) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <IconButton icon="arrow-left" onPress={() => setShowCategories(false)} />
            <Text style={styles.title}>Select the goal</Text>
          </View>
          <ScrollView style={styles.categoryList}>
            {GOAL_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                mode="outlined"
                style={[
                  styles.categoryButton,
                  selectedCategory?.id === category.id && styles.selectedCategory,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                }}
              >
                <View style={styles.categoryContent}>
                  <MaterialCommunityIcons name={category.icon} size={24} color={category.color} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </Button>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>Add new goal</Text>
          <IconButton icon="close" onPress={onDismiss} />
        </View>
        
        <ScrollView>
          <Button
            mode="outlined"
            onPress={() => setShowCategories(true)}
            style={styles.input}
          >
            {selectedCategory ? selectedCategory.name : 'Select goal'}
          </Button>

          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            left={<TextInput.Affix text="$" />}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Start date"
            value={startDate}
            onChangeText={setStartDate}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="calendar" />}
          />

          <TextInput
            label="End date"
            value={endDate}
            onChangeText={setEndDate}
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="calendar" />}
          />

          <TextInput
            label="Account"
            value={account}
            onChangeText={setAccount}
            mode="outlined"
            style={styles.input}
          />

          <View style={styles.switchContainer}>
            <Text>Reminder</Text>
            <Switch value={reminder} onValueChange={setReminder} />
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={!selectedCategory || !amount}
          >
            Add goal
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 8,
  },
  categoryList: {
    maxHeight: '80%',
  },
  categoryButton: {
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#E8F5E9',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  categoryName: {
    marginLeft: 16,
  },
});

export default AddGoalModal; 