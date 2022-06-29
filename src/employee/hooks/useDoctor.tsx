import { IDoctor } from 'employee/interface';
import useSWR from 'swr';

function useDoctor() {
  const { data = [] } = useSWR<IDoctor[]>('/api/doctor/list');

  return { doctorList: data };
}

export default useDoctor;
