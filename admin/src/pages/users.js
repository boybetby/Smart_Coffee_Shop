import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/user-list-results';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useContext } from 'react'
import { ReportContext } from '../contexts/reportContext';
import Spinner from 'react-bootstrap/Spinner'

const Customers = () => {
  const {
    reportState: { usersReport, usersReportLoading },
  } = useContext(ReportContext)
  
  let body = (
    <div className='spinner-container'>
				<Spinner animation='border' variant='info'/>
    </div>
  )

  if(!usersReportLoading) {
    body = (
      <>
        <Head>
          <title>
            Users | Coffee Admin
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <UserListToolbar />
            <Box sx={{ mt: 3 }}>
              <UserListResults users={usersReport} />
            </Box>
          </Container>
        </Box>
      </>
    )
  }

  return (
    <>
      {body}
    </>
  );
}
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
