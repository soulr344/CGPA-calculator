import c from "classnames";
import styles from "./Button.module.scss";

export default function Button({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={c(className, styles.button)} {...props}>
      {children}
    </button>
  );
}
