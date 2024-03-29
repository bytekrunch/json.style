import { useEffect, useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { createTheme } from "@uiw/codemirror-themes";
import { EditorView } from "@codemirror/view";
import Head from "next/head";
import Toastr from "../components/Toastr";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button";
import Select from "react-select";

const transform = require("lodash.transform");
const isEqual = require("lodash.isequal");
const isArray = require("lodash.isarray");
const isObject = require("lodash.isobject");

import { CODE_EDITOR_THEME } from "../constants/theme";
import {
  DEFAULT_INDENTATION_SPACE,
  DEMO_JSON_STRING,
  INDENTATION_SPACE_OPTIONS,
} from "../components/constants";
import { Copy } from "../icons/Copy";
import { Github } from "../icons/Github";
import Header from "../components/Header";

export default function Home() {
  const [inputString, setInputString] = useState(
    JSON.stringify(DEMO_JSON_STRING)
  );
  const [outputString, setOutputString] = useState("");
  const [diffOrMergeString, setDiffOrMergeString] = useState("");

  const hiddenFileInput = useRef(null);
  const selectRef = useRef(null);

  let editorExtensions = [json(), EditorView.lineWrapping];

  const handleFormat = (indentationSpace = 2) => {
    setDiffOrMergeString("");
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
    setDiffOrMergeString("");
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
      Toastr.success("🦄 Copied to clipboard!");
    } catch (error) {
      Toastr.error("Could not Copy. Try again");
    }
  };

  const handleDemoJson = () => {
    setInputString(JSON.stringify(DEMO_JSON_STRING));
    setOutputString("");
    setDiffOrMergeString("");
  };

  const handleUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => setInputString(e.target.result);
    setOutputString("");
    setDiffOrMergeString("");
  };

  const handleDiff = () => {
    let origObj = JSON.parse(inputString);
    let newObj = JSON.parse(outputString);

    function changes(newObj, origObj) {
      let arrayIndexCounter = 0;
      return transform(newObj, function (result, value, key) {
        if (!isEqual(value, origObj[key])) {
          let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
          result[resultKey] =
            isObject(value) && isObject(origObj[key])
              ? changes(value, origObj[key])
              : value;
        }
      });
    }

    setDiffOrMergeString(JSON.stringify(changes(newObj, origObj), null, 2));
  };

  const handleMerge = () => {
    let origObj = JSON.parse(inputString);
    let newObj = JSON.parse(outputString);
    setDiffOrMergeString(JSON.stringify({ ...origObj, ...newObj }, null, 2));
  };

  useEffect(() => {
    inputString === "" && setOutputString("");
  }, [inputString]);

  return (
    <div>
      <Head>
        <title>JSON formatter</title>
        <meta
          name="description"
          content="Format, validate and beautify JSON data online with our free JSON formatter and validator tool."
        />

        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="keywords"
          content="JSON formatter, JSON validator, online JSON tool, JSON beautifier, JSON syntax checker"
        ></meta>
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/40194401/219963035-0e11bed8-fd1a-427a-93dd-bb73af25d03d.png"
        />
        <meta property="og:title" content="json formatter" />
        <meta property="og:url" content="https://json.style" />
        <meta
          name="twitter:card"
          content="https://user-images.githubusercontent.com/40194401/219963035-0e11bed8-fd1a-427a-93dd-bb73af25d03d.png"
        />
      </Head>

      <main className="flex flex-col justify-between bg-[#111111] pt-3 pb-4 px-4 h-vh">
        <ToastContainer theme="dark" />
        <Header />
        <div className="space-y-3 grow flex flex-col">
          <div className="flex flex-1 relative grow space-x-3">
            <div className="w-full">
              <CodeMirror
                autoFocus
                height="90vh"
                theme={createTheme(CODE_EDITOR_THEME)}
                value={inputString}
                extensions={editorExtensions}
                onChange={(e) => setInputString(e)}
                className="h-full mt-1 overflow-y-scroll"
              />
            </div>
            <div className="w-full relative">
              <Button
                size="medium"
                style="text"
                onClick={handleCopy}
                icon={Copy}
                iconSize="22"
                className="float-right absolute z-10 right-0 top-0"
                disabled={outputString === ""}
              />
              <CodeMirror
                height="90vh"
                theme={createTheme(CODE_EDITOR_THEME)}
                value={outputString}
                onChange={(e) => setOutputString(e)}
                extensions={editorExtensions}
                className="overflow-y-scroll absolute h-full mt-1 w-full"
              />
            </div>
            {diffOrMergeString && (
              <div className="w-full">
                <CodeMirror
                  autoFocus
                  height="90vh"
                  theme={createTheme(CODE_EDITOR_THEME)}
                  value={diffOrMergeString}
                  extensions={editorExtensions}
                  onChange={(e) => setDiffOrMergeString(e)}
                  className="h-full mt-1"
                />
              </div>
            )}
            <div className="flex flex-col min-w-80 w-80 text-center justify-between px-1 rounded">
              <div className="flex flex-col space-y-2 px-1 text-left">
                <label className="text-xs text-[#888888]">Formatting</label>
                <div className="flex flex-col space-y-2">
                  <Button
                    label="Prettify"
                    onClick={() =>
                      handleFormat(selectRef.current.state.value.value)
                    }
                  />
                  <Button label="Clear" onClick={handleClear} />
                  <Button
                    label="Download ↓"
                    onClick={handleDownload}
                    disabled={outputString === ""}
                  />
                  <Button
                    onClick={() => hiddenFileInput.current.click()}
                    label="Upload ↑"
                  />
                  <Button onClick={handleDemoJson} label="Demo JSON" />
                </div>
                <label className="text-xs pt-3 text-[#888888]">
                  Indentation
                </label>
                <div className="flex flex-col">
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
                    menuPlacement="bottom"
                    options={INDENTATION_SPACE_OPTIONS}
                    defaultValue={DEFAULT_INDENTATION_SPACE}
                  />
                </div>
                <label className="text-xs pt-3 text-[#888888]">
                  Operations
                </label>
                <div className="flex flex-col space-y-2">
                  <Button label="Check Diff" onClick={handleDiff} />
                  <Button
                    label="Merge JSON"
                    onClick={() =>
                      handleMerge(selectRef.current.state.value.value)
                    }
                  />
                </div>
              </div>
              <div>
                <a
                  href="https://github.com/bytekrunch/json.style"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github
                    iconSize="22"
                    className="mx-auto opacity-25 hover:opacity-75"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <script
        data-goatcounter="https://json-style.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>
    </div>
  );
}
