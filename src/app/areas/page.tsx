"use client";
import EnhancedTable from "@/components/Table";
import { Data } from "./type";
import React, { useEffect, useState } from "react";
import { mockData } from "./mock-data";
import Header from "@/components/Table/header";
import { columns, rowOptions } from "./contants";

const Users = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        color: "#000000",
        padding: "32px 24px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <Header title="Áreas" label="Institución" addLabelButton="Agregar Area" />
      {!loading && (
        <EnhancedTable
          withSwitch
          rowOptions={rowOptions}
          rows={data}
          columns={columns}
        />
      )}
    </div>
  );
};
export default Users;
