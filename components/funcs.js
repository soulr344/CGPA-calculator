import { SUB_11_COMP_SUBS, SUB_11_DETAILS_ASC,  } from "./subjects";

const parseMarks = (grade) => {
    if (grade === "NG") return 0;
    return (
        0.4 * ["D", "D+", "C", "C+", "B", "B+", "A", "A+"].indexOf(grade) +
        1.2
    ).toFixed(2);
};

const getCredit = (id, type = "TH", COMP = false) => {
    let arr = (COMP) ? SUB_11_COMP_SUBS : SUB_11_DETAILS_ASC;
    return parseFloat(arr[id][(type == "IN") ? "internal_credit" : "theory_credit"])
}

const calculate = (marksObj) => {
    let marks = 0
    let totalCredits = 0

    for(let i = 0; i<6; i++){
        let inCredits = getCredit(marksObj[i].code, "IN", i <= 2)
        let thCredits = getCredit(marksObj[i].code, "TH", i <= 2)
        console.log(inCredits, thCredits)

        marks = marks + parseMarks(marksObj[i].TH) * thCredits
        marks = marks + parseMarks(marksObj[i].IN) * inCredits

        totalCredits += inCredits + thCredits
    }

    let CGPA = (marks / totalCredits).toFixed(2);

    return CGPA;
};

const parseGrade = (GPA) => {
    let gpa = (typeof GPA === "number") ? GPA : parseFloat(GPA);

    if (gpa <= 0.8) return "NG"
    else if (gpa <= 1.2 ) return "D"
    else if (gpa <= 1.6 ) return "D+"
    else if (gpa <= 2.2 ) return "C"
    else if (gpa <= 2.4 ) return "C+"
    else if (gpa <= 2.8 ) return "B"
    else if (gpa <= 3.2 ) return "B+"
    else if (gpa <= 3.6 ) return "A"
    else if (gpa <= 4.0 ) return "A+"
    else return "Invalid GPA"
}

export {calculate, parseGrade}