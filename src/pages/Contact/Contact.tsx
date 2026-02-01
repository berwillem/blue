import Form from "../../components/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import "./Contact.css";
export default function Contact() {
    const links=[  {
      name:"home",
      path:"/"
    },
    {
      name:"about",
      path:"/about"
    },
    {
      name:"why_us",
      path:"#"
    },
    {
      name:"services",
      path:"#"
    }
  ]
  return (
    <div className="contact-container ">
      <Navbar links={links} />
      <Form inputs={{ Name: "", Email: "" }} textArea={{ Message: "" }} />
    </div>
  );
}
