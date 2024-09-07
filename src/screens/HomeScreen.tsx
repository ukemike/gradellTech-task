import React from 'react';
import {
  VStack,
  Text,
  Icon,
  Actionsheet,
  useDisclose,
  Fab,
  HStack,
  IconButton,
} from 'native-base';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Filter from '../components/Filter';
import {Plus, FilterIcon} from 'lucide-react-native';
import {useAppSelector} from '../redux/store';
import {formatCurrency} from '../utils/functions';
import SafeScreen from '../components/SafeScreen';

const HomeScreen: React.FC = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {
    isOpen: isFilterOpen,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclose();
  const {filteredExpenses, expenses} = useAppSelector(
    state => state.app.expense,
  );

  const totalSpent = filteredExpenses.reduce(
    (acc: number, curr: {amount: number}) => acc + curr.amount,
    0,
  );

  return (
    <SafeScreen bg="#FFF" statusBarColor="#06b6d4" variant="light">
      <VStack flex={1}>
        <VStack p={4} bg="primary.500">
          <Text color="white" fontSize="lg" bold>
            Welcome to Expense Tracker
          </Text>
          <Text color="white" fontSize="sm">
            Keep track of your expenses
          </Text>
        </VStack>

        {expenses.length > 0 && (
          <HStack p={4} justifyContent="space-between" alignItems="center">
            <Text color="primary.500" fontSize="lg" bold>
              Total Spent: {formatCurrency(totalSpent)}
            </Text>

            {expenses.length > 0 && (
              <HStack justifyContent="flex-end">
                <IconButton
                  onPress={onOpenFilter}
                  variant="ghost"
                  icon={<Icon as={FilterIcon} size="sm" />}
                />
              </HStack>
            )}
          </HStack>
        )}

        <ExpenseList />
      </VStack>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content width="100%" bg="gray.100">
          <AddExpenseForm closeActionSheet={onClose} />
        </Actionsheet.Content>
      </Actionsheet>

      <Actionsheet isOpen={isFilterOpen} onClose={onCloseFilter} size="full">
        <Actionsheet.Content width="100%" bg="gray.100">
          <Filter />
        </Actionsheet.Content>
      </Actionsheet>

      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={Plus} name="plus" size="sm" />}
        onPress={onOpen}
        bg="primary.500"
      />
    </SafeScreen>
  );
};

export default HomeScreen;
