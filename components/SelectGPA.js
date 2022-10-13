import { GRADES } from "../pages/subjects";

export default function SelectGPA(props) {
    return (
        <div className="flex justify-evenly">
            <div>
                <label
                    htmlFor="countries"
                    className="block mb-2 text-center text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                    TH:
                </label>
                <select
                    name={props.selectName + "-TH"}
                    className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {GRADES.map((grade, key) => {
                        return (
                            <option key={key} value={grade}>
                                {grade}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div>
                <label
                    htmlFor="countries"
                    className="block mb-2 text-center text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                    IN:
                </label>
                <select
                    name={props.selectName + "-IN"}
                    className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {GRADES.map((grade, key) => {
                        return (
                            <option value={grade} key={key}>
                                {grade}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
