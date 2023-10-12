interface Props {
  onClick: () => void;
  text: string;
}

const ReturnBtn = ({ onClick, text }: Props): JSX.Element => {
  return (
    <button className="goBack" onClick={onClick}>
      <span className="material-icons">arrow_back</span>{" "}
      <span className="text">{text}</span>
    </button>
  );
};

export default ReturnBtn;
