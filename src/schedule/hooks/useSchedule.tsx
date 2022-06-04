import { ScheduleProps } from 'schedule/interface';
import { ScheduleTableViewProps } from 'schedule/interface/ScheduleProps';

function useSchedule() {
  const scheduleList: ScheduleProps[] = [
    {
      date: new Date('2022-06-01'),
      id: '0',
      name: 'A',
      number: '001',
      workStatus: 'day-off',
    },
    {
      date: new Date('2022-06-01'),
      id: '1',
      name: 'B',
      number: '002',
      workStatus: 'dayshift',
    },
    {
      date: new Date('2022-06-01'),
      id: '2',
      name: 'C',
      number: '003',
      workStatus: 'halfDay-off',
    },
    {
      date: new Date('2022-06-01'),
      id: '3',
      name: 'D',
      number: '004',
      workStatus: 'halfDay-off',
    },
    {
      date: new Date('2022-06-01'),
      id: '4',
      name: 'E',
      number: '005',
      workStatus: 'nightshift',
    },
    {
      date: new Date('2022-06-01'),
      id: '5',
      name: 'F',
      number: '006',
      workStatus: 'outpatientClinic',
    },
  ];

  const scheduleTableViewList = Object.values(
    scheduleList.reduce(
      (
        previousValue: { [key: string]: Partial<ScheduleTableViewProps> },
        currentValue
      ) => {
        let merged: Partial<ScheduleTableViewProps> = {
          ...(previousValue[currentValue.number] || {}),
          0: currentValue.name,
          [currentValue.date.getUTCDate()]: currentValue.workStatus,
          number: currentValue.number,
        };

        merged = Object.keys(merged)
          .sort()
          .reduce(
            (previous, current) => ({
              ...previous,
              [current]: merged[current],
            }),
            {}
          );

        return {
          ...previousValue,
          [currentValue.number]: merged,
        };
      },
      {}
    )
  );

  return { scheduleTableViewList };
}

export default useSchedule;
