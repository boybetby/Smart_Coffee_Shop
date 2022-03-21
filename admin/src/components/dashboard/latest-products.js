import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { ReportContext } from '../../contexts/reportContext';
import { apiUrl } from 'src/reducers/constants';

export const LatestProducts = (props) =>{ 
  const {
    reportState: { productsReport }
  } = useContext(ReportContext)

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${productsReport.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {productsReport.slice(0, 5).map((product, i) => (
          <ListItem
            divider={i < productsReport.length - 1}
            key={product._id}
          >
            <ListItemAvatar>
              <img
                alt={product.drinkName}
                src={`${apiUrl}${product.drinkImage}`}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.drinkName}
              secondary={`${product.defaultPrice[0]} VND`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  )
};
