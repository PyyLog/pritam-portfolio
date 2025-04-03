export interface taskDetails {
  title: string;
  points: string[];
}

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  context: string;
  tasksDetails: taskDetails[];
  technologies: string[];
  thumbnail: string;
  illustration: string;
  spanNames: string[];
  pathToCodes: string[];
}
