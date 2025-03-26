import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BudgetCard = ({ 
  name, 
  icon, 
  color, 
  monthlySpending, 
  monthlyBudget,
  onPress 
}) => {
  const progress = monthlySpending / monthlyBudget;
  
  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={color} 
          />
        </View>
        <Text style={styles.title}>{name}</Text>
        <IconButton
          icon="chevron-right"
          size={24}
          onPress={onPress}
        />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.label}>Month's spending</Text>
        <Text style={styles.label}>Monthly budget</Text>
      </View>
      
      <View style={styles.amounts}>
        <Text style={styles.amount}>${monthlySpending}</Text>
        <Text style={styles.amount}>${monthlyBudget}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { backgroundColor: color, width: `${progress * 100}%` }
          ]} 
        />
      </View>
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
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default BudgetCard; 