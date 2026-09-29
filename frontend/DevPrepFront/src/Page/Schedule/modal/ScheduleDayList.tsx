import { format } from "date-fns";
import type { ScheduleListModalProps } from "../../../types/schedule";
import "../../../css/ScheduleDayList.css";

export function ScheduleDayListModal({
  isOpen,
  date,
  schedules,
  onClose,
  onSelectSchedule,
}: ScheduleListModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="schedule-modal" onClick={(e) => e.stopPropagation()}>
        {date && <h2>{format(date, "MM월 dd일")}</h2>}

        {schedules.length === 0 ? (
          <p>등록된 일정이 없습니다.</p>
        ) : (
          <ul>
            {schedules.map((schedule) => (
              <li
                key={schedule.id}
                onClick={() => onSelectSchedule(schedule.id)}
              >
                <span>{schedule.title}</span>

                <span>
                  {new Date(schedule.startAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
