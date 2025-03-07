import instance from "../../lib/axios";
import styles from './uploadImageForm.module.css';

interface Props {
  departamentId: number;
}

export default function UploadImageForm({ departamentId }: Props) {


  async function handleAddImage(event: any): Promise<void> {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const formData = new FormData();
    formData.append("file", data.file)
    console.log(formData)

    instance.post(`/images/upload/departament/${departamentId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return (
    <div className={styles.card}>
       <div className={styles.card}>
      <h3>Foto Kategorien hinzufügen</h3>
      <form onSubmit={handleAddImage}>
        <input type="file" name="file"className={styles.fileInput}
         />
        <button className={styles.addBtn} type="submit">Speichern</button>
      </form>
    </div>
    </div>
  );
}
