import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

const DashboardScreen = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Title style={styles.welcomeTitle}>Welcome, {user?.name}!</Title>
          <Paragraph>Track your expenses and discover student discounts</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Monthly Overview</Title>
          <Paragraph>Total Spent: $450</Paragraph>
          <Paragraph>Budget Remaining: $550</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Expenses</Title>
          <View style={styles.expense}>
            <Paragraph>Groceries</Paragraph>
            <Paragraph>$75.50</Paragraph>
          </View>
          <View style={styles.expense}>
            <Paragraph>Books</Paragraph>
            <Paragraph>$120.00</Paragraph>
          </View>
          <View style={styles.expense}>
            <Paragraph>Coffee</Paragraph>
            <Paragraph>$4.50</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button>View All</Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Available Discounts</Title>
          <View style={styles.discount}>
            <Paragraph>Spotify Student</Paragraph>
            <Paragraph>50% OFF</Paragraph>
          </View>
          <View style={styles.discount}>
            <Paragraph>Amazon Prime Student</Paragraph>
            <Paragraph>Prime 6-mo Free</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button>View All</Button>
        </Card.Actions>
      </Card>

      <Button 
        mode="outlined" 
        onPress={logout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeCard: {
    margin: 16,
    backgroundColor: '#6200ee',
  },
  welcomeTitle: {
    color: '#fff',
  },
  card: {
    margin: 16,
    marginTop: 0,
  },
  expense: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  discount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  logoutButton: {
    margin: 16,
  },
});

export default DashboardScreen; 