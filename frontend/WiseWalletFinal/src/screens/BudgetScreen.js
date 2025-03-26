import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/common/Header';
import BudgetCircle from '../components/budget/BudgetCircle';
import BudgetCard from '../components/budget/BudgetCard';
import TransactionList from '../components/budget/TransactionList';
import AddBudgetModal from '../components/budget/AddBudgetModal';

const BUDGET_CATEGORIES = [
  { 
    id: 1,
    name: 'Restaurant',
    icon: 'silverware',
    color: '#4A90E2',
    monthlySpending: 400,
    monthlyBudget: 500
  },
  {
    id: 2,
    name: 'Transport',
    icon: 'train-car',
    color: '#9B51E0',
    monthlySpending: 120,
    monthlyBudget: 200
  },
  {
    id: 3,
    name: 'Grocery',
    icon: 'cart',
    color: '#27AE60',
    monthlySpending: 560,
    monthlyBudget: 700
  },
  {
    id: 4,
    name: 'Medication',
    icon: 'medical-bag',
    color: '#2F80ED',
    monthlySpending: 20,
    monthlyBudget: 200
  }
];

const RECENT_TRANSACTIONS = [
  {
    name: 'SAQ',
    date: 'Mar 18',
    amount: 145,
    icon: 'bottle-wine',
    color: '#4A90E2'
  },
  {
    name: 'World Gym',
    date: 'Mar 11',
    amount: 40,
    icon: 'dumbbell',
    color: '#9B51E0'
  },
  {
    name: 'Amazon',
    date: 'Mar 10',
    amount: 30,
    icon: 'shopping',
    color: '#27AE60'
  }
];

const BudgetScreen = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [budgets, setBudgets] = useState(BUDGET_CATEGORIES);
  
  const totalBudget = budgets.reduce(
    (sum, category) => sum + category.monthlyBudget,
    0
  );
  
  const budgetSegments = budgets.map(category => ({
    amount: category.monthlyBudget,
    color: category.color
  }));

  const handleAddBudget = (newBudget) => {
    const budget = {
      id: budgets.length + 1,
      name: newBudget.category.name,
      icon: newBudget.category.icon,
      color: newBudget.category.color,
      monthlySpending: 0,
      monthlyBudget: newBudget.amount
    };
    setBudgets([...budgets, budget]);
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>You are on the right track.</Text>
        </View>

        <BudgetCircle 
          totalBudget={totalBudget}
          segments={budgetSegments}
        />

        <View style={styles.categoryHeader}>
          <Text style={styles.sectionTitle}>Budgets</Text>
          <Button 
            mode="text" 
            onPress={() => setIsAddModalVisible(true)}
          >
            Add new
          </Button>
        </View>

        <View style={styles.categoriesGrid}>
          {budgets.map(category => (
            <View key={category.id} style={styles.categoryItem}>
              <View 
                style={[
                  styles.categoryIcon, 
                  { backgroundColor: category.color + '20' }
                ]}
              >
                <MaterialCommunityIcons 
                  name={category.icon} 
                  size={24} 
                  color={category.color} 
                />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
              <Text style={styles.categoryAmount}>
                ${category.monthlySpending}
              </Text>
            </View>
          ))}
        </View>

        {budgets.map(category => (
          <BudgetCard
            key={category.id}
            {...category}
            onPress={() => {}}
          />
        ))}

        <TransactionList transactions={RECENT_TRANSACTIONS} />
      </ScrollView>

      <AddBudgetModal
        visible={isAddModalVisible}
        onDismiss={() => setIsAddModalVisible(false)}
        onSubmit={handleAddBudget}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusContainer: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  statusText: {
    color: '#2E7D32',
    textAlign: 'center',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  categoryItem: {
    width: '25%',
    padding: 8,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
});

export default BudgetScreen; 