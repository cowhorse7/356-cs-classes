import React from "react";
interface Props {
  title: string;
  imagePaths: string[];
  index: number;
  onToggle: () => void;
}

export default function ImageToggle({
  title,
  imagePaths,
  index,
  onToggle,
}: Props) {
  return (
    <div className="image-block">
      <div className="image-and-button">
        <img src={imagePaths[index]} alt={title} className="flow-image" />
        <div className="image-button-row">
          <button className="toggle-btn" onClick={onToggle}>
            Switch Emphasis/Core View
          </button>
        </div>
      </div>
    </div>
  );
}
