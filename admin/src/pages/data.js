import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { apiUrl } from 'src/reducers/constants';

const Data = () => {

  const startFaceRecognitionTraining = async() => {
    const response = await axios.get(`${apiUrl}/trainingFaceRecognition/`)
    if(response.success) {
      
    }
  }

  const startProductRecommendationTraining = async() => {
    const response = await axios.get(`${apiUrl}/trainingProductRecommendation/`)
    console.log(response.data)
    if(response.success) {

    }
  }

  return (
    <div style={{marginLeft: '100px'}}>
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
            Data management
          </Typography>
          <Box sx={{ pt: 3 }}>
            <div style={{ width: '600px'} }>
              <Button style={{width: '400px'}} onClick={() => startFaceRecognitionTraining()} >Start training face recognition</Button>
            </div>
            <div style={{height: '50px'}}></div>
            <div>
              <Button style={{width: '400px'}} onClick={() => startProductRecommendationTraining()} >Start training product recommendation</Button>
            </div>
          </Box>
        </Container>
      </Box>
    </div>
  )
};

Data.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Data;
