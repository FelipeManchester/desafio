/*

To do:

Chamada a API - ✅️
Listar os contatos - ✅️
Adicionar um novo contato - 
Remover um contato - 
Editar um contato - 
Adicionar filtrar por:
Gênero, Language, Age, Birthday (Mês),
Adicionar gráfico com:
Estatísticas dos contatos, exibir total de contatos por Gender e Language

Persistir as informações no browser (localStorage) - 


*/

'use client';

import { DataGrid } from '@mui/x-data-grid';
import { getData } from '../api/contacts';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'avatar',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <img src={params.value} />;
    },
  },
  { field: 'firstName', headerName: 'Nome', width: 150 },
  { field: 'lastName', headerName: 'Sobrenome', width: 150 },
  { field: 'email', headerName: 'E-mail', width: 240 },
  { field: 'gender', headerName: 'Gênero', width: 80 },
  { field: 'language', headerName: 'Idioma', width: 150 },
  { field: 'birthday', headerName: 'Data de Nascimento', width: 150 },
];

const ContatosPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setRows(data);

      const contactList = data.map((contact) => ({
        id: contact.id,
        avatar: contact.avatar,
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        gender: contact.gender,
        language: contact.language,
        birthday: contact.birthday,
      }));
      setLoading(false);
      setRows(contactList);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <CircularProgress
        className='m-auto text-font-first'
        size={50}
        thickness={2}
      />
    );
  }

  return (
    <div>
      <h1 className='text-xl'>Contatos</h1>
      <section>
        <DataGrid rows={rows} columns={columns} />
      </section>
    </div>
  );
};

export default ContatosPage;
