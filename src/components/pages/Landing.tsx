import { Search, DoneAllOutlined } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ContactsContext } from "../Home";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

function Landing() {
  const { state } = useContext(ContactsContext);
  const [search, setSearch] = useState("");

  const filteredContacts =
    search === ""
      ? state?.contacts
      : state?.contacts.filter((ele) =>
          ele.name.toLowerCase().includes(search.toLowerCase())
        );

  const onboardingSteps = [
    {
      title: "Contact List",
      intro: "This is the list of all the contacts.",
      element: ".contacts-list-highlight",
    },
    {
      title: "Contact Tab",
      element: ".contacts-list__item:nth-child(1)",
      intro: "Click on any contact to view the details!",
    },
    {
      title: "Search Box",
      element: ".search",
      intro: "You can also search for any contacts in the list!",
    },
    {
      title: "Hurray !",
      intro: (
        <Typography>
          You are good to go! <DoneAllOutlined />
        </Typography>
      ),
    },
  ];

  return (
    <div className="container">
      <Steps
        enabled={true}
        steps={onboardingSteps}
        initialStep={0}
        onExit={() => {
          console.log("exit");
        }}
        options={{ doneLabel: "Finish" }}
      />
      <aside className="sidebar">
        <Box px={2} py={3} display="flex" gap={1} className="search-container">
          <TextField
            InputProps={{ startAdornment: <Search /> }}
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="search"
          />
        </Box>
        <Box className="contacts-list-highlight" />
        <Box p={1} className="contacts-list-container">
          <List className="contacts-list">
            {filteredContacts && filteredContacts.length > 0 ? (
              filteredContacts.map((ele: any) => (
                <ListItem className="contacts-list__item" key={ele.id}>
                  <NavLink
                    className="contacts-list__link txtlink"
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
