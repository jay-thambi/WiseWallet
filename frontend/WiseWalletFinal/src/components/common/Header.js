import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const Header = () => {
  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const currentDate = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;

  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        size={24}
        onPress={() => {}}
        style={styles.menuButton}
      />
      <Text style={styles.dateText}>{currentDate}</Text>
      <IconButton
        icon="bell-outline"
        size={24}
        onPress={() => {}}
        style={styles.notificationButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuButton: {
    margin: 0,
  },
  notificationButton: {
    margin: 0,
  },
});

export default Header; 