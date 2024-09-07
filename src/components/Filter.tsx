import React, {useState} from 'react';
import {Select, CheckIcon, HStack, VStack, Button} from 'native-base';
import {useAppDispatch} from '../redux/store';
import {filterExpenses, resetFilter} from '../redux/slices/expenseSlice';

const categories = [
  'All',
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Rent',
  'Fuel',
  'Others',
];

const Filter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const dispatch = useAppDispatch();
  const handleFilter = () => {
    dispatch(filterExpenses(selectedCategory));
  };

  const handleReset = () => {
    dispatch(resetFilter());
    setSelectedCategory('All');
  };

  return (
    <VStack space={6} alignItems="center" p={4} justifyContent="space-between">
      <Select
        selectedValue={selectedCategory}
        width="100%"
        height="12"
        accessibilityLabel="Filter by Category"
        placeholder="Filter by Category"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />,
        }}
        onValueChange={itemValue => setSelectedCategory(itemValue)}>
        {categories.map(cat => (
          <Select.Item key={cat} label={cat} value={cat} />
        ))}
      </Select>

      <HStack space={2}>
        <Button
          onPress={handleFilter}
          size="lg"
          bg="primary.500"
          _text={{color: 'white'}}
          width="50%"
          disabled={selectedCategory === 'All' ? true : false}
          opacity={selectedCategory === 'All' ? 0.5 : 1}
          >
          Apply
        </Button>
        <Button
          variant="outline"
          onPress={handleReset}
          size="lg"
          bg="white"
          borderColor="primary.500"
          _text={{color: 'primary.500'}}
          width="50%"
          disabled={selectedCategory === 'All' ? true : false}
          opacity={selectedCategory === 'All' ? 0.5 : 1}
          >
          Reset
        </Button>
      </HStack>
    </VStack>
  );
};

export default Filter;
