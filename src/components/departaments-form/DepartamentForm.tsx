import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import instance from "../../lib/axios";
import styles from "./DepartamentForm.module.css";
import { AxiosError } from "axios";
import { Departament } from "../../types/types";


const schema = Yup.object({
  number: Yup.string().required("Departament number is required!"),
  type: Yup.string().required("Type is required!"),
  description: Yup.string().required("Description is required!"),
});

interface Props {
  setDepartaments: React.Dispatch<React.SetStateAction<Departament[]>>;
  departaments: Departament[];
}

const DepartamentsForm = ({ setDepartaments }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  async function fetchDepartaments() {
    const res = await instance.get("/departaments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setDepartaments(res.data);
  }
  async function handleDeleteImage(imageId: number) {
    try {
      const res = await instance.delete(`/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res.status === 204) {
        setSuccessMessage("Image deleted successfully");
        fetchDepartaments();
      }
    } catch (error) {
      setErrorMessage("Failed to delete image");
    }
  }

  const formik = useFormik({
    initialValues: {
      number: "",
      type: "",
      description: ""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const regRes = await instance.post("/departaments", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (regRes.status === 201) {
          setSuccessMessage("Departament is successfully added")
          fetchDepartaments();
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
      }
    },
  });
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Add departament</h2>
        <form onSubmit={formik.handleSubmit}>
          {errorMessage && <div className="error pl-3 text-red-500">{errorMessage}</div>}
          {successMessage && <div className="success pl-3 text-green-500">{successMessage}</div>}
          <input
            type="text"
            name="number"
            placeholder="number"
            value={formik.values.number}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <button type="submit" className={styles.btn}>
            Add
          </button>
          {formik.errors.number && (
            <div className="error text-center text-red-500">{formik.errors.number}</div>
          )}
          
        </form>
      </div>
    </>
  );
};
export default DepartamentsForm;
