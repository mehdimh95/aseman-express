import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";

const ItemsGroup = ({
  title,
  count,
  allChecked,
  handleToggleAll,
  children,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={isExpanded} onChange={() => setExpanded(!isExpanded)}>
      <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
        <Grid container alignItems="center">
          <Grid
            item
            sx={{
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
              aspectRatio: "1/1",
              backgroundColor: blueGrey[100],
            }}
          >
            <Typography>{title}</Typography>
          </Grid>
          <Grid item sx={{ margin: "0 auto" }}>
            <Typography>Quantity: {count}</Typography>
          </Grid>
          <Grid item>
            <Checkbox
              size="small"
              checked={allChecked}
              tabIndex={-1}
              disableRipple
              onClick={(e) => {
                handleToggleAll();
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </Grid>
          <Grid item>
            <ExpandMoreIcon
              sx={{
                transform: isExpanded ? `rotate(180deg)` : "",
                transition: "transform 150ms linear",
              }}
            />
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ItemsGroup;
