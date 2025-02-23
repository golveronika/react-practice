// src/ui/Button.tsx

import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;  // Содержимое кнопки
  variant?: 'primary' | 'unstyled'; // Варианты стилей
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', disabled = false, ...props }) => {
  return (
    <button
    
      onClick={onClick}
      disabled={disabled}
      {...props}  // Передаем остальные атрибуты
      className={`${styles.button} ${styles[variant]} ${props?.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
