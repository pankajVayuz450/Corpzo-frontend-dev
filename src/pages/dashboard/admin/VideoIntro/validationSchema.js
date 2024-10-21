import * as Yup from "yup"

export const validationSchema = Yup.object({
    title: Yup.string()
    .trim()
        .required("Please select a video Title."),
});