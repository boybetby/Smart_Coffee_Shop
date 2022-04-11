import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CouponListResults } from '../components/coupon/coupon-list-results';
import { CouponListToolbar } from '../components/coupon/coupon-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useContext, useEffect, useState } from 'react'
import { ReportContext } from '../contexts/reportContext';
import Spinner from 'react-bootstrap/Spinner'

const Coupons = () => {

    const {
        reportState: { couponsReport, couponsReportLoading },
        getCouponsReport
    } = useContext(ReportContext)
      

    let body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info'/>
      </div>
    )

    if(!couponsReportLoading) {
      body = (
        <>
          <Head>
            <title>
              Coupons | Coffee Admin
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
              <CouponListToolbar />
              <Box sx={{ mt: 3 }}>
                <CouponListResults coupons={couponsReport} />
              </Box>
            </Container>
          </Box>
        </>
      )
    }
    
    useEffect(() => {
      getCouponsReport()
    }, [])

    return (
      <>
        
      
        {body}
      </>
    );
}

Coupons.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Coupons;
