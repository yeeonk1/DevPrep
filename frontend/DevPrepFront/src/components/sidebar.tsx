import "../css/sidebar.css";
import { FaHome } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";

export function SideBar() {
  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <nav>
          <Link to="/">
            <FaHome />
            <span>대시보드</span>
          </Link>

          <Link to="/schedule">
            <FaCalendar />
            <span>일정</span>
          </Link>

          <Link to="/resource">
            <FaBook />
            <span>자료실</span>
          </Link>

          <Link to="/community">
            <BsFillChatTextFill />
            <span>커뮤니티</span>
          </Link>

          <Link to="/setting">
            <IoSettingsSharp />
            <span>설정</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
}
