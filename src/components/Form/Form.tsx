interface FormInputs {
  [key: string]: string | number | boolean;
}
import { FiCalendar } from "react-icons/fi";
import "./Form.css";
export default function Form({ inputs, textArea }: { inputs: FormInputs, textArea: FormInputs }) {
  return (
    <form className="form">
      {Object.entries(inputs).map(([key, value]) => (
        <div key={key} className="form-group">

          <input
            type={typeof value === "number" ? "number" : "text"}
            id={key}
            name={key}
            defaultValue={value.toString()}
            placeholder={key}
          />

        </div>
      ))}
      {Object.entries(textArea).map(([key, value]) => (
        <div key={key} className="form-group">

          <textarea placeholder={key} id={key} name={key} defaultValue={value.toString()} />
        </div>
      ))}
      <button type="submit"><FiCalendar /> Book a call</button>
    </form>
  )
}