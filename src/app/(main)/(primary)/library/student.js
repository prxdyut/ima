'use client'
import React from "react";
import UIList from "@/components/list";
import { getFiles } from "@/helper/apis";
import NewButton from "./button";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./loading";
import { useUser } from "@clerk/nextjs";

export default function Page({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;

  const contents = data.map(({ title, type, created, url }) => ({
    title,
    description: type,
    helper: new Date(created).toLocaleDateString(),
    link: url,
  }));

  return (
    <React.Fragment>
      <UIList style={{ mx: -2 }} contents={contents} target="_blank" />
    </React.Fragment>
  );
}
