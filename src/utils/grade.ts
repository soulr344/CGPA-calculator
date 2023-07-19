import {
  GRADES,
  GRADES_DATA,
  SUBJECT_DATA,
  SUBJECT_DETAILS,
} from "@/data/data";
import { DataStore } from "@/store/dataStore";

export function calculateResult(data: DataStore) {
  const subjects: SUBJECT_DETAILS = [];
  const subjectGrades: number[] = [];

  let total_credits = 0;
  let total_marks = 0;

  for (let i = 0; i < 6; i++) {
    const selectedSubject =
      SUBJECT_DATA[data.grade][i < 3 ? "compulsory" : "optional"][
        data.subjects[i]
      ];

    const in_credits = parseFloat(selectedSubject.internal_credit);
    const th_credits = parseFloat(selectedSubject.theory_credit);
    const in_grade = GRADES_DATA.filter(
      (grades) => grades.grade === GRADES[data.inGrades[i]]
    )[0].gradePoint;
    const th_grade = GRADES_DATA.filter(
      (grades) => grades.grade === GRADES[data.thGrades[i]]
    )[0].gradePoint;

    const subGPA =
      (in_credits * in_grade + th_credits * th_grade) /
      (th_credits + in_credits);

    total_marks += in_credits * in_grade + th_credits * th_grade;
    total_credits += th_credits + in_credits;
    subjectGrades.push(subGPA);
    subjects.push(selectedSubject);
  }

  const GPA = Math.floor((total_marks * 100) / total_credits) / 100;

  return {
    gpa: GPA,
    subjects,
    subjectGrades,
  };
}

export function getGradeFromGradePoint(GPA: string | number) {
  let gpa = typeof GPA === "number" ? GPA : parseFloat(GPA);

  if (gpa <= 0.8) return "NG";
  else if (gpa <= 1.2) return "D";
  else if (gpa <= 1.6) return "D+";
  else if (gpa <= 2.2) return "C";
  else if (gpa <= 2.4) return "C+";
  else if (gpa <= 2.8) return "B";
  else if (gpa <= 3.2) return "B+";
  else if (gpa <= 3.6) return "A";
  else if (gpa <= 4.0) return "A+";
  else return "Invalid GPA";
}

export function getGradePointFromGrade(grade: string) {
  return GRADES_DATA.filter((grades) => grades.grade === grade)[0].gradePoint;
}
