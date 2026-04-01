// src/components/CourseDetail.tsx
import type { Course, Section } from "../App";

interface CourseDetailProps {
  course: Course | null;
  semester: string;
}

const MYMAP_URL = "https://commtech.byu.edu/auth/mymap/";

function SectionTable({ sections }: { sections: Section[] }) {
  if (!sections || sections.length === 0) {
    return <div className="no-sections">No sections for selected semester</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="sections-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Time of Day</th>
            <th>Instruction</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Days</th>
            <th>Time</th>
            <th>Location</th>
            <th>Available</th>
            <th>Waitlist</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((s) => (
            <tr key={s.section}>
              <td>{s.section}</td>
              <td className="time">{s.timeOfDay}</td>
              <td className="place">{s.type}</td>
              <td>{s.instructor}</td>
              <td>{s.credits}</td>
              <td className="time">{s.days}</td>
              <td className="time">{s.time}</td>
              <td className="place">{s.location}</td>
              <td>{s.available}</td>
              <td>{s.waitlist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CourseDetail({ course, semester }: CourseDetailProps) {
  if (!course)
    return <div className="empty-detail">Select a course to see details</div>;

  // typed filter: TypeScript knows course.sections is Section[]
  const sectionsForSemester: Section[] = course.sections.filter(
    (s) => s.semester === semester,
  );

  return (
    <div className="course-detail">
      <h3>
        {course.code} — {course.title}
      </h3>
      <a
        className="course-link"
        href={MYMAP_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in BYU MyMAP
      </a>
      <p className="desc">{course.description}</p>

      <div className="meta-grid">
        <div>
          <strong>Hours:</strong> {course.hours}
        </div>
        <div>
          <strong>Prerequisites:</strong> {course.prerequisites}
        </div>
        <div>
          <strong>When Taught:</strong> {course.whenTaught}
        </div>
      </div>

      <h4>Sections ({semester})</h4>
      <SectionTable sections={sectionsForSemester} />
    </div>
  );
}
