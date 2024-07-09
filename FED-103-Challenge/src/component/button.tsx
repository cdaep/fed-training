import React, { useState, useEffect, useRef } from "react";

const Button: React.FC = () => {
  const [textMessage, setTextMessage] = useState<string[] | null>(null);
  const inputE1 = useRef<HTMLInputElement | null>(null);
  const iconErrorE1 = useRef<HTMLElement | null>(null);
  const textMessageE1 = useRef<HTMLElement | null>(null);
  const RegEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  useEffect(() => {
    inputE1.current = document.querySelector("#email") as HTMLInputElement;
    iconErrorE1.current = document.querySelector(".icon-error") as HTMLElement;
    textMessageE1.current = document.querySelector(
      ".text-message"
    ) as HTMLElement;
  }, []);

  useEffect(() => {
    if (textMessage) {
      const isSuccess =
        textMessage.length > 0 && textMessage[0].includes("Thank");

      // Show error icon
      if (iconErrorE1.current) {
        iconErrorE1.current.style.display = isSuccess ? "none" : "block";
      }
      // Show error text
      if (textMessageE1.current) {
        textMessageE1.current.innerText =
          textMessage.length > 0 ? textMessage[0] : "";
        textMessageE1.current.classList.toggle("text-success", isSuccess);
      }
    }
  }, [textMessage]); 



  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Validate email address
    const emailValue = inputE1.current?.value.trim(); //removes white spaces from both ends of string

    if (!emailValue) {
      setTextMessage(["Please provide us your email"]);
    } else if (!RegEmail.test(emailValue)) {
      setTextMessage(["Please provide us a valid email"]);
    } else {
      setTextMessage(["Thank you for subscribing to our newsletter."]);
    }
  };

  return (
    <button type="button" id="submit" onClick={handleClick}>
      <img src="/icon-arrow.svg" alt="icon-arrow" />
    </button>
  );
};

export default Button;
