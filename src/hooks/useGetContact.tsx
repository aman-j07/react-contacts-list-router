import { useState, useEffect } from "react";
import { contactType } from "../types";

const useGetContact = (contacts:contactType[],id:number) => {
  const [contact, setContact] = useState<contactType | null>(null);

  useEffect(() => {
    let temp = contacts.find(
      (ele) => ele.id === id
    );
    if (temp) {
      setContact(temp);
    }
  }, [id,contacts]);

  return contact;
};

export default useGetContact;