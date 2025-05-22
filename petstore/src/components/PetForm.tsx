import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { Pet } from '../types/Pet';
import { useState, useEffect } from 'react';

interface PetFormProps {
    initialPet?: Pet;
    onSubmit: (pet: Pet) => void;
    isEditing?: boolean;
}

export const PetForm = ({ initialPet, onSubmit, isEditing = false }: PetFormProps) => {
    const [pet, setPet] = useState<Pet>(initialPet || {
        name: '',
        species: '',
        breed: '',
        gender: '',
        image: '',
        description: '',
        price: 0
    });

    useEffect(() => {
        if (initialPet) {
            setPet(initialPet);
        }
    }, [initialPet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPet(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(pet);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                {isEditing ? 'Edit Pet' : 'Add New Pet'}
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={pet.name}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Species"
                name="species"
                value={pet.species}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Breed"
                name="breed"
                value={pet.breed}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                select
                label="Gender"
                name="gender"
                value={pet.gender}
                onChange={handleChange}
            >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <TextField
                margin="normal"
                fullWidth
                label="Image URL"
                name="image"
                value={pet.image}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={pet.description}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                type="number"
                label="Price"
                name="price"
                onChange={handleChange}
        
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {isEditing ? 'Update Pet' : 'Add Pet'}
            </Button>
        </Box>
    );
};