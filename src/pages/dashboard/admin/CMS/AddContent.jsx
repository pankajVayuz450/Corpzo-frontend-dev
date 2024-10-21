import React from 'react'
import {
    Input,
    Typography,
  } from "@material-tailwind/react";
const AddContent = () => {
  return (
    <div>
    <h1 className="text-xl md:text-3xl font-semibold mb-4">Add Content</h1>
    <div className="w-[50%] flex flex-col gap-4">
    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              About
            </Typography>
      <Input
        size="sm"
        placeholder="About"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Content
            </Typography>
      <Input
        size="sm"
        placeholder="Content"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add</button>
    </div>
  </div>
  )
}

export default AddContent