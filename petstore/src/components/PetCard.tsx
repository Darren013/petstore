import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Pet } from '../types/Pet';
import { Link } from 'react-router-dom';
import { Height } from '@mui/icons-material';

interface PetCardProps {
    pet: Pet;
    onDelete?: (id: number) => void;
}

export const PetCard = ({ pet, onDelete }: PetCardProps) => {
    return (
        <Card sx={{ width: 300, m: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={pet.image || 'https://via.placeholder.com/300'}
                alt={pet.name}
                sx={{
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    // Optional: set a minimum height if needed
                    minHeight: 140,
                    // Optional: add a fallback background color
                    backgroundColor: '#f5f5f5'
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pet.species} • {pet.breed} • {pet.gender}
                </Typography>
                <Typography variant="body1" mt={1}>
                    ${pet.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" mt={1}>
                    {pet.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/pets/${pet.id}`}>
                    View Details
                </Button>
                <Button size="small" component={Link} to={`/edit/${pet.id}`}>
                    Edit
                </Button>
                {onDelete && (
                    <Button size="small" color="error" onClick={() => onDelete(pet.id!)}>
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};