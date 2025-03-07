

import { useState } from 'react';

import { Departament } from '../../types/types';
import DepartamentsForm from '../../components/departaments-form/DepartamentForm';
import DepartamentsList from '../../components/departaments-list/DepartamentsList';


export default function DepartamentsPage() {
    const [departaments, setDepartaments] = useState<Departament[]>([]);
  return (
    <div>
      <DepartamentsForm departaments={departaments} setDepartaments={setDepartaments} />
      <DepartamentsList departaments={departaments} setDepartaments={setDepartaments} />
    </div>
  )
}

