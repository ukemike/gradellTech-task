import React from 'react';
import {HStack, VStack, Text, Box} from 'native-base';
import {Expense} from '../types';
import {formatCurrency, formatDate} from '../utils/functions';

interface Props {
  expense: Expense;
}

const ExpenseItem: React.FC<Props> = ({expense}) => {
  return (
    <Box borderBottomWidth={1} borderColor="gray.200" p={4}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack
          alignItems="flex-start"
          justifyContent="center"
          space={2}
          flex={1}>
          <Text bold>{expense.description}</Text>
          <Text color="gray.500">{expense.category}</Text>
        </VStack>
        <VStack alignItems="flex-end" justifyContent="center" space={2}>
          <Text color="red.500">-{formatCurrency(expense.amount)}</Text>
          <Text color="gray.500">{formatDate(expense.date)}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ExpenseItem;
