import * as Yup from "yup"

const regexForMultipleSpaces = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;

const excludeNumberSpecialcahr = /^[a-zA-Z ]+$/;

export const validationSchema = Yup.object({
    name: Yup.string()
    .trim()
        .min(2, "Departmnet name must be at least 2 characters long")
        .max(100, "Departmnet name must be at most 100 characters long")
        .matches(excludeNumberSpecialcahr, "Department cannot contain numbers or special characters")
        // .matches(regexForMultipleSpaces, "Department name cannot contain more than one space between words.")
        .required("Please enter department name."),
    description : Yup.string()
    .trim()
    .max(200, "Description name must be at most 30 characters long")
        .required("Please enter department description")
});