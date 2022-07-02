import { IDoctor } from 'employee/interface';
import { ScheduleProps } from 'schedule/interface';
import { v1 as uuidv1 } from 'uuid';

const now = new Date();
const thisMonth = now.getMonth();
const thisYear = now.getFullYear();
const firstDay = new Date(thisYear, thisMonth, 1);
const lastDay = new Date(thisYear, thisMonth + 1, 0);

const v1options = {
  clockseq: 0x1234,
  msecs: now.getTime(),
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  nsecs: 5678,
};

function _autoDoctorSchedule({
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
  const byeNightshiftDoctorMap: { [key: IDoctor['number']]: [Date, Date] } = {};
  const byeOutpatientClinicDoctorMap: {
    [key: IDoctor['number']]: [Date, Date];
  } = {};

  if (!doctorList.length) {
    return { scheduleList };
  }

  if (lastScheduleList.length) {
    lastScheduleList.sort(
      (prev, next) => next.date.getTime() - prev.date.getTime()
    );
  }

  if (lastScheduleList.length && doctorList.length % 7 === 0) {
    lastScheduleList.forEach((schedule) => {
      if (
        schedule.date.getDay() !== 6 ||
        !['nightshift', 'outpatientClinic'].includes(schedule.workStatus)
      ) {
        return;
      }

      const byeStartDay = new Date(schedule.date);
      byeStartDay.setDate(byeStartDay.getDate() + 1);

      const byeEndDay = new Date(schedule.date);
      byeEndDay.setDate(byeEndDay.getDate() + 7 + doctorList.length - 1);

      if (schedule.workStatus === 'nightshift') {
        byeNightshiftDoctorMap[schedule.number] = [byeStartDay, byeEndDay];
      } else if (schedule.workStatus === 'outpatientClinic') {
        byeOutpatientClinicDoctorMap[schedule.number] = [
          byeStartDay,
          byeEndDay,
        ];
      }
    });
  }

  for (
    let current = new Date(startDay);
    current <= endDay;
    current.setDate(current.getDate() + 1)
  ) {
    const allScheduleList = scheduleList.concat(lastScheduleList);
    const oneDayDoctorList = doctorList.slice();

    // nightshift
    nightshiftSchedule({
      allScheduleList,
      byeNightshiftDoctorMap,
      current,
      oneDayDoctorList,
      scheduleList,
    });

    // outpatient clinic
    outpatientClinicSchedule({
      allScheduleList,
      byeOutpatientClinicDoctorMap,
      current,
      oneDayDoctorList,
      scheduleList,
    });

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
  if (lastScheduleList.length) {
    return _autoDoctorSchedule({
      doctorList,
      endDay,
      lastScheduleList,
      startDay,
    });
  } else {
    const { scheduleList: priorScheduleList } = _autoDoctorSchedule({
      doctorList,
      endDay: new Date(thisYear, thisMonth, 0),
      startDay: new Date(thisYear, thisMonth - 1, 1),
    });

    return _autoDoctorSchedule({
      doctorList,
      endDay,
      lastScheduleList: priorScheduleList,
      startDay,
    });
  }
}

function nightshiftSchedule({
  allScheduleList,
  byeNightshiftDoctorMap,
  current,
  oneDayDoctorList,
  scheduleList,
}: {
  allScheduleList: ScheduleProps[];
  byeNightshiftDoctorMap: { [key: IDoctor['number']]: [Date, Date] };
  current: Date;
  oneDayDoctorList: IDoctor[];
  scheduleList: ScheduleProps[];
}) {
  let ruleKeys = ['nightshiftRule1'];
  if (oneDayDoctorList.length >= 4 && oneDayDoctorList.length < 6) {
    ruleKeys = ruleKeys.concat(['nightshiftRule2']);
  } else if (oneDayDoctorList.length >= 6) {
    ruleKeys = ruleKeys.concat(['nightshiftRule2', 'nightshiftRule3']);
  }

  if (oneDayDoctorList.length % 7 === 0) {
    ruleKeys = ruleKeys.concat(['nightshiftRule4']);
  }

  const scheduleRules = readScheduleRules();
  const nightshiftDoctorList = oneDayDoctorList
    .filter((doctor) =>
      ruleKeys.every((ruleIndex) =>
        scheduleRules[ruleIndex].apply(null, [
          doctor,
          current,
          allScheduleList,
          byeNightshiftDoctorMap,
        ])
      )
    )
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
    id: uuidv1({ ...v1options, msecs: new Date(current).getTime() }),
    name: nightshiftDoctorList[0].name,
    number: nightshiftDoctorList[0].number,
    workStatus: 'nightshift',
  });

  if (oneDayDoctorList.length % 7 === 0 && current.getDay() === 6) {
    const byeStartDay = new Date(current);
    byeStartDay.setDate(byeStartDay.getDate() + 1);

    const byeEndDay = new Date(current);
    byeEndDay.setDate(byeEndDay.getDate() + 7 + oneDayDoctorList.length - 1);
    byeNightshiftDoctorMap[nightshiftDoctorList[0].number] = [
      byeStartDay,
      byeEndDay,
    ];
  }

  const nightshiftDoctorIndex = oneDayDoctorList.findIndex(
    (doctor) => doctor.number === nightshiftDoctorList[0].number
  );
  oneDayDoctorList.splice(nightshiftDoctorIndex, 1);
}

function outpatientClinicSchedule({
  allScheduleList,
  byeOutpatientClinicDoctorMap,
  current,
  oneDayDoctorList,
  scheduleList,
}: {
  allScheduleList: ScheduleProps[];
  byeOutpatientClinicDoctorMap: { [key: IDoctor['number']]: [Date, Date] };
  current: Date;
  oneDayDoctorList: IDoctor[];
  scheduleList: ScheduleProps[];
}) {
  let ruleKeys = ['outpatientClinicRule1'];
  if (oneDayDoctorList.length >= 3 && oneDayDoctorList.length < 5) {
    ruleKeys = ruleKeys.concat(['outpatientClinicRule2']);
  } else if (oneDayDoctorList.length >= 5) {
    ruleKeys = ruleKeys.concat([
      'outpatientClinicRule2',
      'outpatientClinicRule3',
    ]);
  }

  if ((oneDayDoctorList.length + 1) % 7 === 0) {
    ruleKeys = ruleKeys.concat(['outpatientClinicRule4']);
  }

  const scheduleRules = readScheduleRules();
  const outpatientClinicDoctorList = oneDayDoctorList
    .filter((doctor) =>
      ruleKeys.every((ruleIndex) =>
        scheduleRules[ruleIndex].apply(null, [
          doctor,
          current,
          allScheduleList,
          byeOutpatientClinicDoctorMap,
        ])
      )
    )
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
    id: uuidv1({ ...v1options, msecs: new Date(current).getTime() }),
    name: outpatientClinicDoctorList[0].name,
    number: outpatientClinicDoctorList[0].number,
    workStatus: 'outpatientClinic',
  });

  if ((oneDayDoctorList.length + 1) % 7 === 0 && current.getDay() === 6) {
    const byeStartDay = new Date(current);
    byeStartDay.setDate(byeStartDay.getDate() + 1);

    const byeEndDay = new Date(current);
    byeEndDay.setDate(byeEndDay.getDate() + 7 + oneDayDoctorList.length);
    byeOutpatientClinicDoctorMap[outpatientClinicDoctorList[0].number] = [
      byeStartDay,
      byeEndDay,
    ];
  }

  const outpatientClinicDoctorIndex = oneDayDoctorList.findIndex(
    (doctor) => doctor.number === outpatientClinicDoctorList[0].number
  );
  oneDayDoctorList.splice(outpatientClinicDoctorIndex, 1);
}

function readScheduleRules(): { [key: string]: Function } {
  // nightshift rules
  // nightshift onduty
  function nightshiftRule1(doctor: IDoctor) {
    return doctor.onDuty.includes('nightshift');
  }

  // yesterday outpatient clinic, no today nightshift
  function nightshiftRule2(
    doctor: IDoctor,
    current: Date,
    allScheduleList: ScheduleProps[]
  ) {
    const yesterday = new Date(current);
    yesterday.setDate(yesterday.getDate() - 1);

    const outpatientClinicDoctor = allScheduleList.find(
      (schedule) =>
        [0, 6].includes(schedule.date.getDay()) &&
        schedule.date.toDateString() === yesterday.toDateString() &&
        schedule.workStatus === 'outpatientClinic'
    );
    return (
      !outpatientClinicDoctor || outpatientClinicDoctor.number !== doctor.number
    );
  }

  // the day before yesterday saturday & outpatient clinic, no today nightshift
  function nightshiftRule3(
    doctor: IDoctor,
    current: Date,
    allScheduleList: ScheduleProps[]
  ) {
    const theDayBeforeYesterday = new Date(current);
    theDayBeforeYesterday.setDate(theDayBeforeYesterday.getDate() - 2);

    const outpatientClinicDoctor = allScheduleList.find(
      (schedule) =>
        schedule.date.getDay() === 6 &&
        schedule.date.toDateString() === theDayBeforeYesterday.toDateString() &&
        schedule.workStatus === 'outpatientClinic'
    );
    return (
      !outpatientClinicDoctor || outpatientClinicDoctor.number !== doctor.number
    );
  }

  // bye when seven doctors on duty
  function nightshiftRule4(
    doctor: IDoctor,
    current: Date,
    allScheduleList: ScheduleProps[],
    byeNightshiftDoctorMap: { [key: IDoctor['number']]: [Date, Date] }
  ) {
    const period = byeNightshiftDoctorMap[doctor.number];

    return (
      !period ||
      !(
        period[0].getTime() <= current.getTime() &&
        current.getTime() < period[1].getTime()
      )
    );
  }

  // outpatient clinic rules
  // outpatient clinic onduty
  function outpatientClinicRule1(doctor: IDoctor) {
    return doctor.onDuty.includes('outpatientClinic');
  }

  // yesterday nightshift, no today outpatient clinic
  function outpatientClinicRule2(
    doctor: IDoctor,
    current: Date,
    allScheduleList: ScheduleProps[]
  ) {
    const yesterday = new Date(current);
    yesterday.setDate(yesterday.getDate() - 1);

    const nightshiftDoctor = allScheduleList.find(
      (schedule) =>
        schedule.date.toDateString() === yesterday.toDateString() &&
        schedule.workStatus === 'nightshift'
    );
    return !nightshiftDoctor || nightshiftDoctor.number !== doctor.number;
  }

  // the day before yesterday saturday & nightshift, no today outpatient clinic
  function outpatientClinicRule3(
    doctor: IDoctor,
    current: Date,
    allScheduleList: ScheduleProps[]
  ) {
    const theDayBeforeYesterday = new Date(current);
    theDayBeforeYesterday.setDate(theDayBeforeYesterday.getDate() - 2);

    const nightshiftDoctor = allScheduleList.find(
      (schedule) =>
        schedule.date.getDay() === 6 &&
        schedule.date.toDateString() === theDayBeforeYesterday.toDateString() &&
        schedule.workStatus === 'nightshift'
    );
    return !nightshiftDoctor || nightshiftDoctor.number !== doctor.number;
  }

  // bye when seven doctors on duty
  function outpatientClinicRule4(
    doctor: IDoctor,
    current: Date,
    allScheduleList: ScheduleProps[],
    byeOutpatientClinicDoctorMap: { [key: IDoctor['number']]: [Date, Date] }
  ) {
    const period = byeOutpatientClinicDoctorMap[doctor.number];

    return (
      !period ||
      !(
        period[0].getTime() <= current.getTime() &&
        current.getTime() < period[1].getTime()
      )
    );
  }

  return {
    nightshiftRule1,
    nightshiftRule2,
    nightshiftRule3,
    nightshiftRule4,
    outpatientClinicRule1,
    outpatientClinicRule2,
    outpatientClinicRule3,
    outpatientClinicRule4,
  };
}

export default autoDoctorSchedule;
