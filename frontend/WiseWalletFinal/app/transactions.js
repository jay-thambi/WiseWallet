import React from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import TransactionsScreen from '../src/screens/TransactionsScreen';

export default function TransactionsPage() {
    const { transactions } = useLocalSearchParams();
    const parsedTransactions = JSON.parse(transactions || '[]');

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <TransactionsScreen transactions={parsedTransactions} />
        </>
    );
} 