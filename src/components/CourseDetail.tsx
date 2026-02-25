// src/components/CourseDetail.tsx
import React from "react";
import type { Course, Section } from "../App";

interface CourseDetailProps {
  course: Course | null;
  semester: string;
}

function SectionTable({ sections }: { sections: Section[] }) {
  if (!sections || sections.length === 0) {
    return <div className="no-sections">No sections for selected semester</div>;
  }

  return (
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
            <td>{s.timeOfDay}</td>
            <td>{s.type}</td>
            <td>{s.instructor}</td>
            <td>{s.credits}</td>
            <td>{s.days}</td>
            <td>{s.time}</td>
            <td>{s.location}</td>
            <td>{s.available}</td>
            <td>{s.waitlist}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
