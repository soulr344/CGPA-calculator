import "./globals.scss";
import type { Metadata } from "next";
import { cookies } from "next/dist/client/components/headers";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  authors: [
    { name: "Prajwal Pokharel", url: "https://prajwalpokharel.com.np" },
  ],
  title: "NEB GPA Calculator - Calculate +2 GPA",
  description:
    "Calculate your +2 GPA effortlessly with our NEB-compliant tool. Stay on track, monitor your academic progress, and set new goals. Achieve academic excellence with our user-friendly GPA Calculator. Start calculating your GPA now!",
  keywords:
    "GPA calculator, NEB marking scheme, +2 GPA, 11th grade GPA, 12th grade GPA, grade point average, GPA calculation, GPA tracker, academic progress tracking, scholastic achievement, student tools, educational resources, study tools, academic performance, college admissions, university preparation, high school GPA, credit hours, GPA scale, GPA converter, GPA calculation formula, GPA estimator, GPA calculator online, academic success, calculate grades, GPA calculator tool, academic grading, GPA calculator for students, educational technology, GPA calculation guidelines, GPA calculator Nepal, GPA calculation system, GPA calculator for +2 students",
  openGraph: {
    title: "NEB GPA Calculator - Calculate +2 GPA",
    description:
      "Calculate your +2 GPA effortlessly with our NEB-compliant tool. Stay on track, monitor your academic progress, and set new goals. Achieve academic excellence with our user-friendly GPA Calculator. Start calculating your GPA now!",
    type: "website",
    url: "gpa.prajwalpokharel.com.np",
    images: ["https://gpa.prajwalpokharel.com.np/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEB GPA Calculator - Calculate +2 GPA",
    description:
      "Calculate your +2 GPA effortlessly with our NEB-compliant tool. Stay on track, monitor your academic progress, and set new goals. Achieve academic excellence with our user-friendly GPA Calculator. Start calculating your GPA now!",
    images: ["https://gpa.prajwalpokharel.com.np/og.png"],
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies().get("dark-mode");

  return (
    <html
      lang="en"
      className={
        cookie === undefined
          ? undefined
          : cookie?.value === "true"
          ? "dark"
          : "light"
      }
    >
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
