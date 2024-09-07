import {createSlice} from '@reduxjs/toolkit';
import {Expense} from '../../types';

interface ExpenseState {
  expenses: Expense[];
  filteredExpenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [],
  filteredExpenses: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.filteredExpenses.push(action.payload);
    },
    clearExpenses(state) {
      state.expenses = [];
      state.filteredExpenses = [];
    },
    filterExpenses(state, action) {
      if (action.payload === 'All') {
        state.filteredExpenses = state.expenses;
      } else {
        state.filteredExpenses = state.expenses.filter(
          expense => expense.category === action.payload,
        );
      }
    },
    resetFilter(state) {
      state.filteredExpenses = state.expenses;
    },
  },
});

export const {addExpense, filterExpenses, resetFilter, clearExpenses} = expenseSlice.actions;

export default expenseSlice.reducer;
