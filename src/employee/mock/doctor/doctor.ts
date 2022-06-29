import { delay } from 'common/utils';
import { IDoctor } from 'employee/interface';
import { v1 as uuidv1 } from 'uuid';

const now = new Date();
const thisMonth = now.getMonth();
const thisYear = now.getFullYear();

const v1options = {
  clockseq: 0x1234,
  msecs: now.getTime(),
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  nsecs: 5678,
};

const doctorList: IDoctor[] = [
  {
    group: 'A',
    id: uuidv1({
      ...v1options,
      msecs: new Date(thisYear, thisMonth, 1).getTime(),
    }),
    name: 'A',
    number: '001',
    onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  },
  {
    group: 'A',
    id: uuidv1({
      ...v1options,
      msecs: new Date(thisYear, thisMonth, 2).getTime(),
    }),
    name: 'B',
    number: '002',
    onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  },
  {
    group: 'A',
    id: uuidv1({
      ...v1options,
      msecs: new Date(thisYear, thisMonth, 3).getTime(),
    }),
    name: 'C',
    number: '003',
    onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  },
  {
    group: 'B',
    id: uuidv1({
      ...v1options,
      msecs: new Date(thisYear, thisMonth, 4).getTime(),
    }),
    name: 'D',
    number: '004',
    onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  },
  {
    group: 'B',
    id: uuidv1({
      ...v1options,
      msecs: new Date(thisYear, thisMonth, 5).getTime(),
    }),
    name: 'E',
    number: '005',
    onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  },
  {
    group: 'B',
    id: uuidv1({
      ...v1options,
      msecs: new Date(thisYear, thisMonth, 6).getTime(),
    }),
    name: 'F',
    number: '006',
    onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  },
  // {
  //   group: 'G',
  //   id: uuidv1({
  //     ...v1options,
  //     msecs: new Date(thisYear, thisMonth, 7).getTime(),
  //   }),
  //   name: 'G',
  //   number: '007',
  //   onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  // },
  // {
  //   group: 'G',
  //   id: uuidv1({
  //     ...v1options,
  //     msecs: new Date(thisYear, thisMonth, 8).getTime(),
  //   }),
  //   name: 'H',
  //   number: '008',
  //   onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
  // },
];

export async function readDoctorList() {
  await delay();

  return doctorList;
}
