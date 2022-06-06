import { IDoctor } from 'employee/interface';
import { ScheduleProps } from 'schedule/interface';
import { v4 as uuidv4 } from 'uuid';

const now = new Date();
const thisMonth = now.getMonth();
const thisYear = now.getFullYear();
const firstDay = new Date(thisYear, thisMonth, 1);
const lastDay = new Date(thisYear, thisMonth + 1, 0);

function autoDoctorSchedule({
  doctorList = [],
  endDay = lastDay,
  lastScheduleList = [],
  startDay = firstDay,
}: {
  doctorList: IDoctor[];
  endDay?: Date;
  lastScheduleList?: ScheduleProps[];
  startDay?: Date;
}) {
  const scheduleList: ScheduleProps[] = [];

  if (lastScheduleList.length) {
    lastScheduleList.sort(
      (prev, next) => next.date.getTime() - prev.date.getTime()
    );
  }

  for (
    let current = new Date(startDay);
    current <= endDay;
    current.setDate(current.getDate() + 1)
  ) {
    const allScheduleList = scheduleList.concat(lastScheduleList);
    const oneDayDoctorList = doctorList.slice();

    // nightshift
    const nightshiftDoctorList = oneDayDoctorList
      .filter((doctor) => doctor.onDuty.includes('nightshift'))
      .filter((doctor) => {
        const yesterday = new Date(current);
        yesterday.setDate(yesterday.getDate() - 1);

        const outpatientClinicDoctor = allScheduleList.find(
          (schedule) =>
            [0, 6].includes(schedule.date.getDay()) &&
            schedule.date.toDateString() === yesterday.toDateString() &&
            schedule.workStatus === 'outpatientClinic'
        );
        return (
          !outpatientClinicDoctor ||
          outpatientClinicDoctor.number !== doctor.number
        );
      })
      .filter((doctor) => {
        const theDayBeforeYesterday = new Date(current);
        theDayBeforeYesterday.setDate(theDayBeforeYesterday.getDate() - 2);

        const outpatientClinicDoctor = allScheduleList.find(
          (schedule) =>
            schedule.date.getDay() === 6 &&
            schedule.date.toDateString() ===
              theDayBeforeYesterday.toDateString() &&
            schedule.workStatus === 'outpatientClinic'
        );
        return (
          !outpatientClinicDoctor ||
          outpatientClinicDoctor.number !== doctor.number
        );
      })
      .sort((prevDoctor, nextDoctor) => {
        const prevScheduleDate =
          allScheduleList
            .find(
              (schedule) =>
                schedule.workStatus === 'nightshift' &&
                schedule.number === prevDoctor.number
            )
            ?.date.getTime() || 0;
        const nextScheduleDate =
          allScheduleList
            .find(
              (schedule) =>
                schedule.workStatus === 'nightshift' &&
                schedule.number === nextDoctor.number
            )
            ?.date.getTime() || 0;
        return prevScheduleDate - nextScheduleDate;
      });
    scheduleList.unshift({
      date: new Date(current),
      id: uuidv4(),
      name: nightshiftDoctorList[0].name,
      number: nightshiftDoctorList[0].number,
      workStatus: 'nightshift',
    });

    const nightshiftDoctorIndex = oneDayDoctorList.findIndex(
      (doctor) => doctor.number === nightshiftDoctorList[0].number
    );
    oneDayDoctorList.splice(nightshiftDoctorIndex, 1);

    // outpatient clinic
    const outpatientClinicDoctorList = oneDayDoctorList
      .filter((doctor) => doctor.onDuty.includes('outpatientClinic'))
      .filter((doctor) => {
        const yesterday = new Date(current);
        yesterday.setDate(yesterday.getDate() - 1);

        const nightshiftDoctor = allScheduleList.find(
          (schedule) =>
            schedule.date.toDateString() === yesterday.toDateString() &&
            schedule.workStatus === 'nightshift'
        );
        return !nightshiftDoctor || nightshiftDoctor.number !== doctor.number;
      })
      .filter((doctor) => {
        const theDayBeforeYesterday = new Date(current);
        theDayBeforeYesterday.setDate(theDayBeforeYesterday.getDate() - 2);

        const nightshiftDoctor = allScheduleList.find(
          (schedule) =>
            schedule.date.getDay() === 6 &&
            schedule.date.toDateString() ===
              theDayBeforeYesterday.toDateString() &&
            schedule.workStatus === 'nightshift'
        );
        return !nightshiftDoctor || nightshiftDoctor.number !== doctor.number;
      })
      .sort((prevDoctor, nextDoctor) => {
        const prevScheduleDate =
          allScheduleList
            .find(
              (schedule) =>
                schedule.workStatus === 'outpatientClinic' &&
                schedule.number === prevDoctor.number
            )
            ?.date.getTime() || 0;
        const nextScheduleDate =
          allScheduleList
            .find(
              (schedule) =>
                schedule.workStatus === 'outpatientClinic' &&
                schedule.number === nextDoctor.number
            )
            ?.date.getTime() || 0;
        return prevScheduleDate - nextScheduleDate;
      });
    scheduleList.unshift({
      date: new Date(current),
      id: uuidv4(),
      name: outpatientClinicDoctorList[0].name,
      number: outpatientClinicDoctorList[0].number,
      workStatus: 'outpatientClinic',
    });

    const outpatientClinicDoctorIndex = oneDayDoctorList.findIndex(
      (doctor) => doctor.number === outpatientClinicDoctorList[0].number
    );
    oneDayDoctorList.splice(outpatientClinicDoctorIndex, 1);

    // day-off

    // half day-off
  }

  scheduleList.sort(
    (prevSchedule, nextSchedule) =>
      doctorList.findIndex((doctor) => doctor.number === prevSchedule.number) -
      doctorList.findIndex((doctor) => doctor.number === nextSchedule.number)
  );

  return { scheduleList };
}

export default autoDoctorSchedule;
