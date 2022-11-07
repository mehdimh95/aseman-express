import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ItemsList from "./components/ItemsList";
import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import data from "./data";
import { useState } from "react";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(checked, items) {
  return items.filter((item) => checked.indexOf(item.uniqueId) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(data);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (item) => () => {
    const currentIndex = checked.indexOf(item.uniqueId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item.uniqueId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => {
    if (numberOfChecked(items) === items.length) {
      setChecked(
        not(
          checked,
          items.map((item) => item.uniqueId)
        )
      );
    } else {
      setChecked(
        union(
          checked,
          items.map((item) => item.uniqueId)
        )
      );
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(rightChecked.map((item) => item.uniqueId));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(leftChecked.map((item) => item.uniqueId));
  };

  return (
    <Grid
      container
      columnGap={2}
      justifyContent="center"
      alignItems="stretch"
      sx={{
        padding: 2,
        minHeight: "100vh",
      }}
    >
      <Grid
        xs
        item
        container
        rowGap={2}
        direction="column"
        sx={{
          paddingX: 4,
          paddingY: 2,
          borderRadius: "6px",
          backgroundColor: blueGrey[50],
        }}
      >
        <Grid item>
          <Typography variant="h5" textAlign="center">
            All Data
          </Typography>
        </Grid>
        <Button
          variant="outlined"
          onClick={handleCheckedRight}
          aria-label="move selected right"
          sx={{ alignSelf: "flex-end" }}
          disabled={leftChecked.length === 0}
        >
          Add
        </Button>
        <Grid item flexGrow={1}>
          <ItemsList
            items={left}
            checked={checked}
            handleToggleItem={handleToggle}
            handleToggleAll={handleToggleAll}
          />
        </Grid>
      </Grid>
      <Grid
        xs
        item
        container
        rowGap={2}
        direction="column"
        sx={{
          paddingX: 4,
          paddingY: 2,
          borderRadius: "6px",
          backgroundColor: blueGrey[50],
        }}
      >
        <Grid item>
          <Typography variant="h5" textAlign="center">
            Selected Data
          </Typography>
        </Grid>
        <Button
          variant="outlined"
          onClick={handleCheckedLeft}
          aria-label="Remove items"
          sx={{ alignSelf: "flex-end" }}
          disabled={rightChecked.length === 0}
        >
          Remove
        </Button>
        <Grid item flexGrow={1}>
          <ItemsList
            items={right}
            checked={checked}
            handleToggleItem={handleToggle}
            handleToggleAll={handleToggleAll}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
