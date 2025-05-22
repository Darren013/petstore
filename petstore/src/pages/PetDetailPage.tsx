import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPetById } from '../services/petService';
import { Pet } from '../types/Pet';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';

export const PetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await getPetById(Number(id));
                setPet(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pet:', error);
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (!pet) return <Typography>Pet not found</Typography>;

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
                Back to All Pets
            </Button>
            <Card>
                <CardMedia
                    component="img"
                    height="400"
                    image={pet.image || 'https://via.placeholder.com/400'}
                    alt={pet.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {pet.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {pet.species} • {pet.breed} • {pet.gender}
                    </Typography>
                    <Typography variant="h5" mt={2} color="primary">
                        ${pet.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" mt={2}>
                        {pet.description}
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Button
                            component={Link}
                            to={`/edit/${pet.id}`}
                            variant="contained"
                            color="primary"
                            sx={{ mr: 2 }}
                        >
                            Edit
                        </Button>
                        <Button
                            component={Link}
                            to="/"
                            variant="outlined"
                        >
                            Back to List
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};