import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios"; // Import axios for API requests
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik"; // Still use Formik for managing form state
import { toast } from "react-toastify";

import formInputFields from "@/constants/APIList/formInputFields";
import formAttributesNew from "@/constants/APIList/formAttributesNew";

function AddAttribute({ isEdit = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [selectedElementId, setselectedElementId] = useState("");
    const [inputFields, setInputFields] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [existingAttribute, setExistingAttribute] = useState(null); // State for existing attribute

    console.log("attribute id:", params.id);

    // Fetch existing attribute if in edit mode
    useEffect(() => {
        if (isEdit) {
            axios.get(formAttributesNew.getFormAttributeById, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                params: { attributeId: params.id }
            })
            .then((response) => {
                console.log("response.data?.data", response.data?.data);
                const attributeData = response.data?.data;
                setExistingAttribute(attributeData); // Set existing attribute
                setselectedElementId(attributeData.elementId); // Set selected element ID

                // Update Formik values
                formik.setValues({
                    attribute: attributeData.attribute,
                });
            })
            .catch((error) => {
                console.error("Error fetching attribute:", error);
                toast.error("Failed to fetch attribute data.");
            });
        }
    }, [isEdit, params.id]);

    // Fetch dropdown options when the component mounts
    useEffect(() => {
        axios
            .get(formInputFields.getAllInputs, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((response) => {
                setInputFields(response.data?.data); // Assuming response.data contains the list of elements
            })
            .catch((error) => {
                console.error("Error fetching input fields:", error);
            });
    }, []);

    // Formik hook to manage form state
    const formik = useFormik({
        initialValues: {
            attribute: "", // Initial value for attribute
        },
        onSubmit: async (values) => {
            setLoading(true); // Set loading state to true

            const payload = {
                elementId: selectedElementId,
                attribute: values.attribute,
            };
            console.log("Submitted data:", payload);

            try {
                if (isEdit) {
                    // Update existing attribute
                    const newData = {
                        id:params.id,
                        attribute:payload?.attribute
                    }
                    console.log("new Data",newData);
                    
                    await axios.put(formAttributesNew.updateFormAttribute, newData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    });
                    toast.success("Attribute updated successfully");
                } else {
                    // Create new attribute
                    await axios.post(formAttributesNew.createFormAttribute, payload, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    });
                    toast.success("Attribute created successfully");
                }
                navigate(-1); // Redirect to attributes page or appropriate route after submission
            } catch (error) {
                console.error("Error while saving attribute:", error);
                toast.error(error.response?.data?.message || "An error occurred while saving the attribute.");
            } finally {
                setLoading(false); // Set loading state back to false after submission
            }
        },
    });

    const handleElementChange = (e) => {
        setselectedElementId(e.target.value);
        // Manually trigger value update in Formik
        formik.setFieldValue("attribute", ""); // Reset attribute when changing element
    };

    return (
        <div>
            <h1>{isEdit ? "Edit Attribute" : "Add Attribute"}</h1>

            {/* Dropdown for selecting element */}
            {!isEdit && <div className="flex items-center">
                <h3>Element: </h3>
                <div className="">
                    <select
                        value={selectedElementId}
                        onChange={handleElementChange}
                        className="p-2 border rounded"
                    >
                        <option value="">Select Element</option>
                        {inputFields.map((field) => (
                            <option key={field._id} value={field._id}>
                                {field.typeName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>}

            {/* Regular form with manual handling */}
            <form className="mt-4" onSubmit={formik.handleSubmit}>
                {/* Conditionally render input field if an element is selected */}
                {selectedElementId && (
                    <div className="mb-4">
                        <label htmlFor="attribute">Attribute</label>
                        <input
                            id="attribute"
                            name="attribute"
                            type="text"
                            className="p-2 border rounded w-full"
                            value={formik.values.attribute}
                            onChange={formik.handleChange}
                        />
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className={`p-2 bg-blue-500 text-white rounded ${loading ? "opacity-50" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default AddAttribute;
