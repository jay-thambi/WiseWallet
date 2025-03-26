import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GoalCard = ({
  name,
  icon,
  color,
  amount,
  savedAmount,
  startDate,
  endDate,
  onPress,
}) => {
  const progress = savedAmount / amount;
  const remainingAmount = amount - savedAmount;

  return (
    <Surface style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.dates}>
            Start: {startDate} • End: {endDate}
          </Text>
        </View>
        <Text style={styles.amount}>${amount}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar,
            { backgroundColor: color, width: `${progress * 100}%` }
          ]}
        />
      </View>

      <Text style={styles.savingsText}>
        Total ${savedAmount} Left • ${remainingAmount} saving
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  dates: {
    fontSize: 12,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  savingsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});

export default GoalCard; 