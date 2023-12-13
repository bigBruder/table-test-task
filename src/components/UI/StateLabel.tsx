import { FC } from "react";

type Props = {
  text: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icon: any;
};

export const StateLabel: FC<Props> = ({
  text,
  bgColor,
  icon,
  borderColor,
  textColor,
}) => {
  return (
    <div
      className="state-label"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "4px",
      }}
    >
      <div className="state-label__text" style={{ color: textColor }}>
        <span>{text}</span>
      </div>
      <div className="state-label__icon">
        <span>{icon}</span>
      </div>
    </div>
  );
};
