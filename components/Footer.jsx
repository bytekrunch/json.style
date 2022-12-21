import { useState, useEffect } from "react";
import { FOOTER_MESSAGES } from "./constants";

const Footer = () => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * FOOTER_MESSAGES.length));
  }, []);

  return (
    <div className="absolute bottom-0 flex flex-col space-y-0 w-screen text-center h-10 px-10 my-5">
      <span className="italic text-slate-500">
        {FOOTER_MESSAGES[randomNumber]}
      </span>
      <span>Made with 💔 </span>
    </div>
  );
};

export default Footer;
