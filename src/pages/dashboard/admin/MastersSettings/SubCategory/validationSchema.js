import * as Yup from "yup"

// const excludeNumberSpecialcahr = /^[a-zA-Z ]+$/;
const excludeNumberSpecialcahr = /^[a-zA-Z .-]+$/;
export const validationSchema = Yup.object({
    subSectionTitle: Yup.string()
        .trim()
        .min(2, "Sub category title must be at least 2 characters long")
        .max(30, "Sub category title must be at most 30 characters long")
        .matches(excludeNumberSpecialcahr, "Sub Category title can only contain letters, spaces, periods, or hyphens.")
        .required("Please enter Sub Category title."),
    sectionTitle: Yup.string()
        .trim()
        .required("Please Select sectionTitle."),
});