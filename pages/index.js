import { useEffect, useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { createTheme } from "@uiw/codemirror-themes";
import { EditorView } from "@codemirror/view";
import Head from "next/head";
import Toastr from "../components/Toastr";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button";
import Select from "react-select";

import { CODE_EDITOR_THEME } from "../constants/theme";
import {
  DEFAULT_INDENTATION_SPACE,
  DEMO_JSON_STRING,
  INDENTATION_SPACE_OPTIONS,
} from "../components/constants";
import { Copy } from "../icons/Copy";
import Header from "../components/Header";

export default function Home() {
  const [inputString, setInputString] = useState(
    JSON.stringify(DEMO_JSON_STRING)
  );
  const [outputString, setOutputString] = useState("");

  const hiddenFileInput = useRef(null);
  const selectRef = useRef(null);

  let editorExtensions = [javascript({ jsx: true }), EditorView.lineWrapping];

  const handleFormat = (indentationSpace = 2) => {
    try {
      setOutputString(
        JSON.stringify(JSON.parse(inputString), null, indentationSpace)
      );
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
    setInputString(JSON.stringify(DEMO_JSON_STRING));
    setOutputString("");
  };

  const handleUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => setInputString(e.target.result);
    setOutputString("");
  };

  useEffect(() => {
    inputString === "" && setOutputString("");
  }, [inputString]);

  return (
    <div>
      <Head>
        <title>JSON Style</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col justify-between bg-zinc-900 p-5">
        <ToastContainer theme="dark" />
        <Header />
        <div className="space-y-3 grow flex flex-col">
          <div className="flex grow space-x-3">
            <div className="w-full bg-[#282c34]">
              <Button
                size="small"
                style="text"
                label="Demo JSON"
                onClick={handleDemoJson}
              />
              <CodeMirror
                autoFocus
                height="590px"
                theme="dark"
                value={inputString}
                extensions={editorExtensions}
                onChange={(e) => setInputString(e)}
                className="h-full mt-1"
              />
            </div>
            <div className="w-full bg-[#282c34]">
              <Button
                size="small"
                style="text"
                onClick={handleCopy}
                icon={Copy}
                className="float-right"
                disabled={outputString === ""}
              />
              <CodeMirror
                height="590px"
                theme={createTheme(CODE_EDITOR_THEME)}
                editable={false}
                value={outputString}
                extensions={editorExtensions}
                className="overflow-auto h-full mt-7"
              />
            </div>
          </div>
          <div className="flex justify-end bg-zinc-800 space-x-3 px-3 py-3 rounded">
            <Button
              label="Format"
              onClick={() => handleFormat(selectRef.current.state.value.value)}
            />
            <Button label="Clear" onClick={handleClear} />
            <Button
              label="Download"
              onClick={handleDownload}
              disabled={outputString === ""}
            />
            <Button
              onClick={() => hiddenFileInput.current.click()}
              label="Upload"
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleUpload}
            />
            <Select
              ref={selectRef}
              classNamePrefix="react-select"
              onChange={(e) => handleFormat(e.value)}
              className={"react-select__container"}
              menuPlacement="top"
              options={INDENTATION_SPACE_OPTIONS}
              defaultValue={DEFAULT_INDENTATION_SPACE}
            />
          </div>
        </div>
        {/* <Footer /> */}
      </main>
      <script data-goatcounter="https://json-style.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
    </div>
  );
}
