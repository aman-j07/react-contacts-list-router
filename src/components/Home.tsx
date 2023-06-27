import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { contactType } from "../types";
import ContactCard from "./ContactCard";
import ContactEdit from "./ContactEdit";
import Landing from "./pages/Landing";
import { Typography } from "@mui/material";

type stateType = {
  contacts: contactType[];
  editId: number;
};

export const ContactsContext = createContext<{
  state: null | stateType;
  setState: null | React.Dispatch<React.SetStateAction<stateType>>;
}>({ state: null, setState: null });

function Home() {
  const [state, setState] = useState<stateType>({
    contacts: [],
    editId: -1,
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

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Landing />,
      children: [
        { path: "contacts/:userId", element: <ContactCard /> },
        { path: "contacts/:userId/edit", element: <ContactEdit /> },
        {
          path: "/",
          element: (
            <div>
              <Typography fontSize={28} fontWeight={600}>Contacts List</Typography>
              <Typography marginTop={1}>
                Click on any contacts given on left side to view a contact
              </Typography>
            </div>
          ),
        },
      ],
    },
  ];

  const contextValue = useMemo(() => {
    return { state: state, setState: setState };
  }, [state]);

  const router = createBrowserRouter(routes);

  return (
    <div className="container">
      <ContactsContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </ContactsContext.Provider>
    </div>
  );
}

export default Home;
