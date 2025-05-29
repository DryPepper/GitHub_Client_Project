import React, { useState, useEffect } from 'react';
import { cc } from 'utils/combineClasses';
import styles from './styles.module.scss';

interface SearchOption {
  label: string;
  value: string;
  type: 'user' | 'org';
}

const searchOptions: SearchOption[] = [
  { label: 'Organization', value: 'organization', type: 'org' },
  { label: 'User', value: 'user', type: 'user' },
];

interface Props {
  className?: string;
  disabled?: boolean;
  onSelect?: (selected: SearchOption[]) => void;
  defaultOption?: SearchOption;
}

const MultiDropdown: React.FC<Props> = ({ className = '', disabled = false, onSelect, defaultOption }) => {
  const [selected, setSelected] = useState<SearchOption[]>(defaultOption ? [defaultOption] : []);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (option: SearchOption) => {
    const updatedSelection = [option];
    setSelected(updatedSelection);
    setIsOpen(false);
  };

  useEffect(() => {
    onSelect?.(selected);
  }, [selected]);

  return (
    <div
      className={cc(
        styles.multiDropdown,
        disabled && styles.disabled,
        isOpen && styles.focus,
        className
      )}
    >
      <div
        className={cc(
          styles.control,
          disabled && styles.disabled,
          isOpen && styles.focus
        )}
        onClick={handleToggle}
      >
        <div className={styles.selectedValues}>
          {selected.length ? selected[0].label : 'Select organization or user'}
        </div>
        <div className={styles.arrow}>▼</div>
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {searchOptions.map((option) => (
            <li
              key={`${option.value}-${option.type}`}
              className={cc(
                styles.item,
                selected.some(s => s.value === option.value && s.type === option.type) && styles.selected
              )}
              onClick={() => handleSelect(option)}
            >
              {option.label} ({option.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
