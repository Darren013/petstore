import Grid from '@mui/material/Grid';
import { Pet } from '../types/Pet';
import { PetCard } from './PetCard';

interface PetListProps {
  pets: Pet[];
  onDelete?: (id: number) => void;
}

export const PetList = ({ pets, onDelete }: PetListProps) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: 1,
        justifyContent: 'center',
      }}
    >
      {pets.map((pet) => (
        <Grid
        
          item
          key={pet.id}
          xs={11}
          sm={5}
          md={4}
          lg={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '100%',
          }}
        >
          <PetCard pet={pet} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};