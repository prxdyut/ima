"use client";

import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UITabs = ({ tabs = [{ label: "", link: "" }] }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    tabs
      .map(({ link }) => link)
      .map(
        (item, index) => {
          item.split("/")[1] == path.split("/")[1] &&
          (() => {
            setValue(index);
          })();
        }
      );
  }, [path]);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
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
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default UITabs;
