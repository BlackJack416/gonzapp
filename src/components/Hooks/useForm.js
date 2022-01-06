import { useState } from "react";
import { helpHttp } from "../../services/helpHttp";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    //en reemplazo de: [e.target.name] = e.target.value:
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  //BLUR:
  const handleBlur = (e) => {
    handleChange(e);

    //Para mostrar errores:
    setErrors(validateForm(form));
  };

  //INPUT:
  const handleInput = (e) => {
    handleChange(e);

    //Para mostrar errores:
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validateForm(form));

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .post("https://formsubmit.co/ajax/ojedagonzalo27@gmail.com", {
          body: form,
          headers: {
            "Content-Type": "applicatios/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          setLoading(false);
          setResponse(true);
          setForm(initialForm);
          setTimeout(() => setResponse(false), 5000);
        });
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleBlur,
    handleInput,
    handleChange,
    handleSubmit,
  };
};