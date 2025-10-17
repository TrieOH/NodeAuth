import { useState } from "react";
import EyeIcon from "../Icons/EyeIcon";
import EyeClosedIcon from "../Icons/EyeClosedIcon";
import type { RuleStatus } from "../../../utils/field-validator";

interface BasicInputFieldProps {
  /** The Input ID/Name */
  name: string;
  /** The label text (name of the field) */
  label: string;
  /** The placeholder text (a default text to help the user) */
  placeholder: string;
  /** Input Type */
  type?: "text" | "email" | "number" | "password";
  /** Current Input Value */
  value?: string;
  /** Current Input Value On Change */
  onValueChange?: (value: string) => void;
  /** AutoComplete */
  autoComplete?: string;
  /** Validations and their results */
  rulesStatus?: RuleStatus[];
  /** Form submission status */
  submitted?: boolean;
  /** Ref to the input element */
  inputRef?: React.Ref<HTMLInputElement>;
}
export default function BasicInputField({
  name,
  label,
  placeholder,
  type = "text",
  value,
  onValueChange,
  autoComplete,
  rulesStatus = [],
  submitted = false,
  inputRef,
}: BasicInputFieldProps) {
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const hasAnyFailing = rulesStatus.some(r => !r.passed);
  return (
    <div className="trieoh trieoh-input">
      <label htmlFor={name} className="trieoh-input__label">
        {label}
      </label>
      <div 
        className={
          ((hasAnyFailing && submitted) ? "trieoh-input__container--error " : "")
          + "trieoh-input__container"
        }
      >
        <input 
          type={isSecretVisible ? "text" : type} 
          name={name} 
          id={name} 
          placeholder={placeholder}
          onChange={(e) => onValueChange && onValueChange(e.target.value)}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={hasAnyFailing && submitted}
          ref={inputRef}
          className="trieoh-input__container-field" 
        />
        {type === "password" && (
          isSecretVisible ?
            <EyeClosedIcon 
              className="trieoh-input__container-icon" 
              onClick={() => setIsSecretVisible(false)} 
            />
          :
            <EyeIcon 
              className="trieoh-input__container-icon"
              onClick={() => setIsSecretVisible(true)} 
            />
          )
        }
      </div>

      <div className="trieoh-input__hint">
        {rulesStatus.map((r, i) => {
          const classes = [
            "hint-part",
            r.passed ? "passed" : "",
            !r.passed && submitted ? "failed-on-submit" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <p key={r.id ?? i} className={classes}>
              {r.message}
            </p>
          );
        })}
      </div>
      
    </div>
  )
}