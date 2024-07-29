import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgeCalculator from './pages/AgeCalculator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/age-calculator" element={<AgeCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
