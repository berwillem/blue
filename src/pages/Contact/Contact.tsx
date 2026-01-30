import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import "./Contact.css";
export default function Contact() {
  return (
    <div className="contact-container ">
      <Navbar />
      <Form inputs={{ Name: "", Email: "" }} textArea={{ Message: "" }} />


    </div>
  )
}