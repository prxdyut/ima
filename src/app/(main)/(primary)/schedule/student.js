'use client'
import { useState } from "react";
import { getAllSchedule } from "@/helper/apis";
import NewButton from "./button";
import Container from "./container";
import { useEffect } from "react";
import Loading from './loading'

export default function Page({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllSchedule()
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, []);
  if (loading) return <Loading />;

  return <Container data={data} />;
}
