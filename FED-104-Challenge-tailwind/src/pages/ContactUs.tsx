// ContactUs.tsx
import React, { useState } from 'react';
import ContactForm from '../components/Forms/ContactForm';
import { ModalVariant } from "../enums/ModalVariant";

const ContactUs: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant>(ModalVariant.Success);

  return (
    <article className="flex justify-center flex-col bg-white rounded-lg m-20 lg:w-[40vw] max-xs:w-[80vw] max-xs:mx-1">
      <label className="text-gray-darker mt-8 ml-8 text-custom20">Contact Us</label>
      <ContactForm
        showModal={showModal}
        modalVariant={modalVariant}
        setShowModal={setShowModal}
        setModalVariant={setModalVariant}
      />
    </article>
  );
};

export default ContactUs;
