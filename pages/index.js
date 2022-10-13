import Head from "next/head";
import { useState } from "react";
import SelectGPA from "../components/SelectGPA";
import SelectSubject from "../components/SelectSubject";
import { calculate, parseGrade } from "../components/funcs";
import Image from "next/image";

export default function Home() {
    let [gpa, setGPA] = useState("");
    let [grade, setGrade] = useState("");

    let [hidden, setHidden] = useState("opacity-0 hidden");

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

        let GPA = calculate(marks);
        setGPA(GPA);
        setGrade(parseGrade(GPA));
    };

    const openHelp = () => {
        setHidden("opacity-0");
        setTimeout(() => {
            setHidden("")
        }, 50)
    };

    const closeHelp = () => {
        setHidden("opacity-0");
        setTimeout(() => {
            setHidden("opacity-0 hidden")
        }, 150)
    };

    return (
        <>
            <Head>
                <title>CGPA Calculator</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="description" content="Calculate CGPA according to NEB 10+2 latest marking strategy in Nepal." />
            </Head>
            <div className="pb-0 shadow-xl rounded-lg bg-white dark:bg-slate-700 dark:text-white w-[clamp(320px,90%,700px)] m-auto min-h-[80%]">
                <form
                    onSubmit={handleSubmit}
                    className="w-[clamp(310px,90%,600px)] mx-auto "
                >
                    <div className="flex justify-between items-baseline mt-10 mb-4">
                        <h1 className="font-semibold text-3xl">
                            CGPA Calculator
                        </h1>
                        <button
                            className="text-blue-500 underline underline-offset-2 font-medium h-min"
                            onClick={openHelp}
                        >
                            How to use?
                        </button>
                    </div>
                    {(() => {
                        let arr = [];
                        let i;
                        for (i = 0; i < 6; i++) {
                            arr.push(
                                <div className="mb-4 grid grid-cols-[60%_40%]">
                                    <SelectSubject
                                        isComp={i}
                                        selectName={"sub-" + i}
                                    />
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
            <div onClick={e => closeHelp()} className={"transition fixed z-10 bg-black bg-opacity-80 inset-0 grid place-items-center " + hidden}>
                <div onClick={e => e.stopPropagation()} className="p-8 shadow-xl rounded-lg bg-white dark:bg-slate-700 dark:text-white w-[clamp(320px,90%,700px)] m-auto min-h-[80%]">
                    <div className="flex justify-between items-baseline mb-8">
                        <h1 className="font-semibold text-3xl">
                            How to use?
                        </h1>
                        <button
                            className="text-black dark:text-blue-500 text-2xl font-bold h-min"
                            onClick={() => closeHelp()}
                        >
                            &#10005;
                        </button>
                    </div>

                    <p className="mb-4">
                        First of all, select the desired subjects. The top 3 subjects are reserved for compulsory subjects (English, Nepali, Maths or Social Studies). The rest 3 are for optional subjects.
                    </p>
                    <p className="mb-10">
                        Then, select the GPA for all subjects taking note that the GPA for <strong>Theory (TH)</strong> and for <strong>Internal (IN)</strong> cannot be interchanged. After completing, click the <strong>&quot;Calculate&quot;</strong> button and your CGPA along with your grade will be displayed.
                    </p>

                    <p className="mb-4">
                        <strong>Note:</strong> Selecting different subjects and/or inserting values of Theory subjects in Internal field and vice-versa will result in inaccurate results.
                    </p>
                    <p>
                        This is because each subject, along with Theory and Internal have different credit hours. Because of this, misselection of subjects and/or GPAs will result in inaccurate result (it&apos;s not incorrect tho technically, Garbage In Garbage Out lol).
                    </p>
                    <div className="mt-10">
                        <img src="/eqn.svg" className="h-auto w-5/6 mx-auto" />
                    </div>

                    <p className="mt-8">
                        For bug reports/feature addition, send mail to <a className="text-blue-500 font-bold underline" href="mailto:prajwal@prajwalpokharel.com.np">prajwal@prajwalpokharel.com.np</a> or visit <a className="text-blue-500 font-bold underline" href="https://github.com/soulr344/cgpa-calculator">Github</a>
                    </p>
                </div>
            </div>
        </>
    );
}
