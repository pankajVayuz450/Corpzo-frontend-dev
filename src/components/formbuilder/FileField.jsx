import { Button, Switch } from '@material-tailwind/react';
import React from 'react'
import { MdDelete } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
function FileField({ index, fieldData, setLabel, handleFieldChange, fieldTypesList, handleRemoveField, setIsRequired,setMaxSize }) {
    return (
        <div className="mb-4 p-4 bg-white border rounded-md shadow-lg w-auto  hover:border-green-600">
            <div className='flex items-center justify-between'>
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

            <div className="bg-gray-200 rounded-md my-4 p-4 flex flex-col items-center space-y-2">
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    Upload File
                </label>
                <input disabled={true} type="file" id="file-upload" className="hidden" />
                <span className="text-sm text-gray-500">No file selected</span>
            </div>

            <div>Max size :
                <select label="size" className=' rounded-md  p-3 ' onChange={(e)=>setMaxSize(index,e.target.value)}>
                    {[1, 10, 50, 100].map((el, idx) => (
                        <option key={idx} value={el}>{`${el} MB`}</option>
                    ))}
                </select>
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

export default FileField