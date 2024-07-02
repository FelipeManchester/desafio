'use client';

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  CircularProgress,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import HandleContacts from '../../components/handleContacts';
import { getData } from '../api/contacts';

const ContatosPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
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
      setRows(contactList);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setSelectedContact(null);
    setOpenModal(false);
  };

  const handleAddContact = (newContact) => {
    setRows((prevRows) => {
      const newId = prevRows.length ? prevRows[prevRows.length - 1].id + 1 : 1;
      return [...prevRows, { id: newId, ...newContact }];
    });
    handleCloseModal();
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    handleOpenModal();
  };

  const handleUpdateContact = (updatedContact) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedContact.id ? updatedContact : row,
      ),
    );
    handleCloseModal();
  };

  const handleRemoveContact = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    handleCloseDialog();
  };

  const handleOpenDialog = (contact) => {
    setContactToDelete(contact);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setContactToDelete(null);
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    handleRemoveContact(contactToDelete.id);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'avatar',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => {
        return <img src={params.value} className='rounded-full bg-black' />;
      },
    },
    {
      field: 'firstName',
      headerName: 'Nome',
      width: 130,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'lastName',
      headerName: 'Sobrenome',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 240,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'gender',
      headerName: 'Gênero',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'language',
      headerName: 'Idioma',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'birthday',
      headerName: 'Data de Nascimento',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditContact(params.row)}>
            <Edit className='text-font-first' />
          </IconButton>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <Delete className='text-red-700' />
          </IconButton>
        </div>
      ),
    },
  ];

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
      <div className='flex justify-end mb-3'>
        <Button
          variant='contained'
          onClick={handleOpenModal}
          className='bg-font-first  hover:bg-bg-gray hover:text-font-first'
        >
          Adicionar Contato
        </Button>
      </div>
      <HandleContacts
        open={openModal}
        handleClose={handleCloseModal}
        addContact={handleAddContact}
        updateContact={handleUpdateContact}
        selectedContact={selectedContact}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-diallg-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Remover contato'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Você tem certeza que quer deletar esse contato?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={confirmDelete}>Confirmar</Button>
        </DialogActions>
      </Dialog>
      <section>
        <DataGrid rows={rows} columns={columns} />
      </section>
    </div>
  );
};

export default ContatosPage;
