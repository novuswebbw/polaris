import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Choice, {helpTextID} from '../Choice';
import * as styles from './RadioButton.scss';

export interface Props {
  /** Label for the radio button */
  label: string,
  /** Visually hide the label */
  labelHidden?: boolean,
  /** Radio button is selected */
  checked?: boolean,
  /** Additional text to aid in use */
  helpText?: React.ReactNode,
  /** Disable input */
  disabled?: boolean,
  /** ID for form input */
  id?: string,
  /** Name for form input */
  name?: string,
  /** Value for form input */
  value?: string,
  /** Callback when the radio button is toggled */
  onChange?(newValue: boolean, id: string): void,
  /** Callback when radio button is focussed */
  onFocus?(): void,
  /** Callback when focus is removed */
  onBlur?(): void,
}

const getUniqueID = createUniqueIDFactory('RadioButton');

export default function RadioButton({
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id = getUniqueID(),
  name = id,
  value,
}: Props) {
  function handleChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
    if (onChange == null) { return; }
    onChange(currentTarget.checked, id);
  }

  const describedBy = helpText
    ? helpTextID(id)
    : null;

  return (
    <Choice label={label} labelHidden={labelHidden} id={id} helpText={helpText}>
      <div className={styles.RadioButton}>
        <input
          id={id}
          name={name}
          value={value}
          type="radio"
          checked={checked}
          disabled={disabled}
          className={styles.Input}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-describedby={describedBy}
        />
        <div className={styles.Backdrop} />
        <div className={styles.Icon} />
      </div>
    </Choice>
  );
}
