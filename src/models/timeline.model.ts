export interface TimelineEvent {
  id: number;
  date: Date;
  title: string;
  type: string;
  description: string;
}

export type colorTemplateByType = Record<string, string>;
