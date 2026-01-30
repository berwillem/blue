import "./Button.css";
export default function Button({
  text,
  width,
}: {
  text: string;
  width: string;
}) {
  return (
    <button className="action-button" style={{ width: width }}>
      <p className="dot"></p>
      {text}
    </button>
  );
}
