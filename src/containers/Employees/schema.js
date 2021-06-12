import * as Yup from "yup";
import { validationRules } from "../../config/validationRules";
const NAME_LENGTH = validationRules.nameLength;

export const validationSchema = Yup.object({
    name: Yup.string()
    .required("Name is required")
    .max(
      NAME_LENGTH,
      `Must be ${NAME_LENGTH} characters or less`
    ),
    role: Yup.string()
    .required("Required"),
    email: Yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
});