import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById, updatePet } from '../services/petService';
import { PetForm } from '../components/PetForm';
import { Pet } from '../types/Pet';
import { Typography, Box } from '@mui/material';

export const EditPetPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPetById(Number(id));
                setPet(data);
            } catch (error) {
                console.error('Error fetching pet:', error);
            }
        };

        fetchPet();
    }, [id]);

    const handleSubmit = async (updatedPet: Pet) => {
        try {
            await updatePet(Number(id), updatedPet);
            navigate(`/pets/${id}`);
        } catch (error) {
            console.error('Error updating pet:', error);
        }
    };

    if (!pet) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Pet
            </Typography>
            <PetForm initialPet={pet} onSubmit={handleSubmit} isEditing />
        </Box>
    );
};