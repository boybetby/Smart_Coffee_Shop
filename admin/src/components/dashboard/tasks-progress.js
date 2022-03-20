import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import React, { useContext } from 'react'
import { ReportContext } from '../../contexts/reportContext';

export const TasksProgress = (props) => {
  const {
    reportState: { incomeReport }
  } = useContext(ReportContext)

  return(
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              RETURNING RATE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {incomeReport.customers.returningRate}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={incomeReport.customers.returningRate}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
)};
