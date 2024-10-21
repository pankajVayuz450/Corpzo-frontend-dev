import { Textarea, Typography } from '@material-tailwind/react'
import React from 'react'

const AddTeamNote = () => {
    return (
        <div className='w-1/2 flex flex-col gap-4'>
            <div>
                Name :
            </div>
            <div>
                Email :
            </div>
            <div>

                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                    Add Note
                </Typography>
                <Textarea
                    size="sm"
                    type='tex'
                    placeholder="Enter Note"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                />
            </div>
        </div>
    )
}

export default AddTeamNote