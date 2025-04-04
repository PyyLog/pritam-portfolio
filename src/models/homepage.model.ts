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
  state: string;
  linkToCodeSpanNames: string[];
  pathToCodes: string[];
}
