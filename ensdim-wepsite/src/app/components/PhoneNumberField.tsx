import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneNumberField.css';

export { isValidPhoneNumber } from 'react-phone-number-input';

interface PhoneNumberFieldProps {
  name: string;
  label: string;
  showLabel?: boolean;
  required?: boolean;
  ar: boolean;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  error?: boolean;
  variant?: 'default' | 'job' | 'dark';
}

export function PhoneNumberField({ name, label, showLabel = true, required, ar, value, onChange, error, variant = 'default' }: PhoneNumberFieldProps) {
  return (
    <div>
      {showLabel && (
        <label className={variant === 'job' ? 'block text-sm font-medium text-[#101418] mb-2' : `block text-xs font-semibold mb-1.5 ${variant === 'dark' ? 'text-white' : 'text-[#101418]'}`}>
          {label}{required && <span className="text-[#D63A3A]"> *</span>}
        </label>
      )}
      <PhoneInput
        international
        defaultCountry="EG"
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`ensdim-phone-input${variant === 'job' ? ' ensdim-phone-input--job' : ''}${variant === 'dark' ? ' ensdim-phone-input--dark' : ''}${error ? ' ensdim-phone-input--error' : ''}`}
      />
      <input type="hidden" name={name} value={value ?? ''} />
      {error && (
        <p className="text-xs text-[#D63A3A] mt-1">
          {ar ? 'يرجى اختيار الدولة وإدخال رقم هاتف صحيح.' : 'Please select a country and enter a valid phone number.'}
        </p>
      )}
    </div>
  );
}
