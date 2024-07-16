import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// Import components
import SuccessModal from './components/Modal/SuccessModal';
import Checkbox from './components/Checkbox/Checkbox';
import RadioButton from './components/RadioButton/RadioButton';
import Button from './components/Button/Button';

// Import SCSS files
import './App.scss';

function App() {
  const initialFormData = {
    fname: '',
    lname: '',
    email: '',
    queryType: '',
    queryText: '',
    consent: false
  };

  const initialErrors = {
    fname: '',
    lname: '',
    email: '',
    queryType: '',
    queryText: '',
    consent: ''
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    if (!showModal) {
      clearForm(); // Reset form when modal closes
    }
  }, [showModal]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData(prevState => ({ ...prevState, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors: any = {};
    const RegEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!formData.fname) {
      newErrors.fname = 'This field is required';

    }

    if (!formData.lname) {
      newErrors.lname = 'This field is required';
    }

    if (!formData.email) {
      newErrors.email = 'This field is required';
    } else if (!RegEmail.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.queryType) {
      newErrors.queryType = 'Please select a query type';
    }

    if (!formData.queryText) {
      newErrors.queryText = 'This field is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'To submit this form, please consent to being contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
      console.log(formData);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const clearForm = () => {
    setFormData(initialFormData); // Reset form data
    setErrors(initialErrors); // Reset errors
  };

  return (
    <article className="form-container">
      <h1>Contact Us</h1>
      <form className="form">
        <div className="name">
          <div className="name-group">
            <label htmlFor="fname" className="form-label below-header">First Name<span className="required">*</span></label>
            <input type="text" name="fname" id="fname" className={`form-input ${errors.fname ? 'error' : ''}`} placeholder="" value={formData.fname} onChange={handleChange} />
            {errors.fname && <span className="error-state">{errors.fname}</span>}
          </div>
          <div className="name-group">
            <label htmlFor="lname" className="form-label below-header">Last Name<span className="required">*</span></label>
            <input type="text" name="lname" id="lname" className= {`form-input ${errors.lname ? 'error' : ''}`} placeholder="" value={formData.lname} onChange={handleChange} />
            {errors.lname && <span className="error-state">{errors.lname}</span>}
          </div>
        </div>

        <div className="email-group">
        <label htmlFor="email" className="form-label email-text">Email Address<span className="required">*</span></label>
        <input type="text" name="email" id="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="" value={formData.email} onChange={handleChange}></input>
        {errors.email && <span className="error-state">{errors.email}</span>}
        </div>
        <div className="query-group">
          <label className="form-label query">Query Type<span className="required">*</span></label>
          <div className="queryspan">
            <div className="queryOption">
              <RadioButton name="queryType" value="General Enquiry" checked={formData.queryType === 'General Enquiry'} onChange={handleChange}/>
              <RadioButton name="queryType" value="Support Request"checked={formData.queryType === 'Support Request'} onChange={handleChange}/>
            </div>
            {errors.queryType && <span className="error-state">{errors.queryType}</span>}
          </div>
        </div>
        <div className="message-box">
          <label htmlFor="queryText" className="form-label">Message<span className="required">*</span></label>
          <textarea className={`text-area ${errors.queryText ? 'error' : ''}`} name="queryText" id="queryText" cols={30} rows={4}  value={formData.queryText} onChange={handleChange}></textarea>
          {errors.queryText && <span className="error-state">{errors.queryText}</span>}
        </div>
        <div className="checkbox-group">
        <Checkbox name="consent" checked={formData.consent} onChange={handleChange} label="I consent to being contacted by the team"/>
        {errors.consent && <span className="error-state">{errors.consent}</span>}
        </div>
        <div className="submitButton">
          <Button value="Submit" variant="primary" className="submit-button" onClick={handleSubmit}/>
        </div>
      </form>
      {/* Success Modal */}
      {showModal && <SuccessModal showModal={showModal} closeModal={handleCloseModal} />}
    </article>
  );
}

export default App;