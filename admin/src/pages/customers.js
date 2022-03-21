import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useContext } from 'react'
import { ReportContext } from '../contexts/reportContext';
import Spinner from 'react-bootstrap/Spinner'

const Customers = () => {
  const {
    reportState: { customersReport, customersReportLoading },
  } = useContext(ReportContext)
  
  let body = (
    <div className='spinner-container'>
				<Spinner animation='border' variant='info'/>
    </div>
  )

  if(!customersReportLoading) {
    body = (
      <>
        <Head>
          <title>
            Customers | Coffee Admin
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
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={customersReport} />
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
