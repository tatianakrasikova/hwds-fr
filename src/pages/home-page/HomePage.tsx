import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { Departament } from "../../types/types";

const HomePage: React.FC = () => {
  const [departaments, setDepartaments] = useState<Departament[]>([]);
  async function fetchDepartaments() {
    const res = await instance.get('/departaments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    setDepartaments(res.data);
  }

  useEffect(() => {
    fetchDepartaments();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kategorien</h2>
      <div className={styles.cardContainer}>
        {departaments.map((departament) => (
          <Link
            to={`/departaments/${departament.id}`}
            key={departament.id}
            className={styles.card}
          >
            {/* Проверяем наличие изображений */}
            <img
              src={
                departament.imageUrls && departament.imageUrls.length > 0
                  ? departament.imageUrls[0]
                  : '/default-departament-image.jpg'
              }
              alt={departament.type || 'Departament Image'}
              className={styles.image}
            />
            <h2 className={styles.departamentTitle}>{departament.type}</h2>
            <p className={styles.description}>
              {departament.description || "No description available"}
            </p>
            {/* <p className={styles.price}>Price: €{departament.price}</p> */}
          </Link>
        ))}
      </div>
      
      {/* Дополнительные услуги*/}

      <div >
        <h2 className={styles.title}>Websites für kleine Unternehmen</h2>
      {/* <h3 className= {styles.title}>you can order all additional services upon arrival</h3> */}
        <div className={styles.cardserviceContainer}><Link to="/shop"
           className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/Clean.jpg" alt="Internet Shop" />
            <p className={styles.servicesDescription}>Internet-Shop</p>
            </Link>

            <Link to="/hotel" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/flamingoImage.jpg" alt="Hotel" />
            <p className={styles.servicesDescription}>Hotel-Website</p>
            </Link>

            <Link to="/anwaltdienstleistungen" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/baggage.webp" alt="Anwaltsdienstleistungen" />
            <p className={styles.servicesDescription}>Anwaltsdienstleistungen</p>
            </Link>

            <Link to="/friseurdienstleistungen" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Friseurdienstleistungen" />
            <p className={styles.departamentDescription}>Friseurdienstleistungen</p>
            </Link>

            <Link to="/artzpraxis"  className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Artzpraxis" />
            <p className={styles.departamentDescription}>Artzpraxis</p>
            </Link>

            <Link to="/nagelindustrie"  className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Nagelindustrie" />
            <p className={styles.departamentDescription}>Nagelindustrie</p>
            </Link>

            <Link to="/wohnungsrenovierungservice" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Wohnungsrenovierungservice" />
            <p className={styles.departamentDescription}>Wohnungsrenovierungservice</p>
            </Link>

            <Link to="/cleaning" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Cleaning" />
            <p className={styles.departamentDescription}>Cleaning Service</p>
            </Link>

            <Link to="/informationsseite"  className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Informationsseite" />
            <p className={styles.departamentDescription}>Informationsseite. Blog</p>
            </Link>

            <Link to="/backerei" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Bäckerei" />
            <p className={styles.departamentDescription}>Bäckerei</p>
            </Link>

            <Link to="/autoreparaturservice" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Autoreparaturservice" />
            <p className={styles.departamentDescription}>Autoreparaturservice</p>
            </Link>

            <Link to="/nachhilfedienste" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Nachhilfedienste" />
            <p className={styles.departamentDescription}>Nachhilfedienste</p>
            </Link>

            <Link to="/schlüsselfertigesbauen" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Schlüsselfertiges Bauen" />
            <p className={styles.departamentDescription}>Schlüsselfertiges Bauen</p>
            </Link>

            <Link to="/sanitardienstleistungen" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt=" Sanitärdienstleistungen" />
            <p className={styles.departamentDescription}>Elektriker- und Sanitärdienstleistungen</p>
            </Link>
    
            <Link to="/massagedienstleistungen" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Massagedienstleistungen" />
            <p className={styles.departamentDescription}>Massagedienstleistungen. Physiotherapeut</p>
            </Link>

            <Link to="/lieferung" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Lieferung" />
            <p className={styles.departamentDescription}>
            Transport und Lieferung</p>
            </Link>
            <Link to="/pizzeria" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Pizzeria" />
            <p className={styles.departamentDescription}>Pizzeria. Online-Lieferung</p>
            </Link>

            <Link to="/computereparaturdienste" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Telefonreparaturdienste" />
            <p className={styles.departamentDescription}>Computer- und Telefonreparaturdienste</p>
            </Link>

            <Link to="/reiseburo" className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Reisebüro" />
            <p className={styles.departamentDescription}>Reisebüro</p>
            </Link>

            <Link to="/immobilienagentur"  className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Immobilienagentur" />
            <p className={styles.departamentDescription}>Immobilienagentur</p>
            </Link>

            <Link to="/steuerberater"  className={styles.card}>
            <img className={styles.servicesImage} src="/assets/images/searf.jpg" alt="Steuerberater" />
            <p className={styles.departamentDescription}>Steuerberater</p>
            </Link>
    </div>
      </div>
    </div>
  );
};

export default HomePage;
