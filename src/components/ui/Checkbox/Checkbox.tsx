import React from 'react';
import styles from './styles.module.scss';
import { cc } from 'utils/combineClasses';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = ({ className, ...props }) => {
  return (
    <label className={cc(styles.checkboxLabel, className)}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        {...props}
      />
      <span className={styles.checkboxCustom} />
    </label>
  );
};

export default Checkbox;
