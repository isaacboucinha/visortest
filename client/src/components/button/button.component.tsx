import React from 'react';
import type { MouseEventHandler } from 'react';
import styles from './button.module.css';

interface ButtonProps extends React.PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${styles.button} font-bold py-2 px-4 border-b-4  rounded`}
    >
      {props.children}
    </button>
  );
};

export default Button;
