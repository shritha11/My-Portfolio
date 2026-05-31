import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaFigma,
} from "react-icons/fa";
import {
  SiJavascript,
  SiMysql,
  SiCanva,
  SiFirebase,
  SiFlutter,
} from "react-icons/si";

const logos = [
  { icon: FaReact, color: "#61DAFB" },
  { icon: FaHtml5, color: "#E44D26" },
  { icon: FaCss3Alt, color: "#1572B6" },
  { icon: SiJavascript, color: "#F7DF1E" },
  { icon: FaPython, color: "#3776AB" },
  { icon: SiMysql, color: "#4479A1" },
  { icon: FaFigma, color: "#F24E1E" },
  { icon: SiFlutter, color: "#02569B" },
  { icon: SiCanva, color: "#00C4CC" },
  { icon: SiFirebase, color: "#FFCA28" },
];

export default function LogoMarquee() {
  const repeated = [...logos, ...logos];
  return (
    <div className="logo-marquee">
      <div className="logo-track">
        {repeated.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="logo-item" key={index}>
              <Icon style={{ color: item.color }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}