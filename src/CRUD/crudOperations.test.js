import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CrudOperation from './crudOperations';

test('renders the component', () => {
  render(<CrudOperation />);
  const heading = screen.getByText('Customer List');
  expect(heading).toBeInTheDocument();
});

test('adds a new customer', () => {
  render(<CrudOperation />);

  fireEvent.click(screen.getByText('Add Customer'));
  

  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Address:'), { target: { value: '123 Main St' } });

  fireEvent.click(screen.getByText('Add'));
  
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
