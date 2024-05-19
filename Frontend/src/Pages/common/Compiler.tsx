import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
import Editor from "@monaco-editor/react";
import axiosInstance from "@/intersepters/axiosIntersepter";

const Compiler = () => {
  const [languageId, setLanguageId] = useState<number>(63);
  const [response,setResponse]=useState("")
  const editorRef = useRef();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language[] | null>(null);
  const languages = async () => {
    try {
      const data = await axiosInstance.get("/languages");
      setLanguage(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    languages();
  }, []);

  const mount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const runCode = async () => {
    try {
      const test = await axiosInstance.post("/submissions?wait=true", {
        source_code: code,
        language_id: languageId,
      });
      setResponse(test?.data?.stdout)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full">
      <div className=" mt-16 h-[100vh] sm:flex">
        <div className="w-full h-[50%] border border-black sm:w-[50%] sm:h-[100%] bg-white">
          <div className="h-[10vh] border flex justify-between items-center">
            {language ? (
              <select
                name="languages"
                className="ml-8 w-24"
                value={languageId}
                onChange={(e) => setLanguageId(Number(e.target.value))}
              >
                {language.map((value) => (
                  <option value={value.id}>{value.name}</option>
                ))}
              </select>
            ) : (
              <>
                <ScaleLoader />
                <h1 className="font-serif">
                  Please Wait we're Fetching Languages
                </h1>{" "}
              </>
            )}
            <Button className="" onClick={runCode}>
              Run
            </Button>
          </div>
          <div>
            <Editor
              theme="vs-dark"
              height="90.5vh"
              defaultLanguage="javascript"
              defaultValue="console.log('Welcome to Code-Interview')"
              onMount={mount}
              value={code}
              onChange={(value) => setCode(value)}
            />
          </div>
        </div>
        <div className="w-full h-[50%] border border-black sm:w-[50%] sm:h-[100%] ">
          <div className="h-[10vh] flex justify-end items-center">
            <Button onClick={()=>setResponse("")}>Clear</Button>
          </div>
          <div className="bg-[#1E1E1E] h-[90vh]">{response?response:""}</div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;

interface Language {
  id: number;
  name: string;
}
