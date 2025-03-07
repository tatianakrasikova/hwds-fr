import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import instance from "../../lib/axios";
import styles from "./BookingForm.module.css";

const schema = Yup.object({
  entryDate: Yup.date().required("Entry date is required!"),
  departureDate: Yup.date().required("Departure date is required!"),
});
interface Props {
  id: number;
  price: number;
}
const BookingForm = ({ id, price }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      entryDate: "",
      departureDate: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        await instance.post(`/cart/article/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setSuccessMessage("Article successfully booked!");
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || "An error occurred");
        }
      }
    },
  });
  return (
    <div className={styles.container}>
      <ul>
        <li>
          {" "}
          <h3>
            {" "}
            Ein Beispiel für eine Website finden Sie unter diesem Link
          </h3>
        </li>
        <li>
          {" "}
          <h3>
            {" "}
            Bitte senden Sie uns ein Foto, eine Beschreibung und weitere
            Informationen, die Sie zu Ihrer Website hinzufügen können, per
            E-Mail hwds-web@gmail.com ( vergessen Sie nicht, die Bestellnummer
            anzugeben).{" "}
          </h3>
        </li>
        <li>
          {" "}
          <h3>
            {" "}
            Geben Sie das Bestelldatum und das gewünschte Erstellungsdatum für
            Ihre Website ein (die Mindestdauer beträgt 2 Wochen, abhängig von
            der Funktionalität der Website).
          </h3>
        </li>
        <li>
          {" "}
          <h3>Kostenlose Beratung per E-Mail.</h3>
        </li>
      </ul>
      <h2 className={styles.title}>Bezahlen</h2>
      <p className={styles.price}>
        Preis: €{isNaN(Number(price)) ? "0.00" : Number(price).toFixed(2)}
      </p>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="date"
          name="entryDate"
          placeholder="Entry Date"
          value={formik.values.entryDate}
          onChange={formik.handleChange}
        />

        <input
          type="date"
          name="departureDate"
          placeholder="Departure Date"
          value={formik.values.departureDate}
          onChange={formik.handleChange}
        />

        <button type="submit" className={styles.btn}>
          Bezahlen
        </button>
        <div>
          {formik.errors.entryDate && (
            <div className={styles.error}>{formik.errors.entryDate}</div>
          )}{" "}
        </div>
        <div>
          {formik.errors.departureDate && (
            <span>{formik.errors.departureDate}</span>
          )}
        </div>

        <div></div>
      </form>
      {(errorMessage || successMessage) && (
        <div className={styles.messages}>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {successMessage && (
            <div className={styles.success}>{successMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};
export default BookingForm;
