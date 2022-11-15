export interface LeaClass {
  title: string;
  teacher: string;
  section: string;
  code: string;
  schedule: string[];
  distributedDocuments: number;
  distributedAssignments: number;
  grade?: string;
  average?: number;
  median?: number;
}
