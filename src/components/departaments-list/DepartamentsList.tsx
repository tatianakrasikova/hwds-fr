import { useEffect, useState } from 'react'
import instance from '../../lib/axios';

import styles from './DepartamentsList.module.css';
import UploadImageForm from '../upload-image-form/UploadImageForm';
import { Departament } from '../../types/types';
import ArticlesForm from '../articles-form/ArticlesForm';
import UploadImageFormArticle from '../upload-image-form/UploadImageFormArticle';

interface Props {
  setDepartaments: React.Dispatch<React.SetStateAction<Departament[]>>,
  departaments: Departament[]
}

export default function DepartamentsList({ departaments, setDepartaments }: Props) {

  const [accordionOpen, setAccordionOpen] = useState(false);

  async function fetchDepartaments() {
    const res = await instance.get('/departaments', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    setDepartaments(res.data)
  }


  async function deleteDepartament(id: number) {
    const res = await instance.delete(`/departaments/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })

    if (res.status === 204) {
      fetchDepartaments();
    }
  }

  function handleDeleteDepartament(id: number) {
    deleteDepartament(id);
  }

  async function deleteArticle(id: number) {
    const res = await instance.delete(`/articles/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    if (res.status === 204) {
      fetchDepartaments();
    }
  }

  function handleDeleteArticle(id: number) {
    deleteArticle(id);
  }


  useEffect(() => { fetchDepartaments() }, [])

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Kategorien</h2>
        <ul>
          {departaments.map((departament) => (<li key={departament.id} className={styles.card}>
            <p className='text-sm mb-0'>Type: {departament.type}</p>
            <p className='text-sm'>Number: {departament.number}</p>
            <button className={styles.removeBtn} onClick={() => handleDeleteDepartament(departament.id)}>Delete</button>
            <div className='bg-gray-100 rounded-md mt-6'>
              <div className='py-2 ml-2'>
                <button
                  onClick={() => setAccordionOpen(!accordionOpen)}
                  className='flex justify-between w-full'>
                  <span className=''>Article</span>
                  {accordionOpen ? <span className='mr-2'>-</span> : <span className='mr-2'>+</span>}
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
                  }`}>
                  <div className='overflow-hidden'>
                    <ul className={styles.bedsContainer}>
                      {departament.articles.map(
                        (article) => <li key={article.id} className='m-0'>
                          <p className='text-sm mb-0'>Number: {article.number}</p>
                          <p className='text-sm'>Type: {article.type}</p>
                          <button className={styles.removeBtn} onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                          <UploadImageFormArticle articleId={article.id} /> 
                        </li>
                      )}
                    </ul>
                    <UploadImageForm departamentId={departament.id} />

                    <ArticlesForm departamentId={departament.id} />

                    

                  </div>
                </div>
              </div>
            </div>
          </li>))}
        </ul>
      </div>
    </>

  )
}