/* eslint-disable testing-library/no-node-access -- Compare the responsive layout shell before and after the deferred form mounts. */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';
import { ContactFormPlaceholder } from './ContactFormView';

const mockSubmit = jest.fn();
const mockAlert = jest.fn();
let mockState;
jest.mock('../hooks/useSubmit', () => ({ __esModule: true, default: () => mockState }));
jest.mock('../context/alertContext', () => ({ useAlertContext: () => ({ onOpen: mockAlert }) }));
jest.mock('framer-motion', () => ({
  motion: { div: ({ children, initial, whileInView, transition, viewport, ...props }) => <div {...props}>{children}</div> },
}));
beforeEach(() => {
  mockState = { isLoading: false, response: null, submit: mockSubmit, clearResponse: () => { mockState.response = null; } };
});

test.each([
  ['en', 'Name', 'Email', 'Message', 'Required'],
  ['ps', 'نوم', 'ایمېل', 'پيغام', 'اړين دی'],
])('preserves the placeholder layout, fields, and validation in %s', async (locale, name, email, message, required) => {
  const { container, rerender } = render(<ContactFormPlaceholder locale={locale} />);
  const layout = container.firstChild.className;
  const fieldClasses = [name, email, message].map(label => screen.getByLabelText(label).className);
  [name, email, message].forEach(label => expect(screen.getByLabelText(label)).toBeDisabled());
  expect(screen.getByRole('button')).toBeDisabled();
  rerender(<ContactForm locale={locale} />);
  expect(container.firstChild.className).toBe(layout);
  [name, email, message].forEach((label, index) => {
    expect(screen.getByLabelText(label)).toBeEnabled();
    expect(screen.getByLabelText(label).className).toBe(fieldClasses[index]);
  });
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() => expect(screen.getAllByText(required)).toHaveLength(3));
  expect(mockSubmit).not.toHaveBeenCalled();
});

test('submits the same form values and resets the fields after a successful response', async () => {
  const { rerender } = render(<ContactForm />);
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Visitor' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'visitor@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'A new project' } });
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith(null, {
    firstName: 'Visitor', email: 'visitor@example.com', comment: 'A new project', type: 'hireMe',
  }));
  mockState.response = { type: 'success', message: 'Received' };
  rerender(<ContactForm />);
  await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''));
  expect(mockAlert).toHaveBeenCalledWith('success', 'Received');
});
