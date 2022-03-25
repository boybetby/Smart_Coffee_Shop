import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { useContext, useState } from 'react';
import { ReportContext } from '../../contexts/reportContext';
import CreateProductModal from './CreateProductModal'

export const ProductListToolbar = (props) => {
  const {
    searchProducts
  } = useContext(ReportContext)

  const [ modalShow, setModalShow ] = useState(false)

  const handleChange  = (e) => {
    searchProducts(e.target.value)
  }

  const handleClick = () => {
    setModalShow(true)
  }

  return (
    <Box {...props}>
      <CreateProductModal 
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
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Add products
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search product"
                variant="outlined"
                onChange={e => handleChange(e)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
};
