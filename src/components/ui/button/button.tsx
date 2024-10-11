import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    accent?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, accent, type='button', children }) => {
  const buttonClass = accent ? `${styles.button} ${styles.accent}` : styles.button;
  return (
    <button type={type} className={buttonClass} onClick={onClick} disabled={disabled}>
        {children}
    </button>
  )
}

export default Button;