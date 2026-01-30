import "./Footer.css"
export default function Footer() {
  return (
    <footer>
      <div className="up">
        <div className="left">
          <h2>Elevating performance through <br /> balance, clarity, and growth.</h2>
        </div>
        <div className="right">
          <button><span></span> <span>Contact us</span></button>
        </div>
      </div>
      <div className="down">
        <ul>
          <li className="title">
            For individuals
          </li>
          <li>Home page</li>
          <li>What we do</li>
          <li>Start personal capacity test</li>
          <li>Start metabolic health test</li>
          <li>Contact us</li>
          <li>Useful links</li>
        </ul>
        <ul>
          <li className="title">
            For individuals
          </li>
          <li>Home page</li>
          <li>What we do</li>
          <li>Contact us</li>
          <li>Useful links</li>
        </ul>
        <ul>
          <li className="title">
            For partnership
          </li>
          <li>Home page</li>
          <li>What we do</li>
          <li>Become a partner</li>
        </ul>
      </div>
    </footer>
  )
}