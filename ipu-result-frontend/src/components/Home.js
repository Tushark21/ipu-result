import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { message: "" };
    this.state={visible: "hidden"};
  }

  putRequest(enrollmentNum) {
    this.setState({ message: "" });
    this.setState({visible:"visible"});

    var obj = [{
      "enrollmentno": "02411804818",
      "remark": "30",
      "subjects": [
        "048752(24)",
        "048754(4)",
        "048756(2)",
        "Total"
      ],
      "name": "KAPIL KUMAR BAKODE",
      "internal": [
        "27",
        "-",
        "-",
        27
      ],
      "external": [
        "46",
        "68",
        "74",
        188
      ],
      "subjectmarks": [
        "73(A)",
        "68(A)",
        "74(A)",
        215
      ],
      "maximummarks": 300,
      "percentage": 71.67
    }];

    //console.log(enrollmentNum);

    // GET request using fetch with error handling
    fetch('https://api.covid19india.org/v' + enrollmentNum + '/min/data.min.json')
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          this.setState({ message: "Response Code Error :(" });
          return Promise.reject(error);
        }

        console.log(data);
        /*
        if(!data[isFound]){
          this.setState({ message: "Invalid Enrollment Number" });
          return;
        }
        */

        var semesters=[];
        var marks=[];
        var maxMarks=[];
        var percentages=[];
        var semNo=1;
        var totalMaxMarks=0;
        var totalMarks=0;
        obj.forEach((sem) => {
          semesters.push("Semester "+semNo);
          totalMarks+=sem["subjectmarks"][sem["subjectmarks"].length-1];
          totalMaxMarks+=sem["maximummarks"];

          marks.push(sem["subjectmarks"][sem["subjectmarks"].length-1]);
          maxMarks.push(sem["maximummarks"]);
          percentages.push(sem["percentage"]);

          semNo++;
        });

        marks.push(totalMarks);
        maxMarks.push(totalMaxMarks);
        percentages.push(Math.round((totalMarks*10000)/totalMaxMarks)/100);
        semesters.push("Overall");

        let overAllObj = {
          "subjects": semesters,
          "internal": marks,
          "external": maxMarks,
          "subjectmarks": percentages,
          "maximummarks": totalMaxMarks,
          "percentage": Math.round((totalMarks*10000)/totalMaxMarks)/100
        };

        obj.push(overAllObj);
        //console.log("obj",overAllObj);
        
        this.props.history.push({ pathname: '/report', state: { resultObject: obj } });
        //this.setState({ totalReactPackages: data.total })
      })
      .catch(error => {
        //this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
        this.setState({ message: "Error :(" });
        this.setState({visible:"hidden"});
      });
  }

  render() {
    return (
      <div className="input_card">
        <div className="input_area">
          <input ref={this.inputRef} autoFocus autoComplete="on" placeholder="Enrollment Number" className="input_field" type='Number'></input>
          <button className="go_button" onClick={() => { this.putRequest(this.inputRef.current.value); }}>Go</button>
        </div>

        <div className="inner_circle">
          <div className="loading_dot" style={{visibility: this.state.visible}}></div>
        </div>

        <div className="error_message">{this.state.message}</div>
      </div>
    );
  }
}

export default Home;
