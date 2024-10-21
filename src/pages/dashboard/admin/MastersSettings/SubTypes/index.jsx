import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../redux/admin/actions/data";
import ReusableTable from "@/components/common/Tables";
import { TailSpin } from "react-loader-spinner";

const SubTypesPage = () => {
  const dispatch = useDispatch();
  const { data, isFetchingData, error } = useSelector((state) => state.data);

  useEffect(() => {
    const url = `${process.env.VITE_BASE_URL}/getAllFieldSubTypes`;
    dispatch(fetchData({ url, title: "SubTypes" }));
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">SubTypes</h1>
      {isFetchingData ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" visible={true} />
        </div>
      ) : (
        <ReusableTable data={data} />
      )}
    </div>
  );
};

export default SubTypesPage;
