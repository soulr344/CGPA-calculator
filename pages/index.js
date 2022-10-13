import Head from "next/head";
import { useState } from "react";
import SelectGPA from "../components/SelectGPA";
import SelectSubject from "../components/SelectSubject";
import { calculate, parseGrade } from "../components/funcs";

export default function Home() {
    let [gpa, setGPA] = useState("");
    let [grade, setGrade] = useState("");

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

    return (
        <div className="p-8 rounded-lg bg-white dark:bg-slate-600 dark:text-white max-w-6xl m-auto min-h-[80%]">
            <h1 className="font-semibold text-3xl mb-4">CGPA Calculator</h1>
            <form onSubmit={handleSubmit}>
                {(() => {
                    let arr = [];
                    let i;
                    for (i = 0; i < 6; i++) {
                        arr.push(
                            <div
                                className="mb-4 grid grid-cols-[60%_40%]"
                            >
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
        </div>
    );
}
