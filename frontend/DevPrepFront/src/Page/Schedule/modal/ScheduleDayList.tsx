import { format } from "date-fns";
import type { ScheduleListModalProps } from "../../../types/schedule";

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
    <div className="modal-overlay">
      <div className="schedule-modal">
        {date && <h2>{format(date, "MM/dd")}</h2>}

        {schedules.length === 0 ? (
          <p>등록된 일정이 없습니다.</p>
        ) : (
          <ul>
            {schedules.map((schedule) => (
              <li
                key={schedule.id}
                onClick={() => onSelectSchedule(schedule.id)}
              >
                {schedule.title}
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
