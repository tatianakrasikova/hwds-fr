
import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { useParams } from "react-router-dom";
import BookingForm from "../../components/booking-form/BookingForm";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./DepartamentPage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { Departament } from "../../types/types";


export default function DepartamentPage() {
  const { id } = useParams();
  const [departament, setDepartament] = useState<Departament | undefined>(undefined);

  async function fetchDepartament() {
    const res = await instance.get(`/departaments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setDepartament(res.data);
  }

  useEffect(() => {
    fetchDepartament();
  }, []);

  // Собираем все URL фотографий кроватей в один массив
  const galleryItems =
  departament && departament.articles
      ? departament.articles
          .flatMap(article => article.imageUrls ? article.imageUrls : [])
          .map(url => ({
            original: url,
            thumbnail: url,
          }))
      : [];
 const { user } = useAuth();
  if (user) {
  return (
    <div className={styles.departamentContainer}>
      {departament && (
        <>
          <div className={styles.departamentGallery}>
            {galleryItems.length > 0 ? (
              <ImageGallery
                items={galleryItems}
                showThumbnails={false}       // скрываем эскизы
                showPlayButton={false}       // скрываем кнопку воспроизведения
                showFullscreenButton={false} // скрываем кнопку полноэкранного режима
                showNav={true}               // показываем стрелки навигации
                infinite={true}              // зацикливание галереи
              />
            ) : (
              <img
                className={styles.departamentImage}
                src="/default-departament-image.jpg"
                alt={departament.type}
              />
            )}
          </div>
          <h2> Kategorie {departament.number}</h2>
          <h2>{departament.type}</h2>
          <p className={styles.departamentDescription}>{departament.description}</p>
          {/* <p className={styles.departamentPrice}>Preis: ${departament.price}</p> */}
         
          <ul className={styles.articleList}>
            {departament.articles.map((article) => (
              <li key={article.id} className={styles.articleItem}>
                <p>{article.type}</p>
                <p>{article.number}</p>
                <div className={styles.bookingFormWrapper}>
                <BookingForm id={article.id} price={article.price} />
                </div>
                
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

return <p className={styles.container}>Please register</p>;
}