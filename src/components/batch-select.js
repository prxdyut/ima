"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function BatchSelect({ ...params }) {
  const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

  const options = data.map(({ grade, section, _id }) => ({
    label: `${grade} ${section}`,
    value: _id,
  }));

  useEffect(() => {
    fetch("http://localhost:3000/api/batches")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Batch</InputLabel>
      <Select label={"Batch"} {...params}>
        <MenuItem value={null} disabled selected>
          &nbsp;
        </MenuItem>
        {options.map((option, idx) => (
          <MenuItem value={option.value} key={idx}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
