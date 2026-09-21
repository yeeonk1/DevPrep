export interface ScheduleResponse {
  id: number;
  title: string;
  content: string;
  startAt: Date;
  endAt: Date;
}

export interface ScheduleRequest {
  title: string;
  content: string;
  startAt: Date;
  endAt: Date;
}

export interface ScheduleDetailResponse {
  title: string;
  content: string;
  startAt: string;
  endAt: string;
}

export interface ScheduleListModalProps {
  isOpen: boolean;
  date: Date | null;
  schedules: ScheduleResponse[];
  onClose: () => void;
  onSelectSchedule: (scheduleId: number) => void;
}

export interface ScheduleDetailModalProps {
  isOpen: boolean;
  scheduleId: number | null;
  onClose: () => void;
}
