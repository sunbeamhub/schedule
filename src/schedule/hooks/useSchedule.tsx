import { useDoctor } from 'employee/hooks';
import { ScheduleTableViewProps } from 'schedule/interface/ScheduleProps';
import { autoDoctorSchedule } from 'schedule/logic';

function useSchedule() {
  const { doctorList } = useDoctor();
  const { scheduleList } = autoDoctorSchedule({ doctorList });

  const scheduleTableViewList = Object.values(
    scheduleList.reduce(
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

  return { scheduleTableViewList };
}

export default useSchedule;
