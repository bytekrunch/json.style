import { useState, useEffect } from 'react';

const Footer = () => {
  let messages = [
    "Cars Are Now Designed to Keep Dogs Safe on Hot Days",
    "Penguins Propose and Stick Together for Life",
    "Baby Sloths Are Addicted to Cuddling",
    "A Group of Bunnies Is Called a Fluffle",
  ];

  const [randomNumber, setRandomNumber] = useState(undefined);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * messages.length));
  }, []);

  return (
    <div className="absolute bottom-0 flex flex-col space-y-0 w-screen text-center h-10 px-10 my-5">
      <span className='italic text-slate-500'>"{messages[randomNumber]}"</span>
      <span text-black>Made with 💔 </span>
    </div>
  )
}

export default Footer;