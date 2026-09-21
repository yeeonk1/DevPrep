import { useEffect, useState } from "react";
import type {
  ScheduleDetailModalProps,
  ScheduleDetailResponse,
} from "../../../types/schedule";
import { scheduleApi } from "../../../api/schedule/schedule";

export function ScheduleDetail({
  isOpen,
  scheduleId,
  onClose,
}: ScheduleDetailModalProps) {
  const userId = "test"; // 임시
  const [schedule, setSchedule] = useState<ScheduleDetailResponse | null>(null);

  useEffect(() => {
    if (!isOpen || scheduleId === null) {
      return;
    }

    const getScheduleDetail = async () => {
      try {
        const data = await scheduleApi.getScheduleDetail(userId, scheduleId);

        setSchedule(data);
      } catch (error) {
        console.error("일정 상세 조회 실패", error);
      }
    };

    getScheduleDetail();
  }, [isOpen, scheduleId]);

  if (!isOpen) {
    return null;
  }

  if (!schedule) {
    return (
      <div>
        일정을 불러오는 중입니다 <br />
        잠시만 기다려 주세요
      </div>
    );
  }
  return (
    <div className="modal-overlay">
      <div className="schedule-detail-modal">
        <h2>{schedule.title}</h2>

        <p>{schedule.content}</p>

        <p>
          {schedule.startAt} ~ {schedule.endAt}
        </p>

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
