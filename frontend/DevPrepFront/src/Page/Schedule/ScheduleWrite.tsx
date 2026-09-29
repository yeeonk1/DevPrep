import { useState } from "react";
import { scheduleApi } from "../../api/schedule/schedule";
import "../../css/ScheduleWrite.css";
import { useNavigate } from "react-router-dom";

export function ScheduleWrite() {
  const nav = useNavigate();
  const userId = "test";
  const [form, setForm] = useState({
    title: "",
    content: "",
    startAt: "",
    endAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.startAt || !form.endAt) {
      alert("필수 항목을 입력해 주세요");
      return;
    }

    try {
      const requestSchedules = {
        title: form.title,
        content: form.content,
        startAt: form.startAt + ":00",
        endAt: form.endAt + ":00",
      };

      await scheduleApi.registSchedule(userId, requestSchedules);
      alert("일정 등록이 성공적으로 완료되었습니다.");
      nav("/schedule");
    } catch (error) {
      console.error("일정 등록 실패", error);
      alert("일정 등록에 실패하였습니다.");
    }
  };

  return (
    <div className="schedule-write-page">
      <div className="schedule-write-header">
        <p className="category">일정</p>
        <h2 className="title">일정 등록</h2>
        <small className="explain">새로운 일정 정보를 등록하세요</small>
      </div>

      <div className="schedule-write-middle">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">일정 제목</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              onChange={handleChange}
              className="input-title"
              placeholder="일정 제목을 입력하세요."
            />
          </div>

          <div className="form-group">
            <label>일정 시간</label>

            <div className="schedule-time">
              <input
                name="startAt"
                type="datetime-local"
                required
                onChange={handleChange}
                className="input-startAt"
              />

              <span>~</span>

              <input
                name="endAt"
                type="datetime-local"
                required
                onChange={handleChange}
                className="input-endAt"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="memo">상세</label>
            <textarea
              id="memo"
              name="content"
              maxLength={50}
              placeholder="일정에 대한 상세 내용을 50자 이내로 작성해 주세요."
              onChange={handleChange}
              className="input-memo"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="btn-cancel"
            >
              취소
            </button>
            <button type="submit" className="btn-submit">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
