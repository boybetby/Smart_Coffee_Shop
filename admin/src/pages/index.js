import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useContext } from 'react'
import { ReportContext } from '../contexts/reportContext';
import Spinner from 'react-bootstrap/Spinner'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () =>{ 
  const {
    reportState: { reportLoading, reportbyFilterLoading },
  } = useContext(ReportContext)
  
  let body = (
    <div className='spinner-container'>
				<Spinner animation='border' variant='info'/>
    </div>
  )

  if(!reportLoading) {
    body = (
      <>
        <Head>
          <title>
            Dashboard | Material Kit
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
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                item
                
              >
                <TotalCustomers />
              </Grid>
              <Grid
                item
                
              >
                <TasksProgress />
              </Grid>
              <Grid
                item
              
              >
                <TotalProfit sx={{ height: '100%' }} />
              </Grid>
              <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                <Sales />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <TrafficByDevice sx={{ height: '100%' }} />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <LatestProducts sx={{ height: '100%' }} />
              </Grid>
              <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                <LatestOrders />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    )
  }

  return (
    <div>
      {body}
    </div>
  )
};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
