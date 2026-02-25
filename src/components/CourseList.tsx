import type { Course } from "../App";

interface Props {
  courses: Course[];
  onSelect: (course: Course) => void;
  selected: Course | null;
}

export default function CourseList({ courses, onSelect, selected }: Props) {
  if (!courses.length)
    return <div className="no-results">No courses found</div>;
  return (
    <div className="course-list">
      {courses.map((c) => (
        <div
          key={c.code}
          className={
            "course-card" +
            (selected && selected.code === c.code ? " selected" : "")
          }
          onClick={() => onSelect(c)}
        >
          <div className="course-code">{c.code}</div>
          <div className="course-title">{c.title}</div>
        </div>
      ))}
    </div>
  );
}
