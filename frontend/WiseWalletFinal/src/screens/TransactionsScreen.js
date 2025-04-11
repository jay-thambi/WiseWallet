import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TransactionItem = ({ name, date, amount, icon, color }) => (
    <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <View style={styles.transactionInfo}>
            <Text style={styles.transactionName}>{name}</Text>
            <Text style={styles.transactionDate}>{date}</Text>
        </View>
        <Text style={styles.transactionAmount}>${amount}</Text>
    </View>
);

const TransactionsScreen = ({ transactions }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <MaterialCommunityIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Recent Transactions</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                {transactions.length === 0 ? (
                    <Text style={styles.emptyText}>No transactions yet.</Text>
                ) : (
                    transactions.map((transaction, index) => (
                        <TransactionItem key={index} {...transaction} />
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 44,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 24,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
});

export default TransactionsScreen; 