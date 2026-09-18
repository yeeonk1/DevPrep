export interface ScheduleResponse {
  id: bigint;
  title: string;
  content: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleRequest {
  title: string;
  content: string;
  startAt: Date;
  endAt: Date;
}
