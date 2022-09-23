import { useDoctor } from 'employee/hooks';
import {
  ScheduleProps,
  ScheduleTableViewProps,
} from 'schedule/interface/ScheduleProps';
import useSWR from 'swr';

function useSchedule() {
  const { doctorList } = useDoctor();
  const { data = [] } = useSWR<ScheduleProps[]>([
    '/api/schedule/list',
    doctorList,
  ]);

  const scheduleTableViewList = Object.values(
    data.reduce(
      (
        previousValue: { [key: string]: Partial<ScheduleTableViewProps> },
        currentValue
      ) => {
        let merged: Partial<ScheduleTableViewProps> = {
          ...(previousValue[currentValue.number] || {}),
          0: currentValue.name,
          [currentValue.date.getDate()]: currentValue.workStatus,
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

  return { scheduleList: data, scheduleTableViewList };
}

export default useSchedule;
