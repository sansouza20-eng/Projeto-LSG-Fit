import type { Exercise } from './exercise';

export const WEEKDAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  MONDAY: 'Segunda',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta',
  THURSDAY: 'Quinta',
  FRIDAY: 'Sexta',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

export type WorkoutEntry = {
  id: string;
  sets: number;
  reps: number;
  weight: number | null;
  order: number;
  exercise: Exercise;
};

export type WorkoutDay = {
  dayOfWeek: Weekday;
  entries: WorkoutEntry[];
};
