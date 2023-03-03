import { DeleteRounded, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [state, setState] = useState({
    formData: {},
    contacts: [],
    activeContact: {},
  });

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        let users = data.users.map((ele: any) => {
          let user = {
            id: ele.id,
            name: `${ele.firstName} ${ele.lastName}`,
            phone: ele.phone,
            image: ele.image,
            email: ele.email,
          };
          return user;
        });
        setState({ ...state, contacts: users });
      });
  }, []);

  console.log(state);

  return (
    <div className="container">
      <main>
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
            <List>
              {state.contacts.map((ele: any) => (
                <ListItem key={ele.id}>
                  <ListItemText>
                    <Link className="txtlink" to="/">
                      {ele.name}
                    </Link>
                  </ListItemText>
                  <IconButton aria-label="delete">
                    <DeleteRounded />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </aside>
        <section className="details"></section>
      </main>
    </div>
  );
}

export default Home;
