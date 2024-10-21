import * as Yup from "yup"

export const validationSchema = Yup.object({
    details: Yup.string()
    .trim()
        .max(30, "Step title must be at most 30 characters long")
        .required("Please enter step title."),
});