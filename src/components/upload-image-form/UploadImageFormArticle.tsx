import instance from "../../lib/axios";
import styles from "./uploadImageForm.module.css";
import React from "react";

interface Props {
  articleId: number;
}

export default function UploadImageFormArticle({ articleId }: Props) {

  async function handleAddImage(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    // Создаем FormData из формы (все поля, включая файл, будут добавлены автоматически)
    const formData = new FormData(event.currentTarget);
    console.log(formData);

    try {
      const response = await instance.post(
        `/images/upload/article/${articleId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  return (
    <div className={styles.card}>
      <h3>Artikelfoto hinzufügen</h3>
      <form onSubmit={handleAddImage}>
        <input type="file" name="file" className={styles.fileInput} />
        <button className={styles.addBtn} type="submit">
        Speichern
        </button>
      </form>
    </div>
  );
}
