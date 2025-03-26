import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Switch, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [account, setAccount] = useState('');
  const [repeatMonthly, setRepeatMonthly] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      category: selectedCategory,
      amount: parseFloat(amount),
      startDate,
      endDate,
      account,
      repeatMonthly,
    });
    onDismiss();
  };

  if (showCategories) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <IconButton icon="arrow-left" onPress={() => setShowCategories(false)} />
            <Text style={styles.title}>Select the budget</Text>
          </View>
          <ScrollView style={styles.categoryList}>
            {BUDGET_CATEGORIES.map((category) => (
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
          <Text style={styles.title}>Add new budget</Text>
          <IconButton icon="close" onPress={onDismiss} />
        </View>
        
        <ScrollView>
          <Button
            mode="outlined"
            onPress={() => setShowCategories(true)}
            style={styles.input}
          >
            {selectedCategory ? selectedCategory.name : 'Select budget'}
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
            <Text>Repeat for every month</Text>
            <Switch value={repeatMonthly} onValueChange={setRepeatMonthly} />
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={!selectedCategory || !amount}
          >
            Add budget
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

export default AddBudgetModal; 