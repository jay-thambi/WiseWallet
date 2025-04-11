import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/common/Header';

const SuggestionCard = ({ icon, title, description, color, priority = 'normal' }) => (
    <Surface style={[styles.suggestionCard, priority === 'high' && styles.highPriorityCard]}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <View style={styles.suggestionContent}>
            <Text style={styles.suggestionTitle}>{title}</Text>
            <Text style={styles.suggestionDescription}>{description}</Text>
        </View>
    </Surface>
);

const AIScreen = ({ budgets, goals }) => {
    const generateBudgetInsights = () => {
        const insights = [];

        if (!budgets || budgets.length === 0) {
            return [{
                icon: 'playlist-plus',
                title: 'Get Started',
                description: 'Add your first budget to receive personalized insights and recommendations.',
                color: '#4A90E2'
            }];
        }

        // Calculate total monthly spending and budget
        const totalSpending = budgets.reduce((sum, budget) => sum + (budget.monthlySpending || 0), 0);
        const totalBudget = budgets.reduce((sum, budget) => sum + (budget.monthlyBudget || 0), 0);
        const spendingRatio = totalSpending / totalBudget;

        // Overall spending analysis
        if (spendingRatio > 0.9) {
            insights.push({
                icon: 'alert-circle',
                title: 'Overall Spending Alert',
                description: `You've used ${Math.round(spendingRatio * 100)}% of your total budget. Consider reducing non-essential expenses.`,
                color: '#FF6B6B',
                priority: 'high'
            });
        } else if (spendingRatio > 0.75) {
            insights.push({
                icon: 'alert-circle-outline',
                title: 'Spending Warning',
                description: `You've used ${Math.round(spendingRatio * 100)}% of your total budget. Start planning for next month.`,
                color: '#FFA726',
                priority: 'high'
            });
        }

        // Analyze individual budgets
        budgets.forEach(budget => {
            const ratio = budget.monthlySpending / budget.monthlyBudget;

            // Critical overspending
            if (ratio > 1) {
                insights.push({
                    icon: 'alert-octagon',
                    title: `${budget.name} Budget Exceeded`,
                    description: `You've overspent by $${(budget.monthlySpending - budget.monthlyBudget).toFixed(2)}. Consider reallocating funds from other categories.`,
                    color: '#FF6B6B',
                    priority: 'high'
                });
            }
            // Near limit
            else if (ratio > 0.8) {
                insights.push({
                    icon: 'alert-circle',
                    title: `${budget.name} Budget Alert`,
                    description: `You've used ${Math.round(ratio * 100)}% of your ${budget.name} budget. Try to limit spending in this category.`,
                    color: '#FFA726'
                });
            }
        });

        // Find highest spending category
        const highestSpending = [...budgets].sort((a, b) => b.monthlySpending - a.monthlySpending)[0];
        if (highestSpending) {
            insights.push({
                icon: 'trending-up',
                title: 'Highest Expense Category',
                description: `${highestSpending.name} is your highest spending category ($${highestSpending.monthlySpending}). Look for ways to reduce these expenses.`,
                color: '#4A90E2'
            });
        }

        // Find potential savings
        const lowSpendingCategories = budgets.filter(budget =>
            budget.monthlySpending / budget.monthlyBudget < 0.5
        );
        if (lowSpendingCategories.length > 0) {
            const savings = lowSpendingCategories.reduce(
                (total, budget) => total + (budget.monthlyBudget - budget.monthlySpending),
                0
            );
            insights.push({
                icon: 'piggy-bank',
                title: 'Savings Opportunity',
                description: `You could save up to $${savings.toFixed(2)} by maintaining current spending in ${lowSpendingCategories.map(b => b.name).join(', ')}.`,
                color: '#27AE60'
            });
        }

        // Category-specific advice
        budgets.forEach(budget => {
            switch (budget.name.toLowerCase()) {
                case 'restaurant':
                    insights.push({
                        icon: 'food',
                        title: 'Dining Tips',
                        description: 'Consider meal prepping or using student meal plans to reduce restaurant expenses.',
                        color: '#9C27B0'
                    });
                    break;
                case 'transport':
                    insights.push({
                        icon: 'train-car',
                        title: 'Transportation Savings',
                        description: 'Look into student transit passes or carpooling options to reduce transportation costs.',
                        color: '#2196F3'
                    });
                    break;
                case 'grocery':
                    insights.push({
                        icon: 'cart',
                        title: 'Grocery Shopping Tips',
                        description: 'Buy in bulk, use student discounts, and shop during sales to maximize your grocery budget.',
                        color: '#4CAF50'
                    });
                    break;
            }
        });

        return insights;
    };

    const suggestions = generateBudgetInsights();

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView>
                <View style={styles.header}>
                    <MaterialCommunityIcons name="robot" size={32} color="#6200ee" />
                    <Text style={styles.title}>Smart Budget Analysis</Text>
                </View>

                <Text style={styles.subtitle}>
                    Here's your personalized financial analysis and recommendations
                </Text>

                <View style={styles.suggestionsContainer}>
                    {suggestions.map((suggestion, index) => (
                        <SuggestionCard key={index} {...suggestion} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        paddingTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#6200ee',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    suggestionsContainer: {
        padding: 16,
        gap: 16,
    },
    suggestionCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'white',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    highPriorityCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#FF6B6B',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    suggestionContent: {
        flex: 1,
    },
    suggestionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    suggestionDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default AIScreen; 