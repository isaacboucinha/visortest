import React from 'react';
import styles from './conditional.module.css';

interface ConditionalProps extends React.PropsWithChildren {
  showIf: boolean;
}

const Conditional = (props: ConditionalProps): JSX.Element => {
  return (
    <div className={props.showIf ? styles.visible : styles.hidden}>
      {props.children}
    </div>
  );
};

export default Conditional;
