import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, IconButton, RadioButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GoalCard from '../components/goals/GoalCard';
import AddGoalModal from '../components/goals/AddGoalModal';
import Svg, { Path, Circle, G } from 'react-native-svg';

// Function to generate random colors
const getRandomColor = () => {
  const colors = [
    '#FF6B6B', // Red
    '#4D96FF', // Blue
    '#6BCB77', // Green
    '#FF9F45', // Orange
    '#9B59B6', // Purple
    '#3498DB', // Light Blue
    '#E74C3C', // Dark Red
    '#2ECC71', // Emerald
    '#F1C40F'  // Yellow
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const GOAL_CATEGORIES = [
  { id: 1, name: 'Furniture', icon: 'sofa', color: '#FF6B6B', amount: 4000 },
  { id: 2, name: 'Vacation', icon: 'airplane', color: '#FFD93D', amount: 3000 },
  { id: 3, name: 'Graduation', icon: 'school', color: '#6BCB77', amount: 5000 },
  { id: 4, name: 'Buy boat', icon: 'sail-boat', color: '#4D96FF', amount: 8000 },
  { id: 5, name: 'Buy house', icon: 'home', color: '#FF9F45', amount: 20000 },
];

const GoalChart = ({ goals, totalAmount }) => {
  const radius = 80;
  const strokeWidth = 20;
  const center = radius + strokeWidth;

  let startAngle = 0;
  const total = goals.reduce((sum, goal) => sum + goal.amount, 0) || 1;
  const totalSaved = goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0);

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartWrapper}>
        <Svg
          width={center * 2}
          height={center * 2}
          viewBox={`0 0 ${center * 2} ${center * 2}`}
        >
          {/* Background circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E5E5E5"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Goal segments */}
          {goals.map((goal, index) => {
            const percentage = goal.amount / total;
            const angle = percentage * 360;
            const sweepFlag = angle <= 180 ? 0 : 1;

            const x1 = center + radius * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = center + radius * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = center + radius * Math.cos((startAngle + angle - 90) * Math.PI / 180);
            const y2 = center + radius * Math.sin((startAngle + angle - 90) * Math.PI / 180);

            const savedPercentage = goal.savedAmount / goal.amount;
            const innerRadius = radius - strokeWidth / 2;
            const savedAngle = angle * savedPercentage;
            const savedSweepFlag = savedAngle <= 180 ? 0 : 1;

            const sx1 = center + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180);
            const sy1 = center + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180);
            const sx2 = center + innerRadius * Math.cos((startAngle + savedAngle - 90) * Math.PI / 180);
            const sy2 = center + innerRadius * Math.sin((startAngle + savedAngle - 90) * Math.PI / 180);

            const totalPathData = `
              M ${center} ${center}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${sweepFlag} 1 ${x2} ${y2}
              L ${center} ${center}
            `;

            const savedPathData = `
              M ${center} ${center}
              L ${sx1} ${sy1}
              A ${innerRadius} ${innerRadius} 0 ${savedSweepFlag} 1 ${sx2} ${sy2}
              L ${center} ${center}
            `;

            startAngle += angle;

            return (
              <G key={index}>
                <Path
                  d={totalPathData}
                  fill={goal.color + '40'}
                  stroke="white"
                  strokeWidth={1}
                />
                <Path
                  d={savedPathData}
                  fill={goal.color}
                  stroke="white"
                  strokeWidth={1}
                />
              </G>
            );
          })}
        </Svg>

        <View style={styles.savedInfo}>
          <Text style={styles.savedLabel}>Saved</Text>
          <Text style={styles.savedAmount}>${totalSaved}</Text>
          <Text style={styles.totalAmount}>of ${totalAmount}</Text>
        </View>
      </View>
    </View>
  );
};

const NotificationModal = ({ visible, onDismiss, onSave }) => {
  const [frequency, setFrequency] = useState('daily');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.notificationModal}>
          <Text style={styles.modalTitle}>Goal Update Reminders</Text>
          <Text style={styles.modalSubtitle}>How often would you like to be reminded?</Text>

          <RadioButton.Group onValueChange={value => setFrequency(value)} value={frequency}>
            <View style={styles.radioOption}>
              <RadioButton value="daily" />
              <Text>Once a day</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="weekly" />
              <Text>Once a week</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="monthly" />
              <Text>Once a month</Text>
            </View>
          </RadioButton.Group>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onDismiss}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={() => {
                onSave(frequency);
                onDismiss();
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const GoalsScreen = () => {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const handleAddGoal = (newGoal) => {
    setGoals(prevGoals => [
      ...prevGoals,
      {
        id: Date.now(),
        name: newGoal.name,
        icon: newGoal.icon,
        color: getRandomColor(),
        amount: newGoal.amount,
        savedAmount: 0,
        startDate: newGoal.startDate,
        endDate: newGoal.endDate,
      }
    ]);
    setShowAddModal(false);
  };

  const handleResetGoals = () => {
    setGoals([]);
  };

  const handleAddProgress = (goalId, amount) => {
    setGoals(currentGoals =>
      currentGoals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            savedAmount: goal.savedAmount + amount
          };
        }
        return goal;
      })
    );
  };

  const totalAmount = goals.reduce((sum, goal) => sum + goal.amount, 0);

  const handleNotificationSave = (frequency) => {
    // Here you would implement the actual notification scheduling
    console.log('Setting notification frequency to:', frequency);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
        <Text style={styles.dateText}>{formattedDate}</Text>
        <IconButton
          icon="bell"
          size={24}
          onPress={() => setShowNotificationModal(true)}
        />
      </View>

      <GoalChart goals={goals} totalAmount={totalAmount} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Goals</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleResetGoals}
            >
              <MaterialCommunityIcons name="refresh" size={20} color="#FF6B6B" />
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={() => setShowAddModal(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#666" />
              <Text>Add new</Text>
            </TouchableOpacity>
          </View>
        </View>

        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            {...goal}
            onAddProgress={handleAddProgress}
          />
        ))}

        {goals.length === 0 && (
          <Text style={styles.emptyText}>No goals yet. Add a new goal to get started!</Text>
        )}
      </View>

      <AddGoalModal
        visible={showAddModal}
        onDismiss={() => setShowAddModal(false)}
        onSubmit={handleAddGoal}
      />

      <NotificationModal
        visible={showNotificationModal}
        onDismiss={() => setShowNotificationModal(false)}
        onSave={handleNotificationSave}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 200,
  },
  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  savedInfo: {
    alignItems: 'flex-start',
  },
  savedLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  savedAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 14,
    color: '#666',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryAmount: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#FFE5E5',
  },
  resetButtonText: {
    color: '#FF6B6B',
  },
  addButton: {
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4D96FF',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default GoalsScreen; 