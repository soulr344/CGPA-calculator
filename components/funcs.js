const parseMarks = (grade) => {
    if (grade === "NG") return 0;
    return (
        0.4 * ["D", "C", "C+", "B", "B+", "A", "A+"].indexOf(grade) +
        1.6
    ).toString().substring(0,4);
};

const getCredit = (arr, id, type = "TH") => {
    return parseFloat(arr[id][(type == "IN") ? "internal_credit" : "theory_credit"])
}

const calculate = (marksObj, compArr, allArr) => {
    let marks = 0
    let totalCredits = 0

    for(let i = 0; i<6; i++){
        let arr = (i<=2) ? compArr : allArr;
        let inCredits = getCredit(arr, marksObj[i].code, "IN")
        let thCredits = getCredit(arr, marksObj[i].code, "TH")

        marks = marks + parseMarks(marksObj[i].TH) * thCredits
        marks = marks + parseMarks(marksObj[i].IN) * inCredits

        totalCredits += inCredits + thCredits
    }

    let CGPA = (marks / totalCredits).toString().substring(0,4);;

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