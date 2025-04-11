import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddSpendingModal from './AddSpendingModal';

const BudgetCard = ({
  id,
  name,
  icon,
  color,
  monthlySpending,
  monthlyBudget,
  startDate,
  endDate,
  onAddSpending
}) => {
  const [isSpendingModalVisible, setIsSpendingModalVisible] = useState(false);
  const progress = (monthlySpending / monthlyBudget) * 100;
  const remaining = monthlyBudget - monthlySpending;

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.titleSection}
          onPress={() => setIsSpendingModalVisible(true)}
        >
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
          </View>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>${remaining} remaining</Text>
            {startDate && endDate && (
              <Text style={styles.dateRange}>
                {formatDate(startDate)} - {formatDate(endDate)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { backgroundColor: color + '20' }
          ]}
        >
          <View
            style={[
              styles.progress,
              {
                backgroundColor: color,
                width: `${Math.min(progress, 100)}%`
              }
            ]}
          />
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${monthlySpending}</Text>
          <Text style={styles.totalAmount}>of ${monthlyBudget}</Text>
        </View>
      </View>

      <AddSpendingModal
        visible={isSpendingModalVisible}
        onDismiss={() => setIsSpendingModalVisible(false)}
        onSubmit={onAddSpending}
        budget={{ id, name, icon, color }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  dateRange: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 14,
    color: '#666',
  }
});

export default BudgetCard; 