import { useState, useContext } from 'react';
import { ReportContext } from '../../contexts/reportContext';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Dropdown, FormControl, InputGroup, DropdownButton  } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'

export const Sales = (props) => {
  const {
    reportState: { incomeReportByFilter, reportbyFilterLoading },
    getIncomeReportByFilter
  } = useContext(ReportContext)

  const [buttonState, setButtonState] = useState('Last 7 days');
  const [value, setValue] = useState();
  const theme = useTheme();

  const handleChangeType = async(e) => {
    const req = {
      number: value,
      type: e
    }
    setButtonState(`Last ${value} ${e.toLowerCase()}s`)
    await getIncomeReportByFilter(req.number, req.type)
  }

  const handleChangeValue = (e) => {
    if(e>31) {
      setValue(31)
    } else {
      setValue(e)
    } 
  }

  const handleClick = async(e) => {
    let req = {}
    switch(e) {
      case '1':
        setButtonState('Last 7 days')
        req = {
          number: 7,
          type: 'DAY'
        }
        break;
      case '2':
        setButtonState('Last 30 days')
        req = {
          number: 30,
          type: 'DAY'
        }
        break;
      case '3':
        setButtonState('Last 7 months')
        req = {
          number: 7,
          type: 'MONTH'
        }
        break;
      case '4':
        setButtonState('Last 12 months')
        req = {
          number: 12,
          type: 'MONTH'
        }
        break;
    }
    await getIncomeReportByFilter(req.number, req.type)
  }

  let body = (
    <div className='traffic-spinner'>
				<Spinner animation='border' variant='info'/>
    </div>
  )

  if(!reportbyFilterLoading) {
    const data = {
      datasets: [
        {
          backgroundColor: 'lightgreen',
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: incomeReportByFilter.online,
          label: 'Online',
          maxBarThickness: 10
        },
        {
          backgroundColor: 'gray',
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: incomeReportByFilter.offline,
          label: 'Offline',
          maxBarThickness: 10
        }
      ],
      labels: incomeReportByFilter.labels
    };
  
    const options = {
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ],
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary
      }
    };

    body = (
      <>
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Bar
              data={data}
              options={options}
            />
          </Box>
        </CardContent>
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
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
          >
            Overview
          </Button>
        </Box>
      </>
    )
  }

 

  return (
    <>
      <Card {...props}>
        <CardHeader
          action={(
            <Dropdown onSelect={(e) => handleClick(e)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: '200px'}}>
                {buttonState}
              </Dropdown.Toggle>

              <Dropdown.Menu  style={{width: '200px'}}>
                <Dropdown.Item eventKey="1">Last 7 days</Dropdown.Item>
                <Dropdown.Item eventKey="2">Last 30 days</Dropdown.Item>
                <Dropdown.Item eventKey="3">Last 7 months</Dropdown.Item>
                <Dropdown.Item eventKey="4">Last 12 months</Dropdown.Item>
                <Dropdown.Divider />
                  <Dropdown.Item eventKey="5" onClick={(e) => { e.stopPropagation(); }}> 
                    <InputGroup className="mb-2" >
                      <FormControl aria-label="Text input with dropdown button" value={value} onChange={(e) => handleChangeValue(e.target.value)}/>
                      <DropdownButton
                        variant="outline-secondary"
                        title='TYPE'
                        id="input-group-dropdown-2"
                        align="end"
                        onSelect={e => {
                          handleChangeType(e)
                        }}
                      >
                        <Dropdown.Item eventKey="DAY">DAY</Dropdown.Item>
                        <Dropdown.Item eventKey="MONTH">MONTH</Dropdown.Item>
                      </DropdownButton>
                    </InputGroup>
                  </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          
          title="Latest Sales"
        />
        {body}
      </Card>
    </>
  );
};
