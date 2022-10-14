import { useContext } from "react";
import { AppContext } from "./ApplicationContext";

export default function SelectSubject(props) {
    let {subArray, compSubArray} = useContext(AppContext)
    let arr = (props.isComp >= 3) ? subArray : compSubArray; 
    return (
        <div> 
            <label htmlFor="countries" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300">Subject:</label>
            <select name={props.selectName} className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {arr.map((subject, key) => {
                    return <option value={key} key={key}>{subject.name}</option>;
                })}
            </select>
        </div>
    );
}
