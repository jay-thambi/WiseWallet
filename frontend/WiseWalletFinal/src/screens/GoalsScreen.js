import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import GoalCircle from '../components/goals/GoalCircle';
import GoalCard from '../components/goals/GoalCard';
import AddGoalModal from '../components/goals/AddGoalModal';

const INITIAL_GOALS = [
  {
    id: 1,
    name: 'Buy furniture',
    icon: 'sofa',
    color: '#EB5757',
    amount: 5000,
    savedAmount: 2500,
    startDate: '2024-03-01',
    endDate: '2024-06-01',
  },
  {
    id: 2,
    name: 'Vacation',
    icon: 'airplane',
    color: '#F2C94C',
    amount: 3000,
    savedAmount: 1000,
    startDate: '2024-04-01',
    endDate: '2024-08-01',
  },
  {
    id: 3,
    name: 'Graduation',
    icon: 'school',
    color: '#2F80ED',
    amount: 2000,
    savedAmount: 1800,
    startDate: '2024-03-15',
    endDate: '2024-05-15',
  },
];

const GoalsScreen = () => {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [showAddModal, setShowAddModal] = useState(false);

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.amount, 0);
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  const handleAddGoal = (newGoal) => {
    setGoals([
      ...goals,
      {
        id: goals.length + 1,
        ...newGoal.category,
        amount: newGoal.amount,
        savedAmount: 0,
        startDate: newGoal.startDate,
        endDate: newGoal.endDate,
      },
    ]);
  };

  const goalSegments = goals.map((goal) => ({
    amount: goal.amount,
    color: goal.color,
  }));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineMedium">Goals</Text>
          <Text variant="titleMedium">
            ${totalSavedAmount.toFixed(2)} saved of ${totalGoalAmount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.circleContainer}>
          <GoalCircle segments={goalSegments} totalAmount={totalGoalAmount} />
        </View>

        <View style={styles.goalsContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Your goals
          </Text>
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              name={goal.name}
              icon={goal.icon}
              color={goal.color}
              amount={goal.amount}
              savedAmount={goal.savedAmount}
              startDate={goal.startDate}
              endDate={goal.endDate}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
        label="Add goal"
      />

      <AddGoalModal
        visible={showAddModal}
        onDismiss={() => setShowAddModal(false)}
        onSubmit={handleAddGoal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  goalsContainer: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default GoalsScreen; 