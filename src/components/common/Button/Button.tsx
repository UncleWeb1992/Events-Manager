import { FC, ButtonHTMLAttributes, CSSProperties } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  css?: CSSProperties;
}

const Button: FC<ButtonProps> = ({ text, css, ...rest }) => {
  return (
    <button style={css} {...rest} className={styles.Button}>
      {text}
    </button>
  );
};

export default Button;
