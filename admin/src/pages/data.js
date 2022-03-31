import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsPassword } from '../components/settings/settings-password';

const Data = () => (
  <>
    <Head>
      <title>
        Data | Coffee Admin
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Customer's data management
        </Typography>
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

Data.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Data;
