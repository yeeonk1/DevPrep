import axios from "axios";
import type {
  ScheduleDetailResponse,
  ScheduleRequest,
  ScheduleResponse,
} from "../../types/schedule";

const api = axios.create({
  baseURL: "/schedule",
  headers: {
    "Content-Type": "application/json",
  },
});

export const scheduleApi = {
  // 일정 조회 (달력)
  getScheduleByCalendar: async (
    userId: string,
    startAt: string,
    endAt: string,
  ): Promise<ScheduleResponse[]> => {
    const res = await api.get("/calendar", {
      params: { userId, startAt, endAt },
    });

    return res.data;
  },

  // 일정 조회 (오늘/내일 목록)
  getTodayAndTomorrowSchedule: async (
    userId: string,
  ): Promise<ScheduleResponse[]> => {
    const res = await api.get("/today-tomorrow", {
      params: { userId },
    });

    return res.data;
  },

  // 일정 조회 (상세)
  getScheduleDetail: async (
    userId: string,
    scheduleId: number,
  ): Promise<ScheduleDetailResponse> => {
    const res = await api.get("/detail", { params: { userId, scheduleId } });
    return res.data;
  },

  // 일정 등록
  registSchedule: async (
    userId: string,
    data: ScheduleRequest,
  ): Promise<ScheduleResponse> => {
    const res = await api.post("/regist", data, {
      params: { userId },
    });
    return res.data;
  },

  // 일정 수정
  editSchedule: async (
    userId: string,
    data: ScheduleRequest,
  ): Promise<ScheduleResponse> => {
    const res = await api.put("/edit", data, {
      params: { userId },
    });
    return res.data;
  },

  // 일정 삭제
  deleteSchedule: async (userId: string, scheduleId: bigint): Promise<void> => {
    await api.delete("/delete", {
      params: { userId, scheduleId },
    });
  },
};
