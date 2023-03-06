import { Button, TextField } from "@mui/material";
import React, { useContext,useRef,} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetContact from "../hooks/useGetContact";
import { ContactsContext } from "./Home";

function ContactEdit() {
  const { state, setState } = useContext(ContactsContext);
  const { userId } = useParams();
  const contact = useGetContact(state!.contacts, parseInt(String(userId)));
  const refFormObj = useRef<{
    name: null | HTMLInputElement;
    email: null | HTMLInputElement;
    phone: null | HTMLInputElement;
  }>({
    name: null,
    email: null,
    phone: null,
  });

  const navigate=useNavigate()

  const updateContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let phone = refFormObj.current.phone!.value;
    if (phone.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)) {
      refFormObj.current.phone?.classList.remove("error");
    } else {
      refFormObj.current.phone?.classList.add("error");
      return;
    }
    let index = state!.contacts.findIndex(
      (ele) => ele.id === parseInt(String(userId))
    );
    state!.contacts[index] = {
      ...contact!,
      name: refFormObj.current.name!.value,
      phone:refFormObj.current.phone!.value,
      email:refFormObj.current.email!.value
    };
    setState!({ ...state!});
    navigate(`/contacts/${userId}/`)
  };

  return (
    <div className="contactedit">
      {contact ? (
        <form
          className="contactedit__form"
          onSubmit={(e) => {
            updateContact(e);
          }}
        >
          <TextField
            defaultValue={contact.name}
            placeholder="Name"
            size="small"
            inputRef={(ele: HTMLInputElement) => {
              refFormObj.current.name = ele;
            }}
          />
          <TextField
            defaultValue={contact.email}
            placeholder="Email"
            size="small"
            helperText="Enter a valid email"
            inputRef={(ele: HTMLInputElement) => {
              refFormObj.current.email = ele;
            }}
            type="email"
          />
          <TextField
            defaultValue={contact.phone}
            placeholder="Phone"
            size="small"
            helperText="Enter a valid phone"
            inputRef={(ele: HTMLInputElement) => {
              refFormObj.current.phone = ele;
            }}
          />
          <Button type="submit">Update Contact</Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default ContactEdit;
