import { useState, useEffect } from "react";
import { Settings } from "../icons/Settings";
import Button from "./Button";

const Header = () => {
  // const handleSettings = () => console.log("test")

  return (
    <div className="flex flex-row items-center justify-between h-10 pr-5 mb-5">
      <p className="h-min text-lg font-mono bg-gradient-to-br from-fuchsia-500 via-purple-600 to-rose-600 inline-block text-transparent bg-clip-text">&#123;&nbsp;json.style&nbsp;&#125;</p>
      <p className="underline text-lg">about</p>
    </div>
  );
};

export default Header;
