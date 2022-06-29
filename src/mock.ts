import { readDoctorList } from 'employee/mock/doctor';
import { readScheduleList } from 'schedule/mock/schedule';

const mockFetcherMap: { [key: string]: Function } = {
  '/api/doctor/list': readDoctorList,
  '/api/schedule/list': readScheduleList,
};

export default mockFetcherMap;
