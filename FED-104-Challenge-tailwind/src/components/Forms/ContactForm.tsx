// ContactForm.tsx
import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Import components
import Modal from "../Modal/Modal";
import Checkbox from "../Checkbox/Checkbox";
import RadioButton from "../RadioButton/RadioButton";
import Button from "../Button/Button";

// Import SCSS files
import "./../../App.scss";

// Import Tailwind CSS base styles
import "tailwindcss/tailwind.css";
import { ButtonVariant } from "../../enums/ButtonVariant";
import { ModalVariant } from "../../enums/ModalVariant";

interface ContactFormProps {
  showModal: boolean;
  modalVariant: ModalVariant;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVariant: React.Dispatch<React.SetStateAction<ModalVariant>>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  showModal,
  modalVariant,
  setShowModal,
  setModalVariant
}) => {

  const validationSchema = Yup.object({
    fname: Yup.string().required("This field is required"),
    lname: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("This field is required"),
    queryType: Yup.string().required("Please select a query type"),
    queryText: Yup.string().required("This field is required"),
    consent: Yup.boolean().oneOf(
      [true],
      "To submit this form, please consent to being contacted"
    ),
  });

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    queryType: "",
    queryText: "",
    consent: false,
  };

  const handleCloseModal = useCallback(
    (resetForm: () => void) => {
      setShowModal(false);
      if (modalVariant === ModalVariant.Success) {
        resetForm(); // Only reset the form if the modal type is success
      } 
    },
    [modalVariant, setShowModal]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setModalVariant(ModalVariant.Success)
        setShowModal(true);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, handleChange, resetForm, submitForm, isValid}) => {
        if (Object.keys(errors).length > 0) {
          setModalVariant(ModalVariant.Error);
        }
        return (
          <Form className="m-8">
            <div className="flex gap-4 mb-4 md:flex-row max-xs:flex-col">
              <div className="w-1/2 lg:w-1/2 max-xs:w-full">
                <label
                  htmlFor="fname"
                  className="form-label font-karla-variable text-grey-darker block text-gray-darker"
                >
                  First Name<span className="ml-custom-ml-5 text-green-medium">*</span>
                </label>
                <Field
                  type="text"
                  name="fname"
                  id="fname"
                  className={`w-full h-12 border rounded-md mb-2 p-4 font-karla-variable focus:outline-none ${
                    errors.fname
                      ? "border-red focus:border-red"
                      : "border-grey-medium focus:border-green-medium"
                  }`}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="fname"
                  component="span"
                  className="mt-2 text-custom15 text-red font-karla-variable"
                />
              </div>
              <div className="w-1/2 md:w-1/2 max-xs:w-full">
                <label
                  htmlFor="lname"
                  className="form-label font-karla-variable text-grey-darker block text-gray-darker"
                >
                  Last Name<span className="ml-custom-ml-5 text-green-medium">*</span>
                </label>
                <Field
                  type="text"
                  name="lname"
                  id="lname"
                  className={`w-full h-12 border rounded-md mb-2 p-4 font-karla-variable focus:outline-none ${
                    touched.lname && errors.lname
                      ? "border-red focus:border-red"
                      : "border-grey-medium focus:border-green-medium"
                  }`}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="lname"
                  component="span"
                  className="mt-2 text-custom15 text-red font-karla-variable"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="form-label font-karla-variable text-grey-darker block text-gray-darker"
              >
                Email Address<span className="ml-custom-ml-5 text-green-medium">*</span>
              </label>
              <Field
                type="text"
                name="email"
                id="email"
                className={`w-full h-12 border rounded-md mb-2 p-4 font-karla-variable focus:outline-none ${
                  touched.email && errors.email
                    ? "border-red focus:border-red"
                    : "border-grey-medium focus:border-green-medium"
                }`}
                onChange={handleChange}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="mt-2 text-custom15 text-red font-karla-variable"
              />
            </div>

            <div className="mb-4">
              <label className="form-label font-karla-variable text-grey-darker block text-gray-darker">
                Query Type<span className="ml-custom-ml-5 text-green-medium">*</span>
              </label>
              <div className="queryOption flex flex-row gap-4 mt-4 mb-1 justify-between max-xs:flex-col">
                <div className="w-1/2 md:w-1/2 lg:mb-4 md:mb-0 max-xs:w-full max-xs:mb-0">
                  <Field name="queryType">
                    {({ field }: any) => (
                      <RadioButton
                        name={field.name}
                        value="General Enquiry"
                        checked={field.value === "General Enquiry"}
                        onChange={field.onChange}
                      />
                    )}
                  </Field>
                </div>
                <div className="w-1/2 md:w-1/2 mb-4 md:mb-0 max-xs:w-full">
                  <Field name="queryType">
                    {({ field }: any) => (
                      <RadioButton
                        name={field.name}
                        value="Support Request"
                        checked={field.value === "Support Request"}
                        onChange={field.onChange}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <ErrorMessage
                name="queryType"
                component="span"
                className="mt-2 text-custom15 text-red font-karla-variable"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="queryText"
                className="form-label font-karla-variable text-grey-darker block text-gray-darker"
              >
                Message<span className="ml-custom-ml-5 text-green-medium">*</span>
              </label>
              <Field name="queryText">
                {({ field, form }: any) => (
                  <textarea
                    {...field}
                    id="queryText"
                    rows={4}
                    className={`w-full resize-none border rounded-md mb-2 p-4 font-karla-variable focus:outline-none ${
                      form.errors.queryText && form.touched.queryText
                        ? "border-red focus:border-red"
                        : "border-grey-medium focus:border-green-medium"
                    }`}
                    onChange={handleChange}
                  ></textarea>
                )}
              </Field>
              <ErrorMessage
                name="queryText"
                component="span"
                className="mt-2 text-custom15 text-red font-karla-variable"
              />
            </div>

            <div className="mt-8 mb-10">
              <Field name="consent">
                {({ field }: any) => (
                  <Checkbox
                    name={field.name}
                    checked={field.value}
                    onChange={field.onChange}
                    label="I consent to being contacted by the team"
                  />
                )}
              </Field>
              <ErrorMessage
                name="consent"
                component="span"
                className="mt-2 text-custom15 text-red font-karla-variable"
              />
            </div>

            <div className="mb-4">
              <Button
                value="Submit"
                variant={ButtonVariant.Primary}
                onClick={() => {
                  setShowModal(true);
                  submitForm();
                }}
              />
            </div>

            {showModal && (
        <Modal
          variant={modalVariant}
          showModal={showModal}
          closeModal={() => {
            handleCloseModal(resetForm);
          }}
        />
      )}
          </Form>
          
        );
      }}
    </Formik>
  );
};

export default ContactForm;
