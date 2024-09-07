import React from 'react';
import {FlatList} from 'react-native';
import {Box, Text, Image, VStack} from 'native-base';
import ExpenseItem from './ExpenseItem';
import {useAppSelector} from '../redux/store';

const ExpenseList: React.FC = () => {
  const {filteredExpenses} = useAppSelector(state => state.app.expense);

  if (filteredExpenses?.length === 0) {
    return (
      <VStack justifyContent="center" alignItems="center">
        <Box>
          <Image
            source={require('../assets/images/empty.jpg')}
            alt="Empty"
            size="2xl"
          />
        </Box>
        <VStack
          space={2}
          alignItems="center"
          justifyContent="center"
          p={4}
          mt={4}
          bg="gray.100"
          rounded="lg"
          width="90%">
          <Text fontSize="lg" bold>
            No expenses found
          </Text>
          <Text fontSize="sm" color="muted.500">
            Add a new expense to get started
          </Text>
        </VStack>
      </VStack>
    );
  }

  return (
    <FlatList
      data={filteredExpenses}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ExpenseItem expense={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ExpenseList;
