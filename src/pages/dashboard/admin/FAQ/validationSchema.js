import * as Yup from "yup"

export const validationSchema = Yup.object({
    question: Yup.string()
    .trim()
        .max(200, "Question must be at most 200 characters long")
        .required("Please enter Question."),
    answer : Yup.string()
    .trim()
    .max(1000, "Answer must be at most 1000 characters long.")
        .required("Please enter Answer.")
});