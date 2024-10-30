import OfferApis from '@/constants/APIList/offerAPIs';
import serviceAPIs from '@/constants/APIList/ServiceAPIs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getServices, updateLoading, getActiveCategoryList, getServiceById, updateUploadLoading, getActiveSubCategoryList, getForms, updateAdding, updateVideoUrl, updateStatusLoading, updateStatusState, getActiveSubCategoryListAll, getActiveBusinessEmail1, updateContent, updateHeader, getActiveSelectedSubCategoryListAll, setCategoryLoading } from "../../slices/Service"
const authToken = localStorage.getItem('authToken');

export const getAllServices = (limit = 10, page = 1, search = "", id) => {

    console.log(search, "searchhh from service")
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            let api = `${serviceAPIs.getService}?limit=${limit}&page=${page}`

            if (id !== "") {
                api = `${serviceAPIs.getService}?serviceId=${id}`
            }

            if (search !== "") {
                api += `&query=${search}`
            }

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            if (response.status == 200) {
                if (id !== "") {
                    dispatch(getServiceById(response.data.data[0]))
                    dispatch(updateVideoUrl({
                        fieldName : 'deliverable', 
                        url : response.data.data[0]?.delivrableVideoUrl
                    }))
                    dispatch(updateVideoUrl({
                        fieldName : 'document', 
                        url : response.data.data[0]?.documentVideoUrl
                    }))
                    dispatch(updateVideoUrl({
                        fieldName : 'step', 
                        url : response.data.data[0]?.stepsVideoUrl
                    }))
                    console.log(response.data.data, "service by id ")
                } else {
                    dispatch(getServices({
                        serviceList: response.data.data || [],
                        totalCount: response.data.total || 0,
                    }))
                }
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));

        }
    }
}
export const getActiveServices = () => {

    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            console.log(OfferApis.getServices, "api end point")
            let api = `${OfferApis.getServices}?active=true`


            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log(response)
            if (response.status == 200) {
                dispatch(getServices({
                    serviceList: response.data.data || [],

                }))
                dispatch(updateLoading(false))

            }
        } catch (error) {
            dispatch(updateLoading(false));
            console.log(error)
            // if(error.response.data.statusCode === 400){
            //     toast.warn(error.response.data.message)
            // }
        }
    }
}
export const getAllActiveCategories = (active) => {
    return async (dispatch) => {
        try {

            dispatch(updateLoading(true));
            let api = `${serviceAPIs.getActiveCategories}?active=${active}`
            console.log(api, "api called ")
            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status === 200) {
                console.log(response, "........active categories")
                dispatch(getActiveCategoryList({
                    activeCategories: response.data.data || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            // toast.error(error.response.data.error)

            dispatch(updateLoading(true));
        } finally {

            dispatch(updateLoading(false));

        }
    };
};
export const getAllActiveSubCategories = (categoryId) => {
    console.log(categoryId, "categoryId................")
    return async (dispatch) => {
        try {

            let api = `${serviceAPIs.getActiveSubCategories}?sectionId=${categoryId}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                dispatch(getActiveSubCategoryList({
                    activeSubCategories: response.data.data || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            // toast.error(error.response.data.error)

        } finally {

            

        }
    };
};

export const getAllActiveSubCategoriesAll = (categoryId) => {
    console.log(categoryId, "categoryId................")
    return async (dispatch) => {
        dispatch(setCategoryLoading(true))

        try {

            let api = `${serviceAPIs.getActiveSubCategoriesAll}`

            const response = await axios.post(`${api}`, categoryId, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                dispatch(setCategoryLoading(false))
                dispatch(getActiveSubCategoryListAll({
                    activeSubCategoriesList: response.data.data || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            // toast.error(error.response.data.error)
            dispatch(setCategoryLoading(false))

        } finally {

            dispatch(setCategoryLoading(false))

        }
    };
};

export const getAllActiveSelectedSubCategories = (subCategoryIds) => {
    
    console.log("check section id in action ",subCategoryIds)
    return async (dispatch) => {

        try {

            let api = `${serviceAPIs.getActiveSelectedSubCategoriesAll}/?subCategoryIds=${subCategoryIds}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                dispatch(getActiveSubCategoryListAll(
                    {activeSubCategoriesList:response.data.data || []} 
                ));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            // toast.error(error.response.data.error)

        } finally {

            dispatch(updateLoading(false));

        }
    };
};
export const getActiveBusinessEmail = () => {
   
    return async (dispatch) => {
        dispatch(updateLoading(true));

        try {

            let api = `${serviceAPIs.getActiveBusinessEmail}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                dispatch(getActiveBusinessEmail1({
                    getActiveBusinessEmailList: response.data.data || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            // toast.error(error.response.data.error)

        } finally {

            dispatch(updateLoading(false));

        }
    };
};
export const getAllForms = () => {
    return async (dispatch) => {
        try {
            dispatch(updateLoading(true));
            let api = `${serviceAPIs.getForms}`

            const response = await axios.get(`${api}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response.data.data.data, "response.data.data")
            if (response.status === 200) {
                dispatch(getForms({
                    forms: response.data.data.data || [],
                }));
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            // toast.error(error.response.data.error)

            dispatch(updateLoading(true));
        } finally {

            dispatch(updateLoading(false));

        }
    };
};
export const uploadVideo = (formData, fieldName) => {
    console.log(fieldName, "fieldName")
    return async (dispatch) => {
        try {
            dispatch(updateUploadLoading(true))
            dispatch(updateContent("Uploading Video"))
            
            let api = `${serviceAPIs.uploadVideo}`

            const response = await axios.put(`${api}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                console.log(response, "response from upload video")
                dispatch(updateVideoUrl({
                    fieldName: fieldName,
                    url: response.data.data.url
                }))
                dispatch(updateUploadLoading(false))
                dispatch(updateContent("Video Uploaded!"))
                dispatch(updateHeader("Video Uploaded"))

            }
        } catch (error) {
            console.error('Error uploading video:', error);
            // toast.error(error.response.data.error)
            dispatch(updateContent("Error Occurred"))

            dispatch(updateUploadLoading(false))
        } finally {
            dispatch(updateContent("Upload Video"))
            dispatch(updateHeader(""))
            dispatch(updateUploadLoading(false))
        }
    };
};


export const addsService = (service, navigate) => {

    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.post(`https://backend-qqhv.onrender.com/api/admin/service`, service, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            console.log("add service response", response)
            if (response.status === 200) {
                dispatch(updateAdding(false))
                toast.success(response.data.message);
                navigate(`/dashboard/admin/service`)
                dispatch(updateVideoUrl({
                    fieldName: "delivrableVideoUrl",
                    url: ""
                }))
                dispatch(updateVideoUrl({
                    fieldName: "documentVideoUrl",
                    url: ""
                }))
                dispatch(updateVideoUrl({
                    fieldName: "stepsVideoUrl",
                    url: ""
                }))
            }
        } catch (error) {
            console.log(error, "add service error");
            dispatch(updateAdding(false))
            toast.error(error.response.data.message)
        }
    }
}

export const editService = (service, navigate, editPage) => {
    console.log(service, "from action service")
    return async (dispatch) => {
        try {
            dispatch(updateAdding(true))
            const response = await axios.put(`${serviceAPIs.editService}`, service, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response, "edit response")
            if (response.status == 200) {
                // toast.success(response.data.message);
                dispatch(updateVideoUrl({
                    fieldName: "delivrableVideoUrl",
                    url: ""
                }))
                dispatch(updateVideoUrl({
                    fieldName: "documentVideoUrl",
                    url: ""
                }))
                dispatch(updateVideoUrl({
                    fieldName: "stepsVideoUrl",
                    url: ""
                }))
                navigate(`/dashboard/admin/service?page=${editPage}`)
                dispatch(updateAdding(false))
            }
        } catch (error) {
            dispatch(updateAdding(false))
            console.log(error)
            toast.error(error.response.data.message)

        }
    }
}

export const updateStatus = (data) => {
    return async (dispatch) => {
        try {
            dispatch(updateStatusLoading(true))
            const response = await axios.put(`${serviceAPIs.editService}`, data, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status == 200) {
                console.log(response.data, "single update status state of service")
                dispatch(updateStatusState(data))
                dispatch(updateStatusLoading(false))
            } else {
                dispatch(updateStatusState(data))
            }
        } catch (error) {
            console.log(error, "error from update status")
            // toast.error(error.response.data.message)
            dispatch(updateStatusLoading(false))

        }
    }
}
