import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { useState } from 'react'
import CreateCouponModal from '../coupon/CreateCouponModal';

export const CouponListToolbar = (props) => {
  const [ modalShow, setModalShow ] = useState(false)

  const handleClick = () => {
    setModalShow(true)
  }
  return (
    <Box {...props}>
      <CreateCouponModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Coupons
        </Typography>
        <Box sx={{ m: 1 }}>
      
          <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Add Coupon
          </Button>
        </Box>
      </Box>
      
    </Box>
)};
