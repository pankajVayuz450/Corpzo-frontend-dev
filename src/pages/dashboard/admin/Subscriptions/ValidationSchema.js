import { max } from "date-fns";
import * as Yup from "yup"

const excludeNumberSpecialcahr = /^[a-zA-Z ]+$/;

export const validationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .min(2, "Subscription Title must be at least 2 characters long")
        .max(100, "Subscription Title must be at most 100 characters long")
        .matches(excludeNumberSpecialcahr, "Department cannot contain numbers or special characters")
        .required("Please enter Subscription Title."),
    description: Yup.string()
        .trim()
        .max(200, "Description name must be at most 200 characters long")
        .required("Please enter description"),
    amount: Yup.number()
        .max(20000, "Subscription amount cannot be more than 20000")
        .required("Please enter Amount"),
    type: Yup.string()
        .required("Please select a type."),
    duration: Yup.string()
        .required("Please select a duration.")
});