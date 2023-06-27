import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectWeekly } from '../store/Slice';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

function WeeklyScansWidget() {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [selectedDate, setSelectedDate] = useState()
  const [tabValue, setTabValue] = useState(0);
  const weekly = useSelector(selectWeekly);
  const { overview, series, ranges, labels } = weekly?.githubIssues;
  const currentRange = Object.keys(ranges)[tabValue];

  const chartOptions = {
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    labels,
    dataLabels: {
      enabled: true,
      enabledOnSeries: [0],
      background: {
        borderWidth: 0,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.75,
        },
      },
    },
    stroke: {
      width: [3, 0],
    },
    tooltip: {
      followCursor: true,
      theme: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        // color: theme.palette.divider,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: -16,
        style: {
          // colors: theme.palette.text.secondary,
        },
      },
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Weekly Scans (all BUs)
        </Typography>
        <DateTimePicker
          className='w-full md:w-auto'
          openTo="day"
          size="small"
          format="yyyy/MM/dd"
          inputFormat="yyyy/MM/dd"
          value={selectedDate}
          onChange={setSelectedDate}
          slotProps={{
            textField: {
              helperText: 'yyyy/MM/dd',
              format: "yyyy/MM/dd"
            },
          }}
          renderInput={(_props) =>
            (<TextField size="small" label="End" {..._props} />)
          }
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
        <div className="flex flex-col flex-auto">
          <div className="flex flex-col flex-auto">
            <ReactApexChart
              className="flex-auto w-full"
              options={chartOptions}
              series={series[currentRange]}
              height={320}
            />
          </div>
        </div>
        <div className="flex flex-col">

          <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {overview[currentRange]['new-issues']}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">New Vendors</Typography>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {overview[currentRange]['closed-issues']}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">New Page Sections</Typography>
            </div>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {overview[currentRange].fixed}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Fixed</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {overview[currentRange]['wont-fix']}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Won't Fix</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {overview[currentRange]['re-opened']}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Re-opened</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                {overview[currentRange]['needs-triage']}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Needs Triage</Typography>
            </Box>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(WeeklyScansWidget);
