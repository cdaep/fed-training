// AgeCalculatorForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AgeCalculatorForm from '../components/Forms/AgeCalculatorForm';

expect.extend(toHaveNoViolations);

// Mock the setState functions
const mockSetYears = jest.fn();
const mockSetMonths = jest.fn();
const mockSetDays = jest.fn();

const renderAgeCalculatorForm = (
  years: string = '--',
  months: string = '--',
  days: string = '--',
  setYears = mockSetYears,
  setMonths = mockSetMonths,
  setDays = mockSetDays
) => {
  return render(
    <AgeCalculatorForm
      years={years}
      setYears={setYears}
      months={months}
      setMonths={setMonths}
      days={days}
      setDays={setDays}
    />
  );
};

describe('AgeCalculatorForm', () => {
  test('renders default form fields', () => {
    renderAgeCalculatorForm();

    // Check if the input fields are present
    expect(screen.getByLabelText(/DAY/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/MONTH/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/YEAR/i)).toBeInTheDocument();
  });

  test('shows error message for invalid date', async () => {
    renderAgeCalculatorForm();

    // Invalid day and submit
    fireEvent.change(screen.getByPlaceholderText(/DD/i), { target: { value: '31' } });
    fireEvent.change(screen.getByPlaceholderText(/MM/i), { target: { value: '04' } });
    fireEvent.change(screen.getByPlaceholderText(/YYYY/i), { target: { value: '1991' } });
    fireEvent.click(screen.getByRole('button'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Must be a valid date/i)).toBeInTheDocument();
    });
  });

  test('calls setYears, setMonths, setDays on valid form submission', async () => {
    renderAgeCalculatorForm();

    fireEvent.change(screen.getByPlaceholderText(/DD/i), { target: { value: '29' } });
    fireEvent.change(screen.getByPlaceholderText(/MM/i), { target: { value: '09' } });
    fireEvent.change(screen.getByPlaceholderText(/YYYY/i), { target: { value: '1997' } });
    fireEvent.click(screen.getByRole('button', { name: /Custom button/i }));

    fireEvent.click(screen.getByRole('button'));

    // Wait for the updates to be reflected
    await waitFor(() => {
      expect(mockSetYears).toHaveBeenCalledWith('26');
      expect(mockSetMonths).toHaveBeenCalledWith('10');
      expect(mockSetDays).toHaveBeenCalledWith('0');
    });
  });

  test('Displays age output properly', async () => {
    renderAgeCalculatorForm('26', '10', '0')

    //years
    expect(screen.getByTestId('yearsOutput')).toHaveTextContent('26');
    expect(screen.getByTestId('yearsText')).toHaveTextContent('years');

    //months
    expect(screen.getByTestId('monthsOutput')).toHaveTextContent('10');
    expect(screen.getByTestId('monthsText')).toHaveTextContent('months');

    //days
    expect(screen.getByTestId('daysOutput')).toHaveTextContent('0');
    expect(screen.getByTestId('daysText')).toHaveTextContent('day');

  });

  test('No accessibility violations', async () => {
    const { container } = renderAgeCalculatorForm(
      '25', '5', '10'
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

});
