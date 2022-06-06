import { IDoctor } from 'employee/interface';

function useDoctor() {
  const doctorList: IDoctor[] = [
    {
      group: 'A',
      id: '0',
      name: 'A',
      number: '001',
      onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    },
    {
      group: 'A',
      id: '1',
      name: 'B',
      number: '002',
      onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    },
    {
      group: 'A',
      id: '2',
      name: 'C',
      number: '003',
      onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    },
    {
      group: 'B',
      id: '3',
      name: 'D',
      number: '004',
      onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    },
    {
      group: 'B',
      id: '4',
      name: 'E',
      number: '005',
      onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    },
    {
      group: 'B',
      id: '6',
      name: 'F',
      number: '006',
      onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    },
    // {
    //   group: 'G',
    //   id: '7',
    //   name: 'G',
    //   number: '007',
    //   onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    // },
    // {
    //   group: 'G',
    //   id: '8',
    //   name: 'H',
    //   number: '008',
    //   onDuty: ['dayshift', 'nightshift', 'outpatientClinic'],
    // },
  ];

  return { doctorList };
}

export default useDoctor;
