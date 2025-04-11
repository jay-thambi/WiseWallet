import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

export const GlobalStateProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [goals, setGoals] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const value = {
        budgets,
        setBudgets,
        goals,
        setGoals,
        transactions,
        setTransactions,
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
}; 