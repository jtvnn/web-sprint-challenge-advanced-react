// write your custom hook here to control your checkout form
import { useState } from "react";

const initialValue = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

const useForm = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values, setValues] = useState(initialValue);
  
    const handleChanges = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    return [ values, showSuccessMessage, setShowSuccessMessage, handleChanges]
  }

  export default useForm;