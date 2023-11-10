import React from "react";
import UITabs from "@/components/tabs";

export default function Page({ children }) {
  return (
    <React.Fragment>
      <UITabs
        tabs={[
          { label: "Assignments", link: "/assignments" },
          { label: "Doubts", link: "/doubts" },
          { label: "Tests", link: "/tests" },
        ]}
      />
      {children}
    </React.Fragment>
  );
}
