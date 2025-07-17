import React from "react";

interface CardContentImageProps {
  content: string;
  title: string;
}

const CardContentImage: React.FC<CardContentImageProps> = ({
  content,
  title,
}) => {
  return (
    <div className="text-center">
      <img
        src={content}
        alt={title}
        className="mx-auto rounded-lg max-w-full h-auto"
      />
    </div>
  );
};

export default CardContentImage;
