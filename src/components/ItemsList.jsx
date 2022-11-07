import {
  Card,
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ItemsGroup from "./ItemsGroup";
import { blueGrey } from "@mui/material/colors";
import moment from "moment";

const ItemsList = ({ items, checked, handleToggleItem, handleToggleAll }) => {
  const groupedItems = items.reduce((acc, item) => {
    (acc[item.id] = acc[item.id] || []).push(item);
    return acc;
  }, {});

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      {Object.entries(groupedItems).map(([groupId, items]) => {
        return (
          <ItemsGroup
            key={groupId}
            title={groupId}
            count={items.length}
            allChecked={items.every(
              (item) => checked.indexOf(item.uniqueId) !== -1
            )}
            handleToggleAll={() => handleToggleAll(items)}
          >
            <List
              dense
              key={groupId}
              component="ul"
              role="list"
              sx={{
                height: "auto",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                rowGap: 1,
                border: "none",
              }}
            >
              {items
                .sort((a, b) => a.uniqueId - b.uniqueId)
                .map((item) => {
                  const labelId = `list-item-${item.uniqueId}-label`;

                  return (
                    <ListItemButton
                      key={item.uniqueId}
                      role="listitem"
                      component="li"
                      onClick={handleToggleItem(item)}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: blueGrey[100],
                      }}
                    >
                      <ListItemText primary={`#${item.uniqueId}`} />
                      <ListItemText
                        id={labelId}
                        primary={moment(item.created).format("M/D/YYYY")}
                      />
                      <ListItemIcon>
                        <Checkbox
                          checked={checked.indexOf(item.uniqueId) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  );
                })}
            </List>
          </ItemsGroup>
        );
      })}
    </Card>
  );
};

export default ItemsList;
