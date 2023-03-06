import { Search } from "@mui/icons-material";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";
import { contactType } from "../../types";

type propTypes = {
  contacts: contactType[];
};

function Landing(props: propTypes) {
  const { contacts } = { ...props };
  return (
    <div className="container">
      <aside className="sidebar">
        <Box px={2} py={3} display="flex" gap={1}>
          <TextField
            InputProps={{ startAdornment: <Search /> }}
            size="small"
            placeholder="Search"
          />
          <Button variant="outlined">Add</Button>
        </Box>
        <Divider />
        <Box p={1}>
          <List className="contactslist">
            {contacts.map((ele: any) => (
              <ListItem className="contactslist__item" key={ele.id}>
                <NavLink className="contactslist__link txtlink" to={`contacts/${ele.id}`}>
                  <ListItemText>{ele.name}</ListItemText>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </aside>
      <section className="details">
        <Outlet />
      </section>
    </div>
  );
}

export default Landing;
