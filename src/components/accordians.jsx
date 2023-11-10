import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

export default function UIAccordian({ contents = [{}], style = {} }) {
  return (
    <React.Fragment>
      {contents.map((_, index) => (
        <Accordion
        
          key={index}
          elevation={0}
          sx={{
            borderRadius: 2,
            border: 1,
            borderColor: (theme) => theme.palette.text.disabled,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box>{_?.title}</Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>{_?.content}</Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </React.Fragment>
  );
}
