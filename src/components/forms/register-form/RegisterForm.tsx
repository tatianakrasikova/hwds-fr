import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import instance from "../../../lib/axios";
import { AxiosError } from "axios";
import styles from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";

const schema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Only letters are allowed!")
    .required("First Name is required!"),
  lastName: Yup.string()
    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Only letters are allowed!")
    .required("Last Name is required!"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Only numbers are allowed!")
    .min(5, "Phone needs to be at least 5 characters!")
    .required("Phone is required!"),
  userEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password needs to be more than 8 characters!")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required!"),
});

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isSuccessfulReg, setIsSuccessfulReg] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      userEmail: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const res = await instance.post("/auth/register", values, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 201) {
          setIsSuccessfulReg(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.message;
          console.log(errorMsg);
          setErrorMessage(errorMsg);

          if (errorMsg?.toLowerCase().includes("user already exists")) {
            setTimeout(() => navigate("/login"), 2000); // Перенаправляем через 2 сек
          }
        }
      }
    },
  });
  if (isSuccessfulReg) {
    return (
      <>
        <div className={styles.container}>
          <p>You have successfully registered</p>
          <Link to="/login" className={styles.link}>
            Press here to go to login page
          </Link>
        </div>
      </>
    );
  }
  return (
    <div className={styles.registerForm}>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.firstName && (
          <div className={styles.error}>{formik.errors.firstName}</div>
        )}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        {formik.errors.lastName && (
          <div className={styles.error}>{formik.errors.lastName}</div>
        )}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        {formik.errors.phoneNumber && (
          <div className={styles.error}>{formik.errors.phoneNumber}</div>
        )}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        {formik.errors.userEmail && (
          <div className={styles.error}>{formik.errors.userEmail}</div>
        )}
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={formik.values.userEmail}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <div className={styles.error}>{formik.errors.password}</div>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <button type="submit" className={styles.formButton}>
          Register
        </button>
      </form>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};
export default RegisterForm;
