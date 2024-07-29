// AgeCalculator.tsx
import React, { useState,useCallback } from 'react';
import AgeCalculatorForm from '../components/Forms/AgeCalculatorForm';

const ContactUs: React.FC = () => {
  const [years, setYears] = useState<string>('--');
  const [months, setMonths] = useState<string>('--');
  const [days, setDays] = useState<string>('--');

  return (
    <article className="flex justify-center flex-col bg-white rounded-xl rounded-br-custom-xl m-20 2xl:w-[40vw] xl:w-[50vw] lg:w-[60vw] md:w[40vw] max-xs:w-[95vw] max-xs:mx-1">
      <AgeCalculatorForm
        years = {years}
        setYears = {setYears} 
        months = {months}
        setMonths = {setMonths}
        days = {days}
        setDays= {setDays}
      />
    </article>
  );
};

export default ContactUs;
