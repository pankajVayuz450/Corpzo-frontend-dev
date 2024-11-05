import { Button, Switch } from '@material-tailwind/react';
import React from 'react'
import { MdDelete } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

function MultipleChoiceField({ index, fieldData, setLabel, handleFieldChange, fieldTypesList, handleRemoveField, setIsRequired ,addMoreOption,handleOptionNameChange,handleDeleteOption},) {
  console.log("MultipleChoiceField", index, fieldData);

  return (
    <div className="mb-4 p-4 bg-white border rounded-md shadow-lg w-auto">
      <div className=' flex items-center justify-between'>
      <div className=' flex'>
        <div className='pr-4'>
          <input type="text" maxLength={30} placeholder={"label..."} value={fieldData.label} onChange={(e) => setLabel(index, e.target.value)} className='p-2 bg-gray-50   rounded-md border-black border-b-4' />
        </div>

        <div>
          <select label="Field Type" onChange={(e) => handleFieldChange(index, e.target.value)} className=' px-16 rounded-md ml-4 bg-gray-200 p-3'>
            {fieldTypesList.map((el, idx) => (
              <option key={idx} value={el.value}>{el.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
      <Button onClick={() => handleRemoveField(index)} color="red" className="p-2 bg-white text-red-700 shadow-md shadow-gray-500 text-2xl"><MdDelete /></Button>
      </div>
      </div>


      <div className='bg-gray-200 rounded-md my-4 p-2 flex flex-wrap'>
        <div className='p-1 '>
          {fieldData.options.map((opt ,id) => {
            return <div key={id} className='flex justify-start items-center'><div className='w-4 h-4 m-2 bg-gray-400 rounded-full'></div> <input onChange={(e)=>handleOptionNameChange(index,id,e.target.value)} type="text" value={opt} className='bg-inherit '/> <div ><RxCross2 onClick={()=>handleDeleteOption(index,id)}/></div></div>

          })}
          <div className='flex justify-start items-center p-1 ml-4 text-gray-600 hover:text-blue-300 cursor-pointer' onClick={()=>addMoreOption(index)}><div className='w-4 h-4 m-2 bg-gray-400 rounded-full'></div>add option</div>
          {/* <div>add option</div> */}
        </div>
      </div>




      <div className=' flex items-center justify-between p-2'>
        
        <div className='flex p-2 justify-between h-10 bg-gray-100 rounded-2xl px-4'>
          <div className=' px-2 text'>Required</div>
          <div className=' flex items-center'>
            <Switch checked={fieldData.isRequired} onChange={() => setIsRequired(index, !fieldData.isRequired)} />
            {/* <BsThreeDotsVertical onClick={}/> */}

          </div>
        </div>
      </div>

    </div>
  )
}

export default MultipleChoiceField