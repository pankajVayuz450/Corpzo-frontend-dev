import { updateAttributeTypes, updateInputTypes, updateSubInputTypes, updateValidFormElement } from '@/redux/admin/actions/data';
import { element } from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditModal = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const location= useLocation();
    const {title} = useSelector((state) => state.data);
    const {...details}= location.state;
    const [editedValueID, _] = useState(details.id);
    const handleCancel=()=>{
      navigate(`/dashboard/admin/masterSettings/dropdowndetailPage?title=${title}`)
    }
    const {types} = useSelector((state) => state.formTypes);
  const [editedValue, setEditedValue] = useState(details.title);

    const onSave = (editedValue) => {
      if(title === 'Elements'){
        dispatch(
            updateInputTypes({
                url: `${process.env.VITE_BASE_URL}/updateFormInput`,
                data: {fieldType: editedValue, id: editedValueID,isSelfClosed:details.isSelfClosed,hasChildElements:details.hasChildElements},
            })
        );
      }
      else if(title === 'SubTypes'){
        dispatch(updateSubInputTypes({
            url: `${process.env.VITE_BASE_URL}/updateFormSubInput`,
            data: {subtypeName: editedValue, id: editedValueID},
        }))
      }
        else if(title === 'Attributes'){
            dispatch(
                updateAttributeTypes({
                    url: `${process.env.VITE_BASE_URL}/updateFieldAttribute`,
                    data: {fieldType: editedValue, id: editedValueID},
                })
            );
        }

        else if (title === 'Valid Form Element'){
            dispatch(
                updateValidFormElement({
                    url: `${process.env.VITE_BASE_URL}/updateValidFormElement`,
                    data: {element: editedValue, id: editedValueID},
                })
            );
          }
            else if( title === 'Valid Form Element Types'){
                dispatch(
                    updateValidFormElementTypes({
                        url: `${process.env.VITE_BASE_URL}/updateValidFormElementType`,
                        data: {elementType: editedValue, id: editedValueID},
                    })
                );

            }
            else if( title === 'Valid Form Element Attributes'){
                dispatch(
                    updateValidFormElementAttributes({
                        url: `${process.env.VITE_BASE_URL}/updateValidFormAttribute`,
                        data: {elementType: editedValue, id: editedValueID},
                    })
                );
              }
            }

            const handleInput = (event) => {
              const { name, value } = event.target;
              setDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value === 'true' ? true : value === 'false' ? false : value,
              }));
            };
    
            return (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="p-5 border w-full max-w-md bg-white shadow-lg rounded-md overflow-hidden">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Item</h3>
                  <input
                    type="text"
                    className="mt-2 p-2 border rounded-md w-full"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  {title==='Elements' && <>
                    <div className="mb-4">
            <label htmlFor="hasChildElements" className="block text-gray-700 text-sm font-bold mb-2">Has Child Elements</label>
            <select
              id="hasChildElements"
              name="hasChildElements"
              onChange={handleInput}
              className="mt-2 p-2 border rounded-md w-full"
              value={details.hasChildElements}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div className="mb-4">
          <label htmlFor="isSelfClosed" className="block text-gray-700 text-sm font-bold mb-2">Is Self Closed</label>
          <select
              id="isSelfClosed"
              name="isSelfClosed"
              onChange={handleInput}
              className="mt-2 p-2 border rounded-md w-full"
              value={details.isSelfClosed}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

                  </>}
                  <div className="mt-4 flex justify-end">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => onSave(editedValue)}
                    >
                      Update
                    </button>
                    <button
                    onClick={handleCancel}
                      className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
};


export default EditModal;