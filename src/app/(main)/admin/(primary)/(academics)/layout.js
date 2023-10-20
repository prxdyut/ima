import React from "react";
import UITabs from "@/components/tabs";

export default function Page({ children }) {
  return (
    <React.Fragment>
      <UITabs
        tabs={[
          { label: "Assignments", link: "/admin/assignments" },
          { label: "Doubts", link: "/admin/doubts" },
          { label: "Tests", link: "/admin/tests" },
        ]}
      />
      {children}
    </React.Fragment>
  );
}
