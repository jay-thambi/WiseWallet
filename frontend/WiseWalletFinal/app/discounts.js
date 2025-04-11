import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Restaurant', icon: 'restaurant', type: 'Ionicons' },
  { id: 2, name: 'Transport', icon: 'bus', type: 'MaterialCommunityIcons' },
  { id: 3, name: 'Grocery', icon: 'cart', type: 'Ionicons' },
  { id: 4, name: 'Medication', icon: 'pill', type: 'MaterialCommunityIcons' },
  { id: 5, name: 'Clothing', icon: 'tshirt-crew', type: 'MaterialCommunityIcons' },
  { id: 6, name: 'Beauty', icon: 'lipstick', type: 'MaterialCommunityIcons' },
  { id: 7, name: 'Fitness', icon: 'dumbbell', type: 'FontAwesome5' },
  { id: 8, name: 'Electronics', icon: 'flash', type: 'Ionicons' },
  { id: 9, name: 'Books', icon: 'book', type: 'MaterialCommunityIcons' },
];

const trendingDeals = [
  {
    id: 1,
    title: 'Thai Express',
    description: '20% off on all orders',
    image: require('../assets/images/thai.jpg'),
    expiresIn: 2
  },
  {
    id: 2,
    title: 'Best Buy',
    description: '10% student discount on electronics',
    image: require('../assets/images/best.png'),
    expiresIn: 9
  },
  {
    id: 3,
    title: 'Subaru',
    description: 'Special student financing rates',
    image: require('../assets/images/subaru.png'),
    expiresIn: 15
  }
];

const IconComponent = ({ type, name, size, color }) => {
  switch (type) {
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    default:
      return null;
  }
};

export default function DiscountsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>Wed, Mar 19</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Student Discounts</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryButton}>
                <IconComponent
                  type={category.type}
                  name={category.icon}
                  size={24}
                  color="#4A90E2"
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.dealsSection}>
          <Text style={styles.sectionTitle}>Trending Deals</Text>
          {trendingDeals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <Card>
                <Card.Cover source={deal.image} style={styles.dealImage} />
                <View style={styles.dealContent}>
                  <View style={styles.dealHeader}>
                    <Text style={styles.dealTitle}>{deal.title}</Text>
                    <Text style={styles.expiryText}>Expires in {deal.expiresIn} days</Text>
                  </View>
                  <Text style={styles.dealDescription}>{deal.description}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="wallet-outline" size={24} color="#4A90E2" />
          <Text style={styles.navText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="flag-outline" size={24} color="#4A90E2" />
          <Text style={styles.navText}>Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="pricetag-outline" size={24} color="#4A90E2" />
          <Text style={styles.navText}>Discounts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  categoriesSection: {
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    margin: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  categoryButton: {
    width: '31%',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  dealsSection: {
    padding: 16,
  },
  dealCard: {
    marginBottom: 16,
  },
  dealImage: {
    height: 160,
  },
  dealContent: {
    padding: 16,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dealDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  expiryText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#4A90E2',
  },
}); 