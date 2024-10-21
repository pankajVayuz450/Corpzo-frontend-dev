import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAttributeTypes, createInputTypes, createSubInputTypes, createValidFormElement, createValidFormElementAttributes, createValidFormElementTypes, fetchTypes } from '@/redux/admin/actions/data';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => (

  <TailSpin
    color="#00BFFF"
    height={50}
    width={50}
    timeout={3000} //3 secs
  />
);

const ContentByTitle = ( ) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        typeName: '',
        subTypeName: '',
        typeId: '',
        attributeName: '',
        subTypeId: '',
        hasChildElements: '',
        isSelfClosed: '',
        });
      const {types} = useSelector((state) => state.data);  
      const {subTypes,isCreating} = useSelector((state) => state.data);  
  const {url,title} = useSelector((state) => state.data);

  const dispatch = useDispatch();


  useEffect(()=>{
    if(title === 'Elements'){
        dispatch(fetchTypes());
    }
    if(title === 'Attributes'){
        dispatch(fetchTypes());
    }
  },[])
  const handleCreateData = () => {
    const navigateOnSuccess = () => navigate(`/dashboard/admin/masterSettings?title=${title}`);
 if(title === 'Elements'){
    dispatch(
        createInputTypes({
            url: `${process.env.VITE_BASE_URL}/createFormInput`,
            data: {fieldType: input.typeName, parentElementId: input.parentElement, hasChildElements: Boolean(input.hasChildElements), isSelfClosed: Boolean(input.isSelfClosed)},

        })

    )
    .unwrap()
    .then(()=>navigateOnSuccess())
    

 }
    if(title === 'SubTypes'){
        dispatch(
            createSubInputTypes({
                url: `${process.env.VITE_BASE_URL}/createFormSubInput`,
                data: {subtypeName: input.subTypeName, inputTypeId: input.typeId},
            })
        )
        .unwrap()
        .then(()=>navigateOnSuccess())
    }

    if(title === 'Attributes'){
        dispatch(
            createAttributeTypes({
                url: `${process.env.VITE_BASE_URL}/createFormAttribute`,
                data: {attribute: input.attributeName, elementId: input.typeId},
            })
        )
        .unwrap()
        .then(()=>navigateOnSuccess())

    }

    if(title==='Valid Form Element'){
        dispatch(
            createValidFormElement({
                url: `${process.env.VITE_BASE_URL}/createValidFormElement`,
                data: {element: input.attributeName},
            })
        )
        .unwrap()
        .then(()=>navigateOnSuccess())

      }

      if(title==='Valid Form Element Types'){
        dispatch(
            createValidFormElementTypes({
                url: `${process.env.VITE_BASE_URL}/createValidFormElementType`,
                data: {elementType: input.attributeName},
            })
        )
        .unwrap()
        .then(()=>navigateOnSuccess())

      }

      if(title==='Valid Form Element Attributes'){
        dispatch(
            createValidFormElementAttributes({
                url: `${process.env.VITE_BASE_URL}/createValidFormAttribute`,
                data: {attribute: input.attributeName},
            })
        )
        .unwrap()
        .then(()=>navigateOnSuccess)
      }
      
    };

    const handleInput = (e) => {
      const { name, value } = e.target;
      setInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
        }




  const renderContent = () => {
    switch (title) {
      case 'Elements':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md my-5">
            <h2 className="text-xl font-semibold mb-4">Types</h2>
            <div className="mb-4">
              <label htmlFor="typeName" className="block text-gray-700 text-sm font-bold mb-2">Type Name</label>
              <input
                type="text"
                id="typeName"
                onChange={handleInput}
                name="typeName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={input.typeName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="parentElement" className="block text-gray-700 text-sm font-bold mb-2">Parent Element</label>
              <select
                name="typeId" 
                id="typeId"
                onChange={handleInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={input.typeId}
              >
              <option value="null">none</option>
  {types.map((type) => (
    <option key={type.value} value={type.value}>
      {type.label}
    </option>
  ))}
                
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="hasChildElements" className="block text-gray-700 text-sm font-bold mb-2">Has Child Elements</label>

              <select
              id="hasChildElements"
              name="hasChildElements"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.hasChildElements}
            >
              <option value=''>False</option>
              <option value={true}>True</option>
            </select>
            </div>

            <div className="mb-4">
              <label htmlFor='isSelfClosed' className="block text-gray-700 text-sm font-bold mb-2">Is Self Closed</label>
              <select
              id="isSelfClosed"
              name="isSelfClosed"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.isSelfClosed }
            >
              <option value=''>False</option>
              <option value={true}>True</option>
            </select>
            </div>
            {isCreating ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleCreateData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Type
              </button>
            )}
          </div>
        ); 
         case 'SubTypes':
                return (
                  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block text-gray-700 text-xl font-bold mb-2">SubTypes</h2>
                    <div className="mb-4">
                      <label htmlFor="subTypeName" className="block text-gray-700 text-sm font-bold mb-2">SubType Name</label>
                      <input type="text" id="subTypeName" name="subTypeName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} value={input.subTypeName} />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="typeId" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                      <select id="typeId" name="typeId" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value={input.typeId}  onChange={handleInput} > 
  {types.map((type) => (
    <option key={type.value} value={type.value}>
      {type.label}
    </option>
  ))}
</select>
                    </div>
                   {isCreating?<Loader/>:( <button onClick={handleCreateData} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create SubType</button>)}
                  </div>
                );
                case 'Attributes':
                    return (
                      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="block text-gray-700 text-xl font-bold mb-2">Attributes</h2>
                        <div className="mb-4">
                          <label htmlFor="attributeName" className="block text-gray-700 text-sm font-bold mb-2">Attribute Name</label>
                          <input  type="text" id="attributeName" name="attributeName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  onChange={handleInput}
                            value={input.attributeName}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="typeId" className="block text-gray-700 text-sm font-bold mb-2">Attribute Derived From</label>
                          <select
  id="attributesInput"
  name="typeId" 
  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
  value={input.typeId}
  onChange={handleInput}
>
{input.typeId==='' && <option value="">Select Type</option>}
  {types.map((type) => (
    <option key={type.value} value={type.value}>
      {type.label}
    </option>
  ))}
</select>
                        </div>
                       {isCreating?<Loader/>:( <button onClick={handleCreateData} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Attribute</button>)}
                      </div>
                    );
                    case 'Valid Form Element':
                        return (
                          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h2 className="block text-gray-700 text-xl font-bold mb-2">Valid Form Element</h2>
                            <div className="mb-4">
                              <label htmlFor="attributeName" className="block text-gray-700 text-sm font-bold mb-2">Element Name</label>
                              <input type="text" id="attributeName" name="attributeName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} value={input.attributeName} />
                            </div>
                            {isCreating?<Loader/>:(<button onClick={handleCreateData} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Element</button>)}
                          </div>
                        );
                        case 'Valid Form Element Types':
                            return (
                              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className="block text-gray-700 text-xl font-bold mb-2">Valid Form Element Types</h2>
                                <div className="mb-4">
                                  <label htmlFor="attributeName" className="block text-gray-700 text-sm font-bold mb-2">Element Type Name</label>
                                  <input type="text" id="attributeName" name="attributeName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} value={input.attributeName} />
                                </div>
                               {isCreating?<Loader/>:( <button onClick={handleCreateData} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Element Type</button>)}
                              </div>
                            );
                            case 'Valid Form Element Attributes':
                                return (
                                  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                    <h2 className="block text-gray-700 text-xl font-bold mb-2">Valid Form Element Attributes</h2>
                                    <div className="mb-4">
                                      <label htmlFor="attributeName" className="block text-gray-700 text-sm font-bold mb-2">Element Attribute Name</label>
                                      <input type="text" id="attributeName" name="attributeName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleInput} value={input.attributeName} />
                                    </div>
                                    {isCreating?<Loader/>:(<button onClick={handleCreateData} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Element Attribute</button>)}
                                  </div>
                                );
                  default:
                    return <div>No content available for this title</div>;
                }
  };

  return <>{renderContent()}</>;
};

export default ContentByTitle;