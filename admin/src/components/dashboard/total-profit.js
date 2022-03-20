import React, { useContext } from 'react'
import { ReportContext } from '../../contexts/reportContext';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TotalProfit = (props) => {
  const {
    reportState: { incomeReport }
  } = useContext(ReportContext)

  // const format = num => 
  // String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.')

  let formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <Card {...props}>
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
                TOTAL PROFIT
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {formatter.format(incomeReport.both.bothTotalIncome)} VND
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: 56,
                  width: 56
                }}
              >
                <AttachMoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  )
};
