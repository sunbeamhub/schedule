import Box from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer, {
  TableContainerProps,
} from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { forwardRef, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { useSchedule, useWorkStatusChip } from 'schedule/hooks';

function getDaysInCurrentMonth() {
  const date = new Date();

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const GRID_UNIT = { height: 57, width: 92.3 };

const dayColumns = Array.from(
  { length: getDaysInCurrentMonth() },
  (_, i) => i + 1
);

const weekColumns = Array.from({ length: getDaysInCurrentMonth() }, (_, i) =>
  new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).getDay()
);

const RefChip = forwardRef<HTMLDivElement, ChipProps>(function (props, ref) {
  return <Chip {...props} ref={ref}></Chip>;
});

const RefTableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function (props, ref) {
    return <TableContainer {...props} ref={ref}></TableContainer>;
  }
);

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  'td:first-of-type, th:first-of-type': {
    left: 0,
    position: 'sticky',
    whiteSpace: 'nowrap',
    zIndex: 3,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td': {
    border: 0,
  },
}));

const TodayTableCell = styled(TableCell)(({ theme }) => ({
  '&': {
    color: theme.palette.primary.main,
    position: 'relative',
  },
  '&::after': {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
    content: '""',
    display: 'block',
    height: GRID_UNIT.height * 0.618,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: GRID_UNIT.height * 0.618,
  },
}));

function ScheduleTableView() {
  const draggableNodeRef = useRef<HTMLDivElement>(null);
  const tableContainerNodeRef = useRef<HTMLDivElement>(null);
  const { scheduleTableViewList } = useSchedule();
  const { t } = useTranslation('schedule');
  const { workStatusColorMap, workStatusIconMap } = useWorkStatusChip();

  useEffect(() => {
    if (tableContainerNodeRef.current) {
      tableContainerNodeRef.current.scrollTo({
        behavior: 'smooth',
        left: GRID_UNIT.width * (new Date().getDate() - 1),
      });
    }
  }, []);

  return (
    <RefTableContainer ref={tableContainerNodeRef}>
      <Table stickyHeader={true}>
        <TableHead>
          <StyledTableRow>
            <TableCell>{t('week.week')}</TableCell>
            {weekColumns.map((col, index) => (
              <TableCell align="center" key={index}>
                {t(`week.${col}`)}
              </TableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>{t(`month.${new Date().getMonth() + 1}`)}</TableCell>
            {dayColumns.map((col) =>
              col === new Date().getDate() ? (
                <TodayTableCell align="center" key={col}>
                  {col}
                </TodayTableCell>
              ) : (
                <TableCell align="center" key={col}>
                  {col}
                </TableCell>
              )
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {scheduleTableViewList.map((row, rowIndex) => (
            <StyledTableRow key={row.number}>
              <TableCell>{row['0']}</TableCell>
              {dayColumns.map((col, colIndex) => (
                <TableCell align="center" key={col}>
                  {row[col] ? (
                    <Draggable
                      bounds={{
                        top: -GRID_UNIT.height * rowIndex,
                        right:
                          GRID_UNIT.width * (dayColumns.length - colIndex - 1),
                        bottom:
                          GRID_UNIT.height *
                          (scheduleTableViewList.length - rowIndex - 1),
                        left: -GRID_UNIT.width * colIndex,
                      }}
                      grid={[GRID_UNIT.width, GRID_UNIT.height]}
                      nodeRef={draggableNodeRef}
                    >
                      <RefChip
                        color={workStatusColorMap[row[col]]}
                        icon={workStatusIconMap[row[col]]}
                        label={t(`workStatus.${row[col]}`)}
                        ref={draggableNodeRef}
                        size="small"
                        variant="outlined"
                      />
                    </Draggable>
                  ) : (
                    <Box sx={{ height: 24, width: 60.3 }}></Box>
                  )}
                </TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </RefTableContainer>
  );
}

export default ScheduleTableView;
