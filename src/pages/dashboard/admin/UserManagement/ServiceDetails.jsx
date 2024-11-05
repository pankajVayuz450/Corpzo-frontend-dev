import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Stepper, Step, Typography
} from "@material-tailwind/react";
import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const ServiceDetails = () => {
    const { servivceProgress } = useSelector((state) => state.userMgmt);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const [open, setOpen] = React.useState(null); // Track which accordion is open by _id

    const handleOpen = (value) => setOpen(open === value ? null : value); // Toggle based on _id

    return (
        <>
            {servivceProgress.map((service) => (
                <Accordion 
                    key={service._id}
                    className="relative flex flex-col mt-6 gap-2 text-gray-700 bg-white shadow-md bg-clip-border p-3 rounded-xl w-full"
                    open={open === service._id}
                    icon={<Icon id={service._id} open={open} />}
                >
                    <AccordionHeader onClick={() => handleOpen(service._id)}>
                        <div className="flex flex-col w-full">
                            <span>Service: {service.service[0].name}</span>
                            {console.log(service.businessdetails[0].businessName)}
                            <span className='text-sm'>Business :{service?.businessdetails[0]?.businessName}</span>
                        </div>
                    </AccordionHeader>
                    {/* 3rd party api required */}

                    
                    {/* <AccordionBody className="min-h-[200px] flex items-center">
                        <div className="w-full px-24 py-4">
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                            >
                                <Step onClick={() => setActiveStep(0)}>
                                    <UserIcon className="h-5 w-5" />
                                    <div className="absolute -top-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 0 ? "blue-gray" : "gray"}
                                        >
                                            Review Process
                                        </Typography>
                                    </div>
                                    <div className="absolute -bottom-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 0 ? "blue-gray" : "gray"}
                                        >
                                           22 Sep, 2024
                                        </Typography>
                                    </div>
                                </Step>
                                <Step onClick={() => setActiveStep(1)}>
                                    <CogIcon className="h-5 w-5" />
                                    <div className="absolute -top-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 1 ? "blue-gray" : "gray"}
                                        >
                                            Service Started
                                        </Typography>
                                    </div>
                                    <div className="absolute -bottom-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 1 ? "blue-gray" : "gray"}
                                        >
                                           24 Sep, 2024
                                        </Typography>
                                    </div>
                                </Step>
                                <Step onClick={() => setActiveStep(2)}>
                                    <BuildingLibraryIcon className="h-5 w-5" />
                                    <div className="absolute -top-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 2 ? "blue-gray" : "gray"}
                                        >
                                            Payment Received
                                        </Typography>
                                    </div>
                                    <div className="absolute -bottom-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 2 ? "blue-gray" : "gray"}
                                        >
                                           28 Sep, 2024
                                        </Typography>
                                    </div>
                                </Step>
                                <Step onClick={() => setActiveStep(3)}>
                                    <BuildingLibraryIcon className="h-5 w-5" />
                                    <div className="absolute -top-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 3 ? "blue-gray" : "gray"}
                                        >
                                           Application submitted
                                        </Typography>
                                    </div>
                                    <div className="absolute -bottom-[2rem] w-max text-center">
                                        <Typography
                                            variant="h6"
                                            color={activeStep === 3 ? "blue-gray" : "gray"}
                                        >
                                           30 Sep, 2024
                                        </Typography>
                                    </div>
                                </Step>
                            </Stepper>
                        </div>
                    </AccordionBody> */}
                </Accordion>
            ))}
        </>
    );
}

export default ServiceDetails;
