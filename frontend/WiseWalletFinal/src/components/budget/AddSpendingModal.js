import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddSpendingModal = ({ visible, onDismiss, onSubmit, budget }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!amount || !description) {
            setError('Please fill in all fields');
            return;
        }

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        onSubmit(budget.id, numAmount, description);
        setAmount('');
        setDescription('');
        setError('');
        onDismiss();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onDismiss}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View style={[styles.categoryIcon, { backgroundColor: budget?.color + '20' }]}>
                            <MaterialCommunityIcons
                                name={budget?.icon}
                                size={24}
                                color={budget?.color}
                            />
                        </View>
                        <Text style={styles.modalTitle}>{budget?.name}</Text>
                    </View>

                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                        placeholder="e.g., McDonald's"
                    />

                    <TextInput
                        label="Amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="0.00"
                        left={<TextInput.Affix text="$" />}
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onDismiss}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.submitButton]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.submitButtonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '85%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    errorText: {
        color: '#FF6B6B',
        marginBottom: 16,
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#F5F5F5',
    },
    cancelButtonText: {
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#4D96FF',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '500',
    },
});

export default AddSpendingModal; 