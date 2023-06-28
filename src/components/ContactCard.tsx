import { StarBorder } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetContact from "../hooks/useGetContact";
import { contactType } from "../types";
import { ContactsContext } from "./Home";

function ContactCard() {
  const { state, setState } = useContext(ContactsContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const contact = useGetContact(state!.contacts, parseInt(String(userId)));

  const editContact = () => {
    setState!({ ...state!, editId: parseInt(String(userId)) });
    navigate(`/contacts/${userId}/edit`);
  };

  const deleteContact = () => {
    let index = state!.contacts.findIndex(
      (ele: contactType) => ele.id === parseInt(String(userId))
    );
    state!.contacts.splice(index, 1);
    setState!({ ...state! });
    navigate("/");
  };

  return (
    <div className="contact">
      {contact !== null ? (
        <>
          <img
            className="contact__avatar"
            src={contact.image}
            alt="active contact avatar"
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" gap={1}>
              <Typography variant="h4">{contact.name}</Typography>
              <IconButton>
                <StarBorder />
              </IconButton>
            </Box>
            {contact.email !== "" && (
              <Typography variant="subtitle1">{contact.email}</Typography>
            )}
            <Typography variant="subtitle2">{contact.phone}</Typography>
            <Box display="flex" gap={2}>
              <Button onClick={editContact} variant="outlined" size="small">
                Edit
              </Button>
              <Button
                onClick={deleteContact}
                variant="outlined"
                size="small"
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ContactCard;
