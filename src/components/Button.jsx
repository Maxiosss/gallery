import { forwardRef } from "react";

const Button = forwardRef(function Button({ onClick }, ref) {
  return (
    <div className="ButtonContainer">
      <button className="Button" onClick={onClick} ref={ref}>
        Load more
      </button>
    </div>
  );
});

export default Button;
