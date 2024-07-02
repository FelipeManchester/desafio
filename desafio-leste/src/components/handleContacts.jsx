import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const HandleContacts = ({
  open,
  handleClose,
  addContact,
  updateContact,
  selectedContact,
}) => {
  const [contact, setContact] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    language: '',
    birthday: '',
  });

  useEffect(() => {
    if (selectedContact) {
      setContact({
        avatar: selectedContact.avatar,
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        email: selectedContact.email,
        gender: selectedContact.gender,
        language: selectedContact.language,
        birthday: selectedContact.birthday,
      });
    } else {
      setContact({
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        language: '',
        birthday: '',
      });
    }
  }, [selectedContact]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedContact) {
      updateContact({
        ...selectedContact,
        ...contact,
      });
    } else {
      addContact(contact);
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className='flex items-center justify-center'
    >
      <div className='bg-white p-4 rounded'>
        <h2>{selectedContact ? 'Editar contato' : 'Adicionar novo contato'}</h2>
        <form className='space-y-4'>
          <TextField
            label='Avatar'
            name='avatar'
            value={contact.avatar}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Nome'
            name='firstName'
            value={contact.firstName}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Sobrenome'
            name='lastName'
            value={contact.lastName}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Email'
            name='email'
            value={contact.email}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Gênero</InputLabel>
            <Select
              label='Gênero'
              name='gender'
              value={contact.gender}
              onChange={handleChange}
            >
              <MenuItem value='M'>Masculino</MenuItem>
              <MenuItem value='F'>Feminino</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label='Idioma'
            name='language'
            value={contact.language}
            onChange={handleChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Data de Nascimento'
            name='birthday'
            type='date'
            value={contact.birthday}
            onChange={handleChange}
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            {selectedContact ? 'Atualizar' : 'Adicionar'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

HandleContacts.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
};

export default HandleContacts;
