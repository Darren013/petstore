import { useEffect, useState } from 'react';
import { PetList } from '../components/PetList';
import { Pet } from '../types/Pet';
import { Container, Typography } from '@mui/material';
import { getAllPets, deletePet } from '../services/petService';

export const HomePage = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = await getAllPets();
                setPets(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletePet(id);
            setPets(pets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {loading ? (
                <Typography>Loading pets...</Typography>
            ) : pets.length === 0 ? (
                <Typography>No pets found</Typography>
            ) : (
                <PetList pets={pets} onDelete={handleDelete} />
            )}
        </Container>
    );
};