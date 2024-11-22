import ReusableModal from '@/components/common/ReusableModal'
import { Button } from '@material-tailwind/react'
import React, { Children, useState } from 'react'
import Papa from 'papaparse';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadCsv } from '@/redux/admin/actions/Services';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTitle from '@/components/common/HeaderTitle';
import Breadcrumb from '@/widgets/layout/TopNavigation';
const UploadCsv = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [csvError, setCsvError] = useState(false)
    const [csvFile, setCsvFile] = useState(null)
    const [csv, setCsv] = useState(null)
    const {csvLoading} = useSelector((state)=> state.service)
    const { id } = useParams()
    const openModal = () => {

        setIsModalOpen(true);
    };


    const closeModal = () => {
        if (!csvLoading) {
            setIsModalOpen(false);
            setCsvError("");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            if (file.type === "text/csv" || file.name.endsWith(".csv")) {
                const fileUrl = URL.createObjectURL(file);
                setCsv(file)
                setCsvFile(fileUrl);
                setCsvError("");
            } else {
                setCsv(null)
                setCsvFile(null);
                setCsvError("Only .csv files are allowed.");

               
                event.target.value = ""; 
            }
        }
      
    };
    const handleConfirm = () => {
        if (csv) {
            console.log(csv, "csv file");
            Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    const parsedData = result.data;


                    const transformedData = parsedData.map((row) => ({
                        ...row,
                        "RUN + PAN/TAN": Number(row["RUN + PAN/TAN"] || 0),
                        "2 DSC price": Number(row["2 DSC price"] || 0),
                        "State filing fee": Number(row["State filing fee"] || 0),
                    }));

                    console.log("Transformed CSV Data:", transformedData);


                    dispatch(uploadCsv({ data: transformedData, serviceId: id },localStorage.getItem('currentPage') || 1,navigate ));


                },
                error: (err) => {



                    toast.warn("Failed to parse CSV file. Please try again.");
                },
            });
        } else {
            console.log("No valid CSV file selected");

            // Show warning toast
            toast.warn("Please select a valid CSV file.");
        }
        setIsModalOpen(false);
    };

    const breadcrumbData = [
        {
    
          name: 'Service Management',
          url: '/dashboard/admin/service',
          children: [
            {
              name: 'Service Charges',
            },
          ],
        }
      ];
    return (
        <>
            <HeaderTitle title={"Upload Services Charges"}/>
            <Breadcrumb items={breadcrumbData}/>
            <div className='mt-4'>
            <Button onClick={openModal}>Upload Csv</Button>
            <ReusableModal
                isOpen={isModalOpen}
                onClose={csvLoading ? null : closeModal} 
                title="Choose a CSV file."
                confirmText="upload File"
                cancelText="Close"
                isConfirmVisible={true}
                onConfirm={handleConfirm}
                loader={csvLoading}
            >
                <input
                    type="file"
                    id="csvFileInput"
                    onChange={handleFileChange}

                />
                {csvError && <p style={{ color: 'red' }}>{csvError}</p>}  {/* Display error message */}
            </ReusableModal>
            </div>
        </>
    )
}

export default UploadCsv