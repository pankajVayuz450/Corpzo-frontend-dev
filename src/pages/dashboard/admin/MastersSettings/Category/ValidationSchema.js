import * as Yup from "yup";

const regexForMultipleSpaces = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;

const excludeNumberSpecialcahr = /^[a-zA-Z ]+$/;

export const validationSchema = Yup.object({
    categoryName: Yup.string()
        .trim()
        .min(2, "Category title must be at least 2 characters long")
        .max(30, "Category title must be at most 30 characters long")
        .matches(excludeNumberSpecialcahr, "Category cannot contain numbers or special characters")
        .required("Please enter Category title."),
});
