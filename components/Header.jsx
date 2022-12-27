import { useState, useEffect } from "react";
import { Settings } from "../icons/Settings";
import Button from "./Button";

const Header = () => {
  // const handleSettings = () => console.log("test")

  return (
    <div className="flex flex-row items-center justify-between h-10 px-10 mb-5">
      <p className="h-min font-mono text-lg bg-gradient-to-br from-fuchsia-500 via-purple-600 to-rose-600 inline-block text-transparent bg-clip-text">&#123; json.style &#125;</p>
      <Button
        size="medium"
        style="secondary"
        // onClick={handleSettings}
        icon={Settings}
        iconSize={20}
        className="float-right align-top"
      />
    </div>
  );
};

export default Header;
