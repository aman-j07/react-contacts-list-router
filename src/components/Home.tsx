import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { contactType } from "../types";
import ContactCard from "./ContactCard";
import ContactEdit from "./ContactEdit";
import Landing from "./pages/Landing";

type stateType={
  contacts:contactType[],
  editId:number
}

export const ContactsContext=createContext<{state:null|stateType,setState:null|React.Dispatch<React.SetStateAction<stateType>>}>({state:null,setState:null})

function Home() {

  const [state, setState] = useState<stateType>({
    contacts: [],
    editId:-1,
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
        {path:'contacts/:userId',element:<ContactCard />},
        {path:'contacts/edit/:userId',element:<ContactEdit/>}
      ]
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <div className="container">
      <ContactsContext.Provider value={{state:state,setState:setState}}>
      <RouterProvider router={router} />
      </ContactsContext.Provider>
    </div>
  );
}

export default Home;
