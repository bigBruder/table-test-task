import { FC } from "react";

type Props = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
};

export const ButtonMicro: FC<Props> = ({ text, onClick, isDisabled }) => {
  return (
    <button
      className="button button-micro"
      onClick={onClick}
      disabled={isDisabled}
    >
      <span
        className={isDisabled ? "button-micro__hide" : "button-micro__text"}
      >
        {text}
      </span>
    </button>
  );
};
