import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import styles from "./ArticlesFrom.module.css";
import { AxiosError } from "axios";
import BookingForm from "../booking-form/BookingForm";


const schema = Yup.object({
  number: Yup.string().required("Article`s number is required!"),
  type: Yup.string().required("Type of article is required!"),
  price: Yup.number().required("Price is required!"),
});

interface ArticlesFormProps {
  departamentId: number;
}
interface Article {
  id: number;
  number: string;
  type: string;
  price: number;
}

const ArticlesForm = ({ departamentId }: ArticlesFormProps) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [articles, setArticles] = useState<Article[]>([]); // Список артиклей
  const navigate = useNavigate();

  useEffect(() => {
  //   if (errorMessage || successMessage) {
  //     const timer = setTimeout(() => {
  //       setErrorMessage(null);
  //       setSuccessMessage(null);
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [errorMessage, successMessage]);

  async function fetchArticles() {
    try {
      const res = await instance.get(`/articles?departamentId=${departamentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setArticles(res.data); // Сохраняем список артиклей
    } catch (error) {
      console.error("Ошибка загрузки артиклей:", error);
    }
  }
  fetchArticles();
}, [departamentId]);

  const formik = useFormik({
    initialValues: {
      number: '',
      type: '',
      price: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const regRes = await instance.post("/articles", { ...values, price: Number(values.price), departamentId }, {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        });

        if (regRes.status === 201) {
          const articleId = regRes.data.id;
          // 2. Если файл выбран, отправляем его на загрузку
          if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            await instance.post(
              `/images/upload/article/${articleId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
            );
          }

          setSuccessMessage("Article added successfully");
          navigate(0);
        }

      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
      }
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <>
      <div className={styles.addArticle}>
        <h2>
          {errorMessage && <div className="text-sm text-center text-red-500">{errorMessage}</div>}
          {successMessage && <div className="text-sm text-center text-green-500">{successMessage}</div>}
        </h2>
        <form onSubmit={formik.handleSubmit}>
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
            name="price"
            placeholder="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          
            {/* <input
          type="file"
          name="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />  */}
          <button type="submit" className={styles.btn}>Add</button>
          <div className="text-sm text-red-500 text-center">
            {formik.errors.number && <div className="error">{formik.errors.number}</div>}
            {formik.errors.price && <span>{formik.errors.price}</span>}
          </div>
        </form>
         {/* Отображение списка артиклей и передача цены в BookingForm */}
      {articles.length > 0 && (
        <div className={styles.articlesList}>
          <h3>Available Articles</h3>
          {articles.map((article) => (
            <div key={article.id} className={styles.article}>
              <p>Article ID: {article.id}</p>
              <p>Price: €{article.price.toFixed(2)}</p>
               {/* <BookingForm id={article.id} price={article.price} /> */}
            </div>
          ))}
        </div>
          )}
      </div>
    </>
  );
};
export default ArticlesForm;



