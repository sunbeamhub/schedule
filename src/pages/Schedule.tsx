import { OperationMenus } from 'schedule/components/OperationMenus';
import { ScheduleTableView } from 'schedule/components/ScheduleTableView';

function Schedule() {
  return (
    <>
      <ScheduleTableView />
      <OperationMenus />
    </>
  );
}

export default Schedule;
