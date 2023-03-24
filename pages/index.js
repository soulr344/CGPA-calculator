import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import SelectGPA from "../components/SelectGPA";
import SelectSubject from "../components/SelectSubject";
import { calculate, parseGrade } from "../components/funcs";
import { AppContext } from "../components/ApplicationContext";
import {
  SUB_11_COMP_SUBS,
  SUB_11_DETAILS_ASC,
  SUB_12_COMP_SUBS,
  SUB_12_DETAILS_ASC,
} from "../components/subjects";

export default function Home() {
  let [gpa, setGPA] = useState("");
  let [grade, setGrade] = useState("");

  let [helpHidden, setHelpHidden] = useState("opacity-0 hidden");
  let [darkMode, setDarkMode] = useState(false);

  let checkRef = useRef(null);

  useEffect(() => {
    /** if the page is being served via an iframe, dont access localstorage */
    if (window.location !== window.parent.location) return;

    let dark = "true" == (localStorage.getItem("isDarkMode") || "false");
    if (dark) {
      localStorage.setItem("isDarkMode", (!dark).toString());
      toggleDarkMode();
      console.log("Dark");
    }
  }, []);

  let [subArray, setSubArray] = useState(SUB_11_DETAILS_ASC);
  let [compSubArray, setCompSubArray] = useState(SUB_11_COMP_SUBS);

  let providerValue = useMemo(
    () => ({ subArray, compSubArray }),
    [subArray, compSubArray]
  );

  const handleClassChange = (e) => {
    switch (parseInt(e.target.value)) {
      case 12:
        setSubArray(SUB_12_DETAILS_ASC);
        setCompSubArray(SUB_12_COMP_SUBS);
        break;
      default:
        setSubArray(SUB_11_DETAILS_ASC);
        setCompSubArray(SUB_11_COMP_SUBS);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    let marks = [];
    for (let i = 0; i < 6; i++) {
      marks.push({
        code: data.get("sub-" + i),
        TH: data.get("sub-" + i + "-TH"),
        IN: data.get("sub-" + i + "-IN"),
      });
    }

    let GPA = calculate(marks, compSubArray, subArray);
    setGPA(GPA);
    setGrade(parseGrade(GPA));
  };

  const openHelp = () => {
    setHelpHidden("opacity-0");
    setTimeout(() => {
      setHelpHidden("");
    }, 50);
  };

  const closeHelp = () => {
    setHelpHidden("opacity-0");
    setTimeout(() => {
      setHelpHidden("opacity-0 hidden");
    }, 150);
  };

  const toggleDarkMode = () => {
    console.log("Dark: ", !darkMode);
    setDarkMode((curVal) => !curVal);
    localStorage.setItem("isDarkMode", (!darkMode).toString());
    document.body.parentElement.classList.toggle("dark", !darkMode);
    checkRef.current.checked = !darkMode;
  };

  return (
    <>
      <Head>
        <title>CGPA Calculator</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Calculate CGPA according to NEB 10+2 latest marking strategy in Nepal."
        />
        <meta
          name="keywords"
          content="CGPA Calculator,NEB GPA,GPA Calculator,neb gpa calculator,gpa calculator neb,neb,gpa calculator 12,gpa calculator 11,cgpa 12,nepal,gpa,cgpa,12,11"
        />
        <meta
          property="og:description"
          content="Calculate CGPA according to NEB 10+2 latest marking strategy in Nepal."
        />
        <meta property="og:url" content="https://cgpa.prajwalpokharel.com.np/" />
        <meta property="og:site_name" content="CGPA Calculator" />
        <meta
          property="og:image:url"
          content="https://cgpa.prajwalpokharel.com.np/og.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="CGPA Calculator" />
        <meta
          name="twitter:image"
          content="https://cgpa.prajwalpokharel.com.np/og.png"
        />
      </Head>
      <AppContext.Provider value={providerValue}>
        <div className="pb-0 shadow-xl rounded-lg bg-white dark:bg-slate-700 dark:text-white w-[clamp(320px,90%,700px)] m-auto min-h-[80%]">
          <form
            onSubmit={handleSubmit}
            className="w-[clamp(310px,90%,600px)] mx-auto "
          >
            <div className="flex justify-between items-baseline mt-10 mb-4">
              <h1 className="flex-auto font-semibold text-3xl flex-2/3">
                CGPA Calculator
              </h1>
              <button
                className="whitespace-nowrap text-blue-500 underline underline-offset-2 font-medium h-min"
                onClick={openHelp}
              >
                How to use?
              </button>
            </div>
            <div className="flex items-center container border-2 border-gray-300 rounded-lg p-4 mb-4">
              <label
                htmlFor="countries"
                className="block text-sm font-semibold text-gray-900 dark:text-gray-300"
              >
                Grade:
              </label>
              <select
                onChange={handleClassChange}
                name="class"
                className="ml-9 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option key={1} value="11">
                  11
                </option>
                <option key={2} value="12">
                  12
                </option>
              </select>
            </div>
            {(() => {
              let arr = [];
              let i;
              for (i = 0; i < 6; i++) {
                arr.push(
                  <div className="mb-4 grid grid-cols-[60%_40%]">
                    <SelectSubject isComp={i} selectName={"sub-" + i} />
                    <SelectGPA selectName={"sub-" + i} />
                  </div>
                );
              }
              return arr;
            })()}
            <input
              className="bg-blue-600 hover:bg-blue-800 transition-colors text-white font-bold py-2 px-4 rounded"
              type="submit"
              value={"Calculate"}
            />
            <div className="p-4 mt-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800">
              <span className="font-bold">CGPA:</span> {gpa}
              <br />
              <span className="font-bold">Grade:</span> {grade}
            </div>
          </form>
          <div className="p-4 mt-4 text-sm bg-blue-500 rounded-lg rounded-t-none text-white text-center">
            Made with ❤️ by{" "}
            <a
              className="font-medium underline"
              href="https://prajwalpokharel.com.np"
            >
              Prajwal Pokharel
            </a>
          </div>
        </div>
      </AppContext.Provider>
      <div
        onClick={(e) => closeHelp()}
        className={
          "transition fixed z-10 bg-black bg-opacity-80 inset-0 grid place-items-center " +
          helpHidden
        }
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="overflow-y-auto p-8 shadow-xl rounded-lg bg-white dark:bg-slate-700 dark:text-white w-[clamp(320px,90%,700px)] m-auto max-h-[80%]"
        >
          <div className="flex justify-between items-baseline mb-8">
            <h1 className="font-semibold text-3xl">How to use?</h1>
            <button
              className="text-black dark:text-blue-500 text-2xl font-bold h-min"
              onClick={() => closeHelp()}
            >
              &#10005;
            </button>
          </div>

          <div className="container p-3 mb-4 rounded-xl border-2 border-gray-300">
            <span className="block font-medium pb-3">Change Theme</span>
            <label
              htmlFor="default-toggle"
              className="flex relative items-center cursor-pointer"
            >
              <input
                ref={checkRef}
                type="checkbox"
                value=""
                id="default-toggle"
                className="sr-only peer"
                onChange={toggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Dark Mode
              </span>
            </label>
          </div>

          <p className="text-justify mb-4">
            First of all, select the desired subjects. The top 3 subjects are
            reserved for compulsory subjects (English, Nepali, Maths or Social
            Studies). The rest 3 are for optional subjects.
          </p>
          <p className="text-justify mb-10">
            Then, select the GPA for all subjects taking note that the GPA for{" "}
            <strong>Theory (TH)</strong> and for <strong>Internal (IN)</strong>{" "}
            cannot be interchanged. After completing, click the{" "}
            <strong>&quot;Calculate&quot;</strong> button and your CGPA along
            with your grade will be displayed.
          </p>

          <p className="text-justify mb-4">
            <strong>Note:</strong> Selecting different subjects and/or inserting
            values of Theory subjects in Internal field and vice-versa will
            result in inaccurate results.
          </p>
          <p className="text-justify">
            This is because each subject, along with Theory and Internal have
            different credit hours. Because of this, misselection of subjects
            and/or GPAs, will result in inaccurate result (it&apos;s not
            incorrect tho technically, Garbage In Garbage Out lol).
          </p>
          <div className="mt-10">
            <img
              alt="Formula to calculate CGPA"
              src="/eqn.svg"
              className="h-auto w-5/6 mx-auto dark:invert"
            />
          </div>

          <p className="text-justify mt-8">
            For bug reports/feature addition, contact me.
          </p>
          <div className="p-4 container border-2 border-gray-300 rounded-lg">
            <span className="block font-semibold text-lg">Contact Me:</span>
            <div className="ml-1">
              <a
                className="text-blue-500 font-bold underline block whitespace-nowrap"
                href="https://prajwalpokharel.com.np"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-globe2 inline mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                </svg>
                Website
              </a>
            </div>
            <div className="ml-1">
              <a
                className="text-blue-500 font-bold underline block whitespace-nowrap"
                href="mailto:prajwal@prajwalpokharel.com.np"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope-fill inline mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
                Email
              </a>
            </div>
            <div className="ml-1">
              <a
                className="text-blue-500 font-bold underline block whitespace-nowrap"
                href="https://github.com/soulr344/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github inline mr-3"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Github
              </a>
            </div>
            <span className="mt-3 block">
              Check the source code at
              <a
                className="ml-1 text-blue-500 font-bold underline"
                href="https://github.com/soulr344/cgpa-calculator"
              >
                Github.
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
