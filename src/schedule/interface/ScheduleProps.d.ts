export interface ScheduleProps {
  date: Date;
  id: string;
  name: string;
  number: string;
  workStatus:
    | 'day-off'
    | 'dayshift'
    | 'halfDay-off'
    | 'leave'
    | 'nightshift'
    | 'outpatientClinic';
}

export interface ScheduleTableViewProps {
  0: ScheduleProps.name;
  [key: string]: ScheduleProps.workStatus;
  number: ScheduleProps.number;
}
