import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPet } from '../services/petService';
import { PetForm } from '../components/PetForm';
import { Pet } from '../types/Pet';
import { Typography, Box } from '@mui/material';

export const AddPetPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (pet: Pet) => {
        try {
            await addPet(pet);
            navigate('/');
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Add New Pet
            </Typography>
            <PetForm onSubmit={handleSubmit} />
        </Box>
    );
};