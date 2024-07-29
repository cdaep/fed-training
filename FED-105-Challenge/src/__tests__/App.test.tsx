// App.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AgeCalculator from '../pages/AgeCalculator';

test('renders AgeCalculator component at /age-calculator route', async () => {
  render(
    <MemoryRouter initialEntries={['/age-calculator']}>
      <Routes>
        <Route path="/age-calculator" element={<AgeCalculator />} />
      </Routes>
    </MemoryRouter>
  );

  // Verify that AgeCalculator component is rendered
  await waitFor(() => {
    expect(screen.getByLabelText(/DAY/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/MONTH/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/YEAR/i)).toBeInTheDocument();
  });
});
