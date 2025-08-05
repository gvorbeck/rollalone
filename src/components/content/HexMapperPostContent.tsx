import React from "react";

const HexMapperPostContent: React.FC = () => {
  const hexSideCls = "absolute";
  return (
    <>
      <p>
        When placing roads, rivers, or coasts, roll a d6 and assign starting and
        ending locations. Reroll if results are the same, or don't make sense.
      </p>
      <div className="flex flex-col items-center relative justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="mb-4">
          <polygon
            points="100,20 170,60 170,140 100,180 30,140 30,60"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            transform="rotate(30 100 100)"
          />
        </svg>
        <span className={`${hexSideCls} top-0`}>1</span>
        <span className={`${hexSideCls} top-11 right-[5.5rem]`}>2</span>
        <span className={`${hexSideCls} bottom-15 right-[5.5rem]`}>3</span>
        <span className={`${hexSideCls} bottom-4`}>4</span>
        <span className={`${hexSideCls} bottom-15 left-[5.5rem]`}>5</span>
        <span className={`${hexSideCls} top-11 left-[5.5rem]`}>6</span>
      </div>
    </>
  );
};

export default HexMapperPostContent;
