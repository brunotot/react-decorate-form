import { Box, TextField } from "@mui/material";
import { ValidationResult } from "react-decorate-form";

export type FormControlProps = {
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  label: string;
  size?: "small" | "medium";
  onChange?: (value: string) => void;
  errors?: ValidationResult[];
};

export default function FormControl({
  type = "text",
  value,
  placeholder,
  label,
  onChange,
  errors = [],
  required = false,
  size = "small",
}: FormControlProps) {
  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <TextField
        size={size}
        error={errors?.length > 0}
        type={type}
        value={value}
        label={label}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        helperText={errors[0]?.message}
      />
    </Box>
  );
}
