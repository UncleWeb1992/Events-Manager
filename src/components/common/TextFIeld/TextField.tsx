import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  value: string;
  error?: string;
  onChange: (text: string, fieldName?: string) => void;
  placeholder?: string;
  label?: string;
  fieldName?: string;
  required?: boolean;
}

const TextField: FC<TextFieldProps> = ({
  onChange,
  value,
  error,
  placeholder,
  fieldName,
  required,
}) => {
  const [err, setErr] = useState("");
  const hadleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setErr("");
    onChange(value, fieldName);
  };

  const handleBlur = () => {
    if (!value.trim().length && required) {
      setErr("Поле обязательно для ввода");
    }
  };

  useEffect(() => {
    error && setErr(error);
  }, [error]);

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={hadleChange}
        onBlur={handleBlur}
        maxLength={240}
        name={fieldName}
      />
      {!!err && <span className={styles.error}>{err}</span>}
    </div>
  );
};

export default TextField;
