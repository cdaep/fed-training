// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button/Button';
import { ButtonVariant } from '../enums/ButtonVariant';

// Test cases for Button component
describe('Button Component', () => {

  test('renders button with primary variant', () => {
    render(
      <Button 
        variant={ButtonVariant.Primary} 
        onClick={() => {}} 
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    
    // Check if the button has the primary variant class
    expect(buttonElement).toHaveClass('bg-purple');
    expect(buttonElement).toHaveClass('hover:bg-black');
  });

  test('renders button with undefined variant', () => {
    render(
      <Button 
        variant={ButtonVariant.Undefined} 
        onClick={() => {}} 
      />
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    
    // Check if the button does not have any background color class
    expect(buttonElement).not.toHaveClass('bg-purple');
    expect(buttonElement).not.toHaveClass('hover:bg-black');
  });

  test('calls onClick handler when button is clicked', () => {
    const handleClick = jest.fn();  // Create a mock function
    render(
      <Button 
        variant={ButtonVariant.Primary} 
        onClick={handleClick} 
      />
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);  // Simulate a button click

    // Verify that the onClick handler is called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});
