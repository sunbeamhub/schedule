export interface IDoctor {
  group: string;
  id: string;
  name: string;
  number: string;
  onDuty: Array<'dayshift' | 'nightshift' | 'outpatientClinic'>;
}
