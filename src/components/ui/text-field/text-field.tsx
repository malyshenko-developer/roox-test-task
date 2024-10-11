import React from "react";
import styles from './text-field.module.scss';

interface TextFieldProps {
    label: string;
    value: string;
    disabled: boolean;
    name?: string;
    multiline?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, disabled, onChange, name, multiline }) => {
  return (
    <label className={styles.textField}>
        <span>{label}</span>
        {
          multiline ? (
            <textarea
                value={value}
                disabled={disabled}
                onChange={onChange}
                name={name}
            />
          ) : (
            <input
                type="text"
                value={value}
                disabled={disabled}
                required
                onChange={onChange}
                name={name}
                onInvalid={(e) => e.preventDefault()}
            />
          )
        }
    </label>
  )
}

export default TextField;