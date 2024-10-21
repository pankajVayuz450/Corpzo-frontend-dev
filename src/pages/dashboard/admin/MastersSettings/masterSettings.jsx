import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/admin/Card";
import { addTitle, addUrl } from "@/redux/admin/slices/data";
import { useDispatch } from "react-redux";

const cardData = [
  {
    id: 1,
    title: "Elements",
    url: `${process.env.VITE_BASE_URL}/getAllFieldTypes`,
  },
  // {
  //   id: 2,
  //   title: "SubTypes",
  //   url: `${process.env.VITE_BASE_URL}/getAllFieldSubTypes`,
  // },
  {
    id: 3,
    title: "Attributes",
    url: `${process.env.VITE_BASE_URL}/getAllAttributes`,
  }
  ,{
    id: 4,
    title: "Valid Form Element",
    url: `${process.env.VITE_BASE_URL}/getValidFormElement`,
  
  }
  // ,{
  //   id: 5,
  //   title: "Valid Form Element Types",
  //   url: `${process.env.VITE_BASE_URL}/getValidFormElementTypes`,
  
  // }
  ,{
    id: 6,
    title: "Valid Form Element Attributes",
    url: `${process.env.VITE_BASE_URL}/getValidFormAttributes`,
  
  }
  ,{
    id: 7,
    title: "Regex",
    url: `${process.env.VITE_BASE_URL}/getRegex`,
  
  }
  ,{
    id: 8,
    title: "Category",
    url: `${process.env.VITE_BASE_URL}/getCategory`,
  
  }
  ,{
    id: 9,
    title: "Sub Category",
    url: `${process.env.VITE_BASE_URL}/getSubCategory`,
  
  }
  ,{
    id: 10,
    title: "Department",
    url: `${process.env.VITE_BASE_URL}/getDepartment`,
  
  }
];

export function MasterSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (title, url) => {
    dispatch(addTitle(title));
    dispatch(addUrl(url));
    navigate(`/dashboard/admin/masterSettings/dropdowndetailPage?title=${title}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {cardData.map((card) => (
        <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer" onClick={() => handleCardClick(card.title, card.url)}>
          <Card title={card.title}
          />
        </div>
      ))}
    </div>
  );
}

export default MasterSettings;