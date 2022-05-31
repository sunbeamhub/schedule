import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
              <StyledTableCell key={index}>{t(`week.${col}`)}</StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
              {t(`month.${new Date().getMonth() + 1}`)}
            </StyledTableCell>
            {dayColumns.map((col) => (
              <StyledTableCell key={col}>{col}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduleTableViewList.map((row) => (
            <StyledTableRow key={row.number}>
              <StyledTableCell>{row['0']}</StyledTableCell>
              {dayColumns.map((col) => (
                <StyledTableCell key={col}>
                  {row[col] ? (
                    <Chip
                      color={workStatusColorMap[row[col]]}
                      icon={workStatusIconMap[row[col]]}
                      label={t(`workStatus.${row[col]}`)}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    <></>
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
