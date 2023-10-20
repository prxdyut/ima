"use client";

import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const UITabs = ({ tabs = [{ label: "", link: "" }] }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: 2.5,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
          }}
          variant="fullWidth"
        >
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              label={tab.label}
              sx={{ color: "primary.main" }}
              LinkComponent={Link}
              href={tab.link}
            ></Tab>
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default UITabs;
