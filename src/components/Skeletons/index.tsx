import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const Skeletons = (props: { loading: boolean }) => {
  const { loading } = props;

  return (
    <Grid container spacing={2} mt={2}>
      {(loading ? Array.from(new Array(12)) : []).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.4}>
          <Box>
            <Skeleton variant="rectangular" width="100%" height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}