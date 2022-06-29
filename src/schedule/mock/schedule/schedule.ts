import { delay } from 'common/utils';
import { IDoctor } from 'employee/interface';
import { autoDoctorSchedule } from 'schedule/logic';

export async function readScheduleList(doctorList: IDoctor[]) {
  await delay();

  const { scheduleList } = autoDoctorSchedule({ doctorList });

  return scheduleList;
}
