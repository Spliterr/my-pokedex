import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';

interface PokemonType {
  type: {
    name: string;
  };
}

const typeColors: { [key: string]: string } = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0'
};

export default function PokemonCard({ name, url, types }: { name: string, url: string, types: PokemonType[] }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          width="200"
          image={url}
          alt={name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: "capitalize" }}>
            {name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            component="div"
          >
            {types.map(({ type }) => (
              <Chip 
                label={type.name} 
                key={type.name}
                sx={{
                  backgroundColor: typeColors[type.name] || '#777777',
                  color: '#fff',
                  margin: '0 4px',
                  textTransform: 'capitalize'
                }}
              />
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}