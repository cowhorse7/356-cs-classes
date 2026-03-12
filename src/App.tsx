import { useState, useMemo } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import "./App.css";
import Footer from "./components/Footer";

export interface Section {
  section: string;
  timeOfDay: string;
  type: string;
  instructor: string;
  credits: number;
  days: string;
  time: string;
  location: string;
  available: number;
  waitlist: number;
  semester: string;
}

export interface Course {
  code: string;
  title: string;
  description: string;
  hours: string;
  prerequisites: string;
  whenTaught: string;
  sections: Section[];
}

// SAMPLE DATA — replace with your real data or fetch from an API
const SAMPLE_COURSES = [
  {
    code: "CS 110",
    title: "How to Program",
    description:
      "Teaches how to design, develop, reason about, and test programs. Topics include higher-order functions, object-oriented programming, recursion, algorithms, data structures, decomposition, interpreters, and regular expressions.",
    hours: "3 (lecture) credit hours, 3 class hours a week, and 2 lab hours",
    prerequisites: "None",
    whenTaught: "Fall, Winter, Spring, Summer",
    sections: [
      {
        section: "001",
        timeOfDay: "Day",
        type: "Classroom",
        instructor: "Tom Stephens",
        credits: 3,
        days: "MTWTh",
        time: "9:30 AM - 10:45 AM",
        location: "JFSB B037",
        available: 10,
        waitlist: 0,
        semester: "Spring 2026",
      },
      {
        section: "002",
        timeOfDay: "Day",
        type: "Classroom",
        instructor: "Jane Doe",
        credits: 3,
        days: "MTWTh",
        time: "12:30 PM - 1:45 PM",
        location: "TMCB 136",
        available: 30,
        waitlist: 0,
        semester: "Spring 2026",
      },
      {
        section: "101",
        timeOfDay: "Evening",
        type: "Remote",
        instructor: "Alan Turing",
        credits: 3,
        days: "T",
        time: "6:00 PM - 8:45 PM",
        location: "Online",
        available: 5,
        waitlist: 2,
        semester: "Summer 2026",
      },
    ],
  },
  {
    code: "CS 111",
    title: "Introduction to Computer Science",
    description:
      "Intro course description here. Prior programming experience should include statements, variables, control flow (if/while), and functions.",
    hours: "3 credit hours",
    prerequisites: "CS 110",
    whenTaught: "Fall, Winter, Spring, Summer",
    sections: [
      {
        section: "001",
        timeOfDay: "Day",
        type: "Classroom",
        instructor: "Sara Connor",
        credits: 3,
        days: "MTWTh",
        time: "2:00 PM - 3:15 PM",
        location: "TMCB 136",
        available: 2,
        waitlist: 1,
        semester: "Spring 2026",
      },
    ],
  },
  {
    code: "CS 224",
    title: "Introduction to Computer Systems",
    description:
      "How a computer works to execute sequential code: low level data representation and abstraction, the relationship between C and assembly, computer architecture and pipelining, the memory hierarchy, dynamic memory allocation, and linking.",
    hours: "3 (lecture) credit hours, 3 class hours a week, and 2 lab hours",
    prerequisites: "CS 235",
    whenTaught: "Fall, Winter, Spring, Summer",
    sections: [
      {
        section: "001",
        timeOfDay: "Day",
        type: "Classroom",
        instructor: "Dylan Barton",
        credits: 3,
        days: "MTTh",
        time: "4 PM - 5:50 PM",
        location: "JKB 2104",
        available: 24,
        waitlist: 0,
        semester: "Spring 2026",
      },
    ],
  },
  {
    code: "CS 235",
    title: "Data Structures",
    description:
      "Fundamental data structures and algorithms of computer science; basic algorithm analysis; recursion; sorting and searching; lists, stacks, queues, trees, hashing; object-oriented data abstraction.",
    hours: "3 credit hours",
    prerequisites: "CS 111",
    whenTaught: "Fall, Winter, Spring, Summer",
    sections: [
      {
        section: "001",
        timeOfDay: "Day",
        type: "Classroom",
        instructor: "Tom Stephens",
        credits: 3,
        days: "MTWTh",
        time: "12:30 PM - 1:45 PM",
        location: "TMCB 1170",
        available: 56,
        waitlist: 0,
        semester: "Spring 2026",
      },
    ],
  },
  {
    code: "CS 240",
    title: "Advanced Software Construction",
    description:
      "Advanced software development with an object-oriented focus. Design, implementation, and testing of medium-sized programs including a server program.",
    hours: "4 credit hours, 3 class hours a week, and 1 lab hour",
    prerequisites: "CS 235",
    whenTaught: "Fall, Winter, Spring, Summer",
    sections: [
      {
        section: "001",
        timeOfDay: "Day",
        type: "On-Demand Remote Delivery",
        instructor: "Jerod Wilkerson",
        credits: 4,
        days: "N/A",
        time: "N/A",
        location: "N/A",
        available: 48,
        waitlist: 0,
        semester: "Spring 2026",
      },
    ],
  },
];

const SEMESTERS = ["Spring 2026", "Summer 2026", "Winter 2026"];

export default function App() {
  const [courses] = useState<Course[]>(SAMPLE_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    courses[0],
  );
  const [semester, setSemester] = useState<string>("Spring 2026");
  const [query, setQuery] = useState<string>("");
  const [isMajorCollapsed, setIsMajorCollapsed] = useState<boolean>(true);
  const [isEmphasisCollapsed, setIsEmphasisCollapsed] = useState<boolean>(true);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;

    return courses.filter((c) => {
      // basic course fields
      if ((c.code + " " + c.title).toLowerCase().includes(q)) {
        return true;
      }

      if (c.description.toLowerCase().includes(q)) {
        return true;
      }
      if (c.hours.toLowerCase().includes(q)) {
        return true;
      }
      if (c.prerequisites.toLowerCase().includes(q)) {
        return true;
      }
      if (c.whenTaught.toLowerCase().includes(q)) {
        return true;
      }

      // look inside every section field
      if (
        c.sections.some((s) =>
          Object.values(s).some((v) => String(v).toLowerCase().includes(q)),
        )
      ) {
        return true;
      }

      return false;
    });
  }, [courses, query]);

  function handleSelectCourse(course: Course) {
    setSelectedCourse(course);
  }

  return (
    <div className="page-root">
      <Header />

      <div className="hero">
        <h2 className="hero-title">
          CS Major Flowchart
          <button
            onClick={() => setIsMajorCollapsed(!isMajorCollapsed)}
            className="collapse-button"
          >
            {isMajorCollapsed ? "▼" : "▲"}
          </button>
        </h2>

        {!isMajorCollapsed && (
          <div className="image-block">
            <img
              src="/flow1.png"
              alt="CS Major Flowchart"
              className="flow-image"
            />
          </div>
        )}

        <h2 className="hero-title">
          Emphasis Flowchart
          <button
            onClick={() => setIsEmphasisCollapsed(!isEmphasisCollapsed)}
            className="collapse-button"
          >
            {isEmphasisCollapsed ? "▼" : "▲"}
          </button>
        </h2>

        {!isEmphasisCollapsed && (
          <div className="image-block">
            <img
              src="/flow2.png"
              alt="Emphasis Flowchart"
              className="flow-image"
            />
          </div>
        )}

        <hr className="divider" />

        <div className="search-row">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={
              "Search code/title/description or days/times (e.g. TTh 2PM)"
            }
          />

          <select
            className="semester-select"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="content container">
        <aside className="left-col">
          <CourseList
            courses={filteredCourses}
            onSelect={handleSelectCourse}
            selected={selectedCourse}
          />
        </aside>

        <section className="right-col">
          <CourseDetail course={selectedCourse} semester={semester} />
        </section>
      </div>
      <Footer />
    </div>
  );
}
