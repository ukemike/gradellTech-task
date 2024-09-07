import moment from 'moment';

export const formatDate = (date: string | Date) =>
  moment(date).format('MMM D, YYYY');

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);