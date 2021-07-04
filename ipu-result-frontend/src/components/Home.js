import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { message: "" };
    this.state = { visible: "hidden" };
  }
  //02511804818
  putRequest(enrollmentNum) {
    this.setState({ message: "Good Luck 👍" });
    this.setState({ visible: "visible" });

    if(enrollmentNum.length<7){
      this.setState({ message: "Invalid Enrollment Number :(" });
      this.setState({ visible: "hidden" });
      return;
    }

    //fetch('https://api.covid19india.org/v' + enrollmentNum + '/min/data.min.json')
    fetch('http://localhost:8000/result/' + enrollmentNum)
    .then(response => response.json())
      .then(jsonResponse => {
        const data = jsonResponse;
        console.log("home:",data);
       
        if(data["error"]!=="null"){
          this.setState({ message: "Invalid Enrollment Number" });
          this.setState({ visible: "hidden" });
          return;
        }
      
        this.props.history.push({ pathname: '/report', state: { resultObject: data } });
      })
      .catch(error => {
        this.setState({ message: "Error :(" });
        this.setState({ visible: "hidden" });
      });
  }

  render() {
    return (
      <div className="input_card">
        <div className="input_area">
          <input ref={this.inputRef} autoFocus autoComplete="on" placeholder="Enrollment Number" className="input_field" type='Number'></input>
          <button className="go_button" onClick={() => { this.putRequest(this.inputRef.current.value); }}>🔍</button>
        </div>

        <div className="loading_circle" style={{ visibility: this.state.visible }}></div>

        <div className="error_message">{this.state.message}</div>
      </div>
    );
  }
}

export default Home;
