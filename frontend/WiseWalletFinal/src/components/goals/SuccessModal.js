import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SuccessModal = ({ visible, onDismiss, goalData }) => {
    const monthlyAmount = useMemo(() => {
        if (!goalData?.amount) return 0;
        try {
            const amount = parseFloat(goalData.amount);
            return Math.round(amount / 12);
        } catch (error) {
            console.error('Error calculating monthly amount:', error);
            return 0;
        }
    }, [goalData?.amount]);

    const safeGoalData = useMemo(() => ({
        category: {
            name: goalData?.category?.name || 'Goal',
            icon: goalData?.category?.icon || 'target',
            color: goalData?.category?.color || '#4A90E2'
        },
        amount: goalData?.amount || 0,
        startDate: goalData?.startDate || 'Not set',
        endDate: goalData?.endDate || 'Not set',
        account: goalData?.account || 'Not specified'
    }), [goalData]);

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modal}
                dismissable={false}
            >
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="check-circle"
                            size={64}
                            color="#4CAF50"
                        />
                    </View>

                    <Text style={styles.title}>Successful</Text>
                    <Text style={styles.subtitle}>Your goal has been successfully added to goals</Text>

                    <View style={styles.goalInfo}>
                        <View style={styles.goalHeader}>
                            <MaterialCommunityIcons
                                name={safeGoalData.category.icon}
                                size={24}
                                color={safeGoalData.category.color}
                            />
                            <Text style={styles.goalName}>{safeGoalData.category.name}</Text>
                            <Text style={styles.goalAmount}>
                                ${safeGoalData.amount.toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.goalDetails}>
                            <Text style={styles.dateText}>
                                Start: {safeGoalData.startDate}
                            </Text>
                            <Text style={styles.dateText}>
                                End: {safeGoalData.endDate}
                            </Text>
                            <Text style={styles.monthlyText}>
                                Monthly saving: ${monthlyAmount.toLocaleString()}
                            </Text>
                            <Text style={styles.accountText}>
                                Account name: {safeGoalData.account}
                            </Text>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        onPress={onDismiss}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                    >
                        Done
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 16,
        padding: 20,
    },
    container: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    goalInfo: {
        width: '100%',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    goalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    goalName: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 12,
    },
    goalAmount: {
        fontSize: 18,
        fontWeight: '500',
    },
    goalDetails: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 16,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    monthlyText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    accountText: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        width: '100%',
        marginTop: 8,
    },
    buttonContent: {
        height: 48,
    },
});

export default SuccessModal; 