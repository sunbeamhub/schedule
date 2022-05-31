import Box from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { useSchedule, useWorkStatusChip } from 'schedule/hooks';

function getDaysInCurrentMonth() {
  const date = new Date();

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const dayColumns = Array.from(
  { length: getDaysInCurrentMonth() },
  (_, i) => i + 1
);
const weekColumns = Array.from({ length: getDaysInCurrentMonth() }, (_, i) =>
  new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).getDay()
);

const RefChip = React.forwardRef<HTMLDivElement, ChipProps>(function (
  props,
  ref
) {
  return <Chip {...props} ref={ref}></Chip>;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ScheduleTableView() {
  const nodeRef = React.useRef(null);
  const { scheduleTableViewList } = useSchedule();
  const { t } = useTranslation('schedule');
  const { workStatusColorMap, workStatusIconMap } = useWorkStatusChip();

  return (
    <TableContainer>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
              {t('week.week')}
            </StyledTableCell>
            {weekColumns.map((col, index) => (
              <StyledTableCell align="center" key={index}>
                {t(`week.${col}`)}
              </StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
              {t(`month.${new Date().getMonth() + 1}`)}
            </StyledTableCell>
            {dayColumns.map((col) => (
              <StyledTableCell align="center" key={col}>
                {col}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduleTableViewList.map((row, rowIndex) => (
            <StyledTableRow key={row.number}>
              <StyledTableCell>{row['0']}</StyledTableCell>
              {dayColumns.map((col, colIndex) => (
                <StyledTableCell align="center" key={col}>
                  {row[col] ? (
                    <Draggable
                      bounds={{
                        top: -57 * rowIndex,
                        right: 92.3 * (dayColumns.length - colIndex - 1),
                        bottom:
                          57 * (scheduleTableViewList.length - rowIndex - 1),
                        left: -92.3 * colIndex,
                      }}
                      grid={[92.3, 57]}
                      nodeRef={nodeRef}
                    >
                      <RefChip
                        color={workStatusColorMap[row[col]]}
                        icon={workStatusIconMap[row[col]]}
                        label={t(`workStatus.${row[col]}`)}
                        ref={nodeRef}
                        size="small"
                        variant="outlined"
                      />
                    </Draggable>
                  ) : (
                    <Box sx={{ height: 24, width: 60.3 }}></Box>
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScheduleTableView;
