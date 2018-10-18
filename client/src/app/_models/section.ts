export interface Section {
  id: number;
  subjectId: number;
  year: number;
  term: string;
  type: string;
  activity: number;
  day: string;
  startTime: string;
  endTime: string;
  location1: string;
  location2: string;
  weeks: string;
  [key: string]: any;
}
