import React, {useState} from 'react';
import {
  VStack,
  Input,
  Button,
  Select,
  CheckIcon,
  FormControl,
  useToast,
  TextArea,
  KeyboardAvoidingView,
} from 'native-base';
import {Expense} from '../types';
import {useAppDispatch} from '../redux/store';
import {addExpense} from '../redux/slices/expenseSlice';
import {Platform, StyleSheet} from 'react-native';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Rent',
  'Fuel',
  'Others',
];

interface AddExpenseFormProps {
  closeActionSheet: () => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({closeActionSheet}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    };

    dispatch(addExpense(newExpense));
    setDescription('');
    setAmount('');
    setCategory('');
    closeActionSheet();

    toast.show({
      title: 'Expense added successfully',
      placement: 'bottom',
      bgColor: 'green.400',
      duration: 2000,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.container}>
      <VStack space={4} p={4} width="100%" height="100%">
        <FormControl>
          <FormControl.Label>Category</FormControl.Label>
          <Select
            width="100%"
            height="12"
            selectedValue={category}
            accessibilityLabel="Choose Category"
            placeholder="Choose Category"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setCategory(itemValue)}>
            {categories.map(cat => (
              <Select.Item key={cat} label={cat} value={cat} />
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormControl.Label>Amount</FormControl.Label>
          <Input
            width="100%"
            height="12"
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            width="100%"
            height="24"
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            tvParallaxProperties={undefined}
            onTextInput={undefined}
            autoCompleteType={undefined}
          />
        </FormControl>

        <Button mt={4} onPress={handleSubmit}
        disabled={description === '' || amount === '' || category === '' ? true : false}
        opacity={description === '' || amount === '' || category === '' ? 0.5 : 1}
        >
          Add Expense
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default AddExpenseForm;
