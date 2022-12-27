import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { createTheme } from "@uiw/codemirror-themes";
import { EditorView } from "@codemirror/view";
import Head from "next/head";
import Toastr from "../components/Toastr";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button";

import { CODE_EDITOR_THEME } from "../constants/theme";
import { DEMO_JSON_STRING } from "../components/constants";
import { Copy } from "../icons/Copy";

export default function Home() {
  const [inputString, setInputString] = useState(
    JSON.stringify(DEMO_JSON_STRING)
  );
  const [outputString, setOutputString] = useState("");

  let editorExtensions = [javascript({ jsx: true }), EditorView.lineWrapping];

  const handleFormat = () => {
    try {
      setOutputString(JSON.stringify(JSON.parse(inputString), null, 2));
    } catch (error) {
      Toastr.error("Enter Valid JSON");
    }
  };

  const handleClear = () => {
    setInputString("");
    setOutputString("");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([outputString], {
      type: "text/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "json.json";
    document.body.appendChild(element);
    element.click();
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(outputString);
      Toastr.success("Copied to clipboard");
    } catch (error) {
      Toastr.error("Could not Copy. Try again");
    }
  };

  const handleDemoJson = () => {
    setInputString(JSON.stringify(DEMO_STRING));
    setOutputString("");
  };

  useEffect(() => {
    inputString === "" && setOutputString("");
  }, [inputString]);

  return (
    <div className="h-screen flex-col justify-between bg-zinc-900 p-5">
      <Head>
        <title>JSON Style</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer theme="dark" />
        <p className="text-2xl text-center">JSON STYLE</p>
        <div className="space-y-3 flex-col">
          <div className="flex space-x-3 h-90">
            <div className="w-full bg-[#282c34]">
              <Button
                size="small"
                style="text"
                label="Demo JSON"
                onClick={handleDemoJson}
              />
              <CodeMirror
                autoFocus
                height="548px"
                theme="dark"
                value={inputString}
                extensions={editorExtensions}
                onChange={(e) => setInputString(e)}
                className="h-full mt-1"
              />
            </div>
            <div className="w-full bg-[#282c34]">
              <Copy className="ml-auto py-2" size={30} onClick={handleCopy} />
              <CodeMirror
                height="548px"
                theme={createTheme(CODE_EDITOR_THEME)}
                editable={false}
                value={outputString}
                extensions={editorExtensions}
                className="overflow-auto h-full"
              />
            </div>
          </div>
          <div className="flex bg-zinc-800 space-x-3 px-3 py-3 rounded spacy-x-2">
            <Button label="Format" onClick={handleFormat} />
            <Button label="Clear" onClick={handleClear} />
            <Button label="Download" onClick={handleDownload} />
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </div>
  );
}
