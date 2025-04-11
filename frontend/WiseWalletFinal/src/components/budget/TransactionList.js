import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TransactionItem = ({ name, date, amount, icon, color }) => (
  <Surface style={styles.transactionItem}>
    <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
    </View>
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <Text style={styles.transactionAmount}>${amount}</Text>
  </Surface>
);

const TransactionList = ({ transactions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} {...transaction} />
      ))}
      {transactions.length > 3 && (
        <Text style={styles.viewAll}>View all</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewAll: {
    color: '#6200ee',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    fontWeight: '500',
  },
});

export default TransactionList; 