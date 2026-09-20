import { useEffect, useState } from "react";
import type { ScheduleResponse } from "../../types/schedule";
import { scheduleApi } from "../../api/schedule/schedule";
import { addDays, getDay, isSameDay, parse, startOfWeek } from "date-fns";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { ko } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

export function SchedulePage() {
  const [sidebarSchedules, setSidebarSchedules] = useState<ScheduleResponse[]>(
    [],
  );
  const [calendarSchedules, setCalendarSchedules] = useState<
    ScheduleResponse[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  const [loading, setLoading] = useState<boolean>(false);

  const userId = "test"; // 임시

  const getSidebarSchedules = async () => {
    try {
      setLoading(true);

      const data = await scheduleApi.getTodayAndTomorrowSchedule(userId);
      setSidebarSchedules(data);
    } catch (error) {
      console.error("사이드바 일정 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const tomorrow = addDays(today, 1);

  const todaySchedules = sidebarSchedules.filter((schedule) => {
    isSameDay(new Date(schedule.startAt), today);
  });
  const tomorrowSchedules = sidebarSchedules.filter((schedule) => {
    isSameDay(new Date(schedule.startAt), tomorrow);
  });

  const getCalendarSchedules = async (date: Date) => {
    try {
      const startAt = format(startOfMonth(date), "yyyy-MM-dd'T'HH:mm:ss");
      const endAt = format(endOfMonth(date), "yyyy-MM-dd'T'HH:mm:ss");

      const data = await scheduleApi.getScheduleByCalendar(
        userId,
        startAt,
        endAt,
      );

      setCalendarSchedules(data);
    } catch (error) {
      console.error("달력 일정 조회 실패", error);
    }
  };

  useEffect(() => {
    getSidebarSchedules();
    getCalendarSchedules(new Date());
  }, []);

  const locales = {
    ko,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const CalendarEvents = calendarSchedules.map((schedule) => ({
    id: schedule.id,
    title: schedule.title,
    start: new Date(schedule.startAt),
    end: new Date(schedule.endAt),
  }));

  const handleNavigate = (date: Date) => {
    setCalendarDate(date);
    getCalendarSchedules(date);
  };

  const onChangeCalendar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(`${e.target.value}T00:00:00`);
    setSelectedDate(date);
    setCalendarDate(date);
    getCalendarSchedules(date);
  };

  if (loading) {
    return (
      <p>
        일정을 조회하고 있습니다
        <br />
        잠시만 기다려 주세요
      </p>
    );
  }

  return (
    <div className="schedule-page">
      <aside className="schedule-sidebar">
        <div className="schedule-date-picker">
          <label htmlFor="schedule-date">날짜 선택</label>

          <input
            id="schedule-date"
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={onChangeCalendar}
          />
        </div>

        <section>
          <h3>오늘</h3>

          {todaySchedules.length === 0 ? (
            <p>오늘 일정이 없습니다.</p>
          ) : (
            todaySchedules.map((schedule) => (
              <div key={schedule.id}>
                <strong>{schedule.title}</strong>
                <p>{schedule.content}</p>
                <span>
                  {new Date(schedule.startAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))
          )}
        </section>

        <section>
          <h3>내일</h3>

          {tomorrowSchedules.length === 0 ? (
            <p>내일 일정이 없습니다.</p>
          ) : (
            tomorrowSchedules.map((schedule) => (
              <div key={schedule.id}>
                <strong>{schedule.title}</strong>
                <p>{schedule.content}</p>
                <span>
                  {new Date(schedule.startAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))
          )}
        </section>
      </aside>

      {/* 오른쪽 */}
      <main className="schedule-calendar">
        <Calendar
          localizer={localizer}
          events={CalendarEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          date={calendarDate}
          onNavigate={handleNavigate}
        />
      </main>
    </div>
  );
}
