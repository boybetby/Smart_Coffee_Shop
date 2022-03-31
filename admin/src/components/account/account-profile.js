import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

export const AccountProfile = (props) => {
  const {
    authState: { user },
  } = useContext(AuthContext)

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
        
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`Username: ${user.username}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`ROLE: ${user.role}`}
          </Typography>
        
        </Box>
      </CardContent>
      <Divider />
     
    </Card>
  )
}
