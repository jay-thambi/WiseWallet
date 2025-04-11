import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Surface, Text, Portal, Modal, TextInput, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GoalCard = ({
  id,
  name,
  icon,
  color,
  amount,
  savedAmount,
  startDate,
  endDate,
  onAddProgress
}) => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressAmount, setProgressAmount] = useState('');
  const progress = savedAmount / amount;
  const remainingAmount = amount - savedAmount;

  const handleAddProgress = () => {
    if (!progressAmount) return;
    onAddProgress(id, parseFloat(progressAmount));
    setProgressAmount('');
    setShowProgressModal(false);
  };

  return (
    <>
      <Surface style={styles.container}>
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
          <IconButton
            icon="chevron-right"
            size={24}
            onPress={() => setShowProgressModal(true)}
          />
        </View>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: color, width: `${Math.min(progress * 100, 100)}%` }
            ]}
          />
        </View>

        <Text style={styles.savingsText}>
          Saved ${savedAmount} • ${remainingAmount} remaining
        </Text>
      </Surface>

      <Portal>
        <Modal
          visible={showProgressModal}
          onDismiss={() => setShowProgressModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Add Progress to {name}</Text>
          <Text style={styles.modalSubtitle}>
            Current progress: ${savedAmount} / ${amount}
          </Text>

          <TextInput
            label="Amount"
            value={progressAmount}
            onChangeText={setProgressAmount}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            left={<TextInput.Affix text="$" />}
          />

          <View style={styles.modalButtons}>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setShowProgressModal(false)}
            />
            <IconButton
              icon="check"
              size={24}
              onPress={handleAddProgress}
              disabled={!progressAmount}
            />
          </View>
        </Modal>
      </Portal>
    </>
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
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});

export default GoalCard; 