import HeaderTitle from "@/components/common/HeaderTitle";
import TitleComponent from "@/components/common/TitleComponent";
import Breadcrumb from "@/widgets/layout/TopNavigation";
import React from "react";

export function Home() {
  
  const breadcrumbData=[
    {
      name : "Analytics"
    }
  ]
  return (
    <div>
      <HeaderTitle title={"Analytics"}/>
      <TitleComponent title={"CORPZO | Analytics"}/>
      <Breadcrumb items={breadcrumbData}/>
      <h1>Coming Soon...</h1>
    </div>
  );
}

export default Home;
