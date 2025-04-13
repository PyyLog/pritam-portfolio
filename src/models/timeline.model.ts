export interface taskDetails {
  title: string;
  points: string[];
}

export interface Event {
  id: number;
  date: Date;
  title: string;
  menuTitle: string;
  importance: string;
  type: string;
  dateRange: string;
  location: string;
  description: string;
  eventDetails: taskDetails[];
  thumbnailPath: string;
  illustrationPath: string;
  illustrationType: number;
}

export type colorTemplateByType = Record<string, string>;
