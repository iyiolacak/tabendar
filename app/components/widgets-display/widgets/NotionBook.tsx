// /app/components/widges-display/widgets/NotionBook.tsx
import React, { useState } from "react";
import BookCard from "../../BookCover";
const NotionBook = () => {
  const [showAlternative, setShowAlternative] = useState<boolean>(false);
  const isItTime = Math.random() < 0.1;

  const handleHover = () => {
    if (isItTime) {
      setShowAlternative(true);
    } else {
      setShowAlternative(false);
    }
  };

  return (
    <div onMouseEnter={handleHover}>
      <BookCard
        displayValue="Notion"
        cover=""
        onClick={() => console.log("I think you should go Notion manually.")}
      />

      {/* Render something based on showAlternative */}
      {showAlternative ? "Obsidian Mode" : "Notion Mode"}
    </div>
  );
};

export default NotionBook;
