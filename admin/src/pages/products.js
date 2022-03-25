import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useContext, useState, useCallback } from 'react';
import { ReportContext } from '../contexts/reportContext';
import { Spinner } from 'react-bootstrap'
import ProductModal from 'src/components/product/ProductModal';

const Products = () => {
  const {
    reportState: { searchProducts, productsReportLoading },
  } = useContext(ReportContext)

  const [modalShow, setModalShow] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState();

  const handleClick = useCallback((product) => {
    setUpdatedProduct(product)
    setModalShow(true)
  }, [updatedProduct])

  let body = (
    <div className='traffic-spinner'>
				<Spinner animation='border' variant='info'/>
    </div>
  )
  if(!productsReportLoading && searchProducts) {
    body = (
      <>
        <Head>
          <title>
            Products | Coffee Admin
          </title>
        </Head>

        {updatedProduct ? (<ProductModal 
          show={modalShow}
          onHide={() => setModalShow(false)}
          product={updatedProduct}
        />) : (<div></div>)}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <ProductListToolbar />
            <Box sx={{ pt: 3}}>
              <Grid
                container
                spacing={3}
              >
                {searchProducts.map((product) => (
                  <Grid
                    item
                    key={product._id}
                    width='280px'
                  >
                    <ProductCard product={product} handleClick={handleClick}/>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 3
              }}
            >
              <Pagination
                color="primary"
                count={3}
                size="small"
              />
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

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
