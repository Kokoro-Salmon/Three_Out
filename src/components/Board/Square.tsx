import React from "react";

type Props = {
  chooseSquare: () => void;
  val: string;
};

const Square = (props: Props) => {
  const { chooseSquare, val } = props;

  const circleComponent = <div className="circle">O</div>;
  const crossComponent = <div className="cross">X</div>;

  return (
    <div onClick={chooseSquare} className="square">
      {val === "X" ? crossComponent : val === "O" ? circleComponent : ""}
    </div>
  );
};

export default Square;
