import { useState } from "react";
import { Popover } from "react-tiny-popover";

function TriagElement({
  color,
  children,
  width,
}: {
  color: string;
  children: React.ReactNode;
  width: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Popover
      isOpen={isHovered}
      content={<span className="text-black text-xl">{children}</span>}
    >
      <div
        className={` rounded-sm flex items-center justify-center cursor-pointer`}
        style={{
          backgroundColor: color,
          width: `${width}px`,
          height: `${width}px`,
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        •
      </div>
    </Popover>
  );
}

export default TriagElement;
