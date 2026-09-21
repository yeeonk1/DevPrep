import "../css/sidebar.css";
import { FaHome } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";

export function Layout() {
  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <nav>
          <a href="/">
            <FaHome /> <span>대시보드</span>
          </a>
          <a href="/schedule">
            <FaCalendar /> <span>일정</span>
          </a>
          <a href="/resource">
            <FaBook /> <span>자료실</span>
          </a>
          <a href="/community">
            <BsFillChatTextFill /> <span>커뮤니티</span>
          </a>
          <a href="/setting">
            <IoSettingsSharp /> <span>설정</span>
          </a>
        </nav>
      </aside>
    </div>
  );
}
