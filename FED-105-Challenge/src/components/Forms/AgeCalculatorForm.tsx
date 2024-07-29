// AgeCalculatorForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Import components
import Button from "../Button/Button";

// Import SCSS files
import "./../../App.scss";

//Import enums
import { ButtonVariant } from "../../enums/ButtonVariant";

// Import Tailwind CSS base styles
import "tailwindcss/tailwind.css";

interface AgeCalculatorFormProps {
  years: string;
  setYears: React.Dispatch<React.SetStateAction<string>>;
  months: string;
  setMonths: React.Dispatch<React.SetStateAction<string>>;
  days: string;
  setDays: React.Dispatch<React.SetStateAction<string>>;
}

const AgeCalculatorForm: React.FC<AgeCalculatorFormProps> = ({
  years,
  setYears,
  months,
  setMonths,
  days,
  setDays,
}) => {
  const validationSchema = Yup.object({
    day: Yup.string()
      .matches(/^(0[1-9]|[12][0-9]|3[01])$/, "Must be a valid day")
      .required("This field is required"),
    month: Yup.string()
      .matches(/^(0[1-9]|1[0-2])$/, "Must be a valid month")
      .required("This field is required")
      .test("is-valid-month", "Invalid month", function (value) {
        const month = parseInt(value, 10);
        return month >= 1 && month <= 12;
      }),
    year: Yup.string()
      .required("This field is required")
      .matches(/^\d{4}$/, "Must be a valid year")
      .test("is-valid-year", "Must be in the past", (value) => {
        const year = Number(value);
        return year <= new Date().getFullYear();
      }),
  });

  const initialValues = {
    day: "",
    month: "",
    year: "",
  };
  interface FormValues {
    day: string;
    month: string;
    year: string;
  }

  const handleSubmit = (
    values: FormValues,
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: any) => void;
    }
  ) => {
    setSubmitting(false);

    const { day, month, year } = values;
    const numericYear = Number(year);
    const numericMonth = Number(month.replace(/^0+/, ""));
    const numericDay = Number(day.replace(/^0+/, ""));

    // Construct the date object
    const birthDate = new Date(numericYear, numericMonth - 1, numericDay);

    // Check if the constructed date is valid
    if (
      birthDate.getFullYear() === numericYear &&
      birthDate.getMonth() === numericMonth - 1 &&
      birthDate.getDate() === numericDay
    ) {
      const now = new Date();
      if (birthDate.getTime() > now.getTime()) {
        setErrors({
          day: "Date must be in the past",
          month: " ",
          year: " ",
        });

        setYears("--");
        setMonths("--");
        setDays("--");
      } else {
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        // Adjust if the current day is before the birth day in the current month
        if (days < 0) {
          const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the previous month
          days += lastMonth.getDate();
          months--;
        }

        // Adjust if the current month is before the birth month in the current year
        if (months < 0) {
          months += 12;
          years--;
        }

        setYears(years.toString());
        setMonths(months.toString());
        setDays(days.toString());
      }
    } else {
      setErrors({
        day: "Must be a valid date",
        month: " ",
        year: " ",
      });

      setYears("--");
      setMonths("--");
      setDays("--");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, handleSubmit }) => {
        return (
          <Form className="m-8">
            <div className="flex gap-4 mb-4 mr-20 md:flex-row max-xs:mr-0 ">
              <div className="w-1/4 lg:w-1/4 max-xs:w-full">
                <label
                  htmlFor="day"
                  className={`font-poppins-bold text-sm block tracking-widest mb-2 ${
                    touched.day && errors.day
                      ? "text-light-red"
                      : "text-smokey-grey focus:text-smokey-grey"
                  }`}
                >
                  DAY
                </label>
                <Field
                  type="text"
                  name="day"
                  id="day"
                  placeholder="DD"
                  aria-label="Day"
                  className={`w-full h-14 border font-poppins-bold text-custom32 rounded-md mb-2 p-4 cursor-pointer font-karla-variable focus:outline-none ${
                    touched.day && errors.day
                      ? "border-light-red focus:light-red"
                      : "border-light-grey focus:border-purple"
                  }`}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="day"
                  component="span"
                  className="mt-2 text-custom11 text-light-red font-poppins-italic"
                />
              </div>
              <div className="w-1/4 lg:w-1/4 max-xs:w-full">
                <label
                  htmlFor="month"
                  className={`font-poppins-bold text-sm block tracking-widest mb-2 ${
                    touched.month && errors.month
                      ? "text-light-red"
                      : "text-smokey-grey focus:text-smokey-grey"
                  }`}
                >
                  MONTH
                </label>
                <Field
                  type="text"
                  name="month"
                  id="month"
                  placeholder="MM"
                  aria-label="Month"
                  className={`w-full h-14 border font-poppins-bold text-custom32 rounded-md mb-2 p-4 cursor-pointer font-karla-variable focus:outline-none ${
                    touched.month && errors.month
                      ? "border-light-red focus:light-red"
                      : "border-light-grey focus:border-purple"
                  }`}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="month"
                  component="span"
                  className="mt-2 text-custom11 text-light-red font-poppins-italic"
                />
              </div>
              <div className="w-1/4 md:w-1/4 max-xs:w-full">
                <label
                  htmlFor="year"
                  className={`font-poppins-bold text-sm block tracking-widest mb-2 ${
                    touched.year && errors.year
                      ? "text-light-red"
                      : "text-smokey-grey focus:text-smokey-grey"
                  }`}
                >
                  YEAR
                </label>
                <Field
                  type="text"
                  name="year"
                  id="year"
                  placeholder="YYYY"
                  aria-label="Year"
                  className={`w-full h-14 border font-poppins-bold text-custom32 rounded-md mb-2 p-4 cursor-pointer font-karla-variable focus:outline-none ${
                    touched.year && errors.year
                      ? "border-light-red focus:light-red"
                      : "border-light-grey focus:border-purple"
                  }`}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="year"
                  component="span"
                  className="mt-2 text-custom11 text-light-red font-poppins-italic"
                />
              </div>
              <div></div>
            </div>

            <div className="flex items-center">
              <div className="flex-1 border-t-2 border-light-grey" />
              <Button variant={ButtonVariant.Primary} onClick={handleSubmit} />
              <div className="max-xs:flex-1 max-xs:border-t-2 max-xs:border-light-grey max-xs:border-gray-300" />
            </div>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="yearsOutput"
                data-testid="yearsOutput"
                className="block text-6xl text-purple font-poppins-extra-bold-italic mb-4"
              >
                {years}
              </label>
              <span
                data-testid="yearsText"
                className="block text-6xl text-off-black font-poppins-extra-bold-italic mb-4"
              >
                {" "}
                {years === "--" || Number(years) > 1 ? "years" : "year"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="monthsOutput"
                data-testid="monthsOutput"
                className="block text-6xl text-purple font-poppins-extra-bold-italic mb-4"
              >
                {months}
              </label>
              <span
                data-testid="monthsText"
                className="block text-6xl text-off-black font-poppins-extra-bold-italic mb-4"
              >
                {" "}
                {months === "--" || Number(months) > 1 ? "months" : "month"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="daysOutput"
                data-testid="daysOutput"
                className="block text-6xl text-purple font-poppins-extra-bold-italic mb-4"
              >
                {days}
              </label>
              <span
                data-testid="daysText"
                className="block text-6xl text-off-black font-poppins-extra-bold-italic mb-4"
              >
                {" "}
                {days === "--" || Number(days) > 1 ? "days" : "day"}
              </span>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AgeCalculatorForm;
