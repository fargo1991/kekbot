import "./style.css";
import Header from "./header.jsx";
import Footer from "./footer.jsx";

export default props => {

  return(
    <div className="layout">
      <Header/>
      <div className="content">
        {props.children}
      </div>
      <Footer/>
    </div>
  )

}
