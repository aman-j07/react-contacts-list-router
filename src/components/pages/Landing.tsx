import { Search } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext,useState } from "react";
import { NavLink, Outlet} from "react-router-dom";
import { ContactsContext } from "../Home";

function Landing() {
  const { state } = useContext(ContactsContext);
  const [search, setSearch] = useState("");

  const filteredContacts =
    search === ""
      ? state?.contacts
      : state?.contacts.filter((ele) =>
          ele.name.toLowerCase().includes(search.toLowerCase())
        );


  return (
    <div className="container">
      <aside className="sidebar">
        <Box px={2} py={3} display="flex" gap={1}>
          <TextField
            InputProps={{ startAdornment: <Search /> }}
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>
        <Divider />
        <Box p={1}>
          <List className="contactslist">
            {filteredContacts && filteredContacts.length > 0 ? (
              filteredContacts.map((ele: any) => (
                <ListItem className="contactslist__item" key={ele.id}>
                  <NavLink
                    className="contactslist__link txtlink"
                    to={`contacts/${ele.id}`}
                  >
                    <ListItemText>{ele.name}</ListItemText>
                  </NavLink>
                </ListItem>
              ))
            ) : (
              <Typography>No results found</Typography>
            )}
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
