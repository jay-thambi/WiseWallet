import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/common/Header';
import BudgetCircle from '../components/budget/BudgetCircle';
import BudgetCard from '../components/budget/BudgetCard';
import AddBudgetModal from '../components/budget/AddBudgetModal';
import { useGlobalState } from '../context/GlobalStateContext';

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
    monthlySpending: 50,
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
  },
  {
    id: 5,
    name: 'Beauty',
    icon: 'lipstick',
    color: '#FF6B6B',
    monthlySpending: 20,
    monthlyBudget: 50
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
  const router = useRouter();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isSpendingModalVisible, setIsSpendingModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const { budgets, setBudgets, transactions, setTransactions } = useGlobalState();

  // Initialize budgets with sample data
  useEffect(() => {
    if (budgets.length === 0) {
      setBudgets(BUDGET_CATEGORIES);
      // Clear any existing transactions when reinitializing budgets
      setTransactions([]);
    }
  }, []);

  const handleResetBudgets = () => {
    setBudgets([]);
    setTransactions([]);
    setSelectedBudget(null);
  };

  const handleAddBudget = (newBudget) => {
    const budget = {
      id: Date.now(),
      name: newBudget.category.name,
      icon: newBudget.category.icon,
      color: newBudget.category.color,
      monthlySpending: 0,
      monthlyBudget: parseFloat(newBudget.amount),
      startDate: newBudget.startDate,
      endDate: newBudget.endDate
    };

    setBudgets(prev => {
      const newBudgets = [...prev, budget];
      return newBudgets;
    });
    setSelectedBudget(budget);
    setIsAddModalVisible(false);
  };

  const handleAddSpending = (budgetId, amount, description) => {
    const numericAmount = parseFloat(amount);
    setBudgets(currentBudgets => {
      const updatedBudgets = currentBudgets.map(budget => {
        if (budget.id === budgetId) {
          const updatedBudget = {
            ...budget,
            monthlySpending: (budget.monthlySpending || 0) + numericAmount
          };
          if (selectedBudget?.id === budgetId) {
            setSelectedBudget(updatedBudget);
          }
          return updatedBudget;
        }
        return budget;
      });
      return updatedBudgets;
    });

    const budget = budgets.find(b => b.id === budgetId);
    if (!budget) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newTransaction = {
      name: description,
      date: formattedDate,
      amount: numericAmount,
      icon: budget.icon,
      color: budget.color
    };

    setTransactions(current => [newTransaction, ...current]);
  };

  const handleViewTransactions = () => {
    router.push({
      pathname: '/transactions',
      params: { transactions: JSON.stringify(transactions) }
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView>
        <BudgetCircle
          totalBudget={selectedBudget?.monthlyBudget || 0}
          segments={selectedBudget ? [{
            amount: selectedBudget.monthlyBudget,
            color: selectedBudget.color
          }] : []}
          totalSpent={selectedBudget?.monthlySpending || 0}
        />

        <View style={styles.categoryHeader}>
          <Text style={styles.sectionTitle}>Budgets</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleResetBudgets}
            >
              <MaterialCommunityIcons name="refresh" size={20} color="#FF6B6B" />
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={() => setIsAddModalVisible(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#666" />
              <Text>Add new</Text>
            </TouchableOpacity>
          </View>
        </View>

        {budgets.length === 0 ? (
          <Text style={styles.emptyText}>No budgets yet. Add a new budget to get started!</Text>
        ) : (
          <>
            <View style={styles.categoriesGrid}>
              {budgets.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedBudget?.id === category.id && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedBudget(category)}
                >
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
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryAmount}>${category.monthlySpending || 0}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {budgets.map(category => (
              <BudgetCard
                key={category.id}
                {...category}
                onAddSpending={handleAddSpending}
              />
            ))}
          </>
        )}

        <TouchableOpacity
          style={styles.transactionCard}
          onPress={handleViewTransactions}
        >
          <View style={styles.transactionCardHeader}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#666" />
            <Text style={styles.transactionCardTitle}>Recent Transactions</Text>
          </View>
          <View style={styles.transactionPreview}>
            {transactions.length === 0 ? (
              <Text style={styles.noTransactionsText}>No transactions yet</Text>
            ) : (
              <>
                <Text style={styles.transactionCount}>
                  {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                </Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
              </>
            )}
          </View>
        </TouchableOpacity>
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
  selectedCategory: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
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
    marginBottom: 24,
    marginHorizontal: 16,
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  transactionCardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionCount: {
    color: '#666',
    fontSize: 14,
  },
  noTransactionsText: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default BudgetScreen; 