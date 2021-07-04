import React from 'react';

class ResultCard extends React.Component {
    constructor(props) {
        super(props);
        this.menuRef = React.createRef();
        this.result = this.props.location.state.resultObject;
        this.rowHeading = ["Subjects", "Internal", "External", "Total"];

        //console.log("lll");
        //console.log("old",this.props.location.state.resultObject);
        //console.log("start:",this.result);
        this.semesterList = [];
        let semList = [];
        let totalSemMarks = 0;
        let totalMaxMarks = 0;
        //console.log("res",this.result["semester08"]["stat"]);

        Object.entries(this.result).forEach(([key, value]) => {
            if (key !== "name" && key !== "enrollmentno" && key !== "error") {
                this.semesterList.push(key);
                console.log("key:", key);
                totalSemMarks += value["stat"]["Total"];
                totalMaxMarks += value["stat"]["maximummarks"];
                semList.push({
                    "subject": key,
                    "marks": [value["stat"]["Total"], value["stat"]["maximummarks"], value["stat"]["percentage"]]
                })

            }
        });

        /*
        semList.push({
            "subject":"Overall",
            "marks":[totalSemMarks+"%",totalMaxMarks+"%",(Math.round((totalSemMarks*10000)/totalMaxMarks)/100)+"%"]
        });*/

        this.result["Overall"] = {
            "subjectlist": semList,
            "stat": {
                "Total": totalSemMarks,
                "maximummarks": totalMaxMarks,
                "percentage": Math.round((totalSemMarks * 10000) / totalMaxMarks) / 100
            }
        };

        this.semesterList.sort();
        //this.semesterList.push("Overall");
        this.state = { sem: this.semesterList[this.semesterList.length - 1] }
        console.log("final:", this.result);
    }

    updateReport() {
        //console.log("ind",this.menuRef.current.selectedIndex);
        if (this.menuRef.current.selectedIndex === 0) {
            this.rowHeading = ["Semesters", "Marks", "Max Marks", "Percentage"];
        }
        else {
            this.rowHeading = ["Subjects", "Internal", "External", "Total"];
        }
        this.setState({ sem: this.semesterList[this.menuRef.current.selectedIndex] });
    }

    componentDidMount() {
        this.menuRef.current.selectedIndex = this.semesterList.length - 1;
    }

    render() {
        //console.log("new",this.props.location.state.resultObject[1]);
        if (this.props.location.state === undefined) {
            this.props.history.goBack();
        }

        return (
            <div className="result_container">
                {/*Student's Profile*/}
                <div className="profile_card">
                    <div className="profile_col">
                        <div className="profile_row" >{this.result.name}</div>
                        <div className="profile_row" >{this.result.enrollmentno}</div>
                        <div className="profile_row" >Overall Percentage: {this.result.Overall.stat.percentage}%</div>
                    </div>
                </div>

                {/*Drop Menu*/}
                <select className="drop_menu" ref={this.menuRef} onChange={() => this.updateReport()}>
                    {this.semesterList.map((sem) => <option className="result_row">{sem}</option>)}
                </select>

                {/*Result Display*/}
                <div className='result_card'>
                    <div className='result_display'>
                        
                        {/*<div className="row_heading">
                            {this.rowHeading.map((title) =>
                                <div className="">{title}</div>
                            )}
                            </div>*/}
                        {this.result[this.state.sem]["subjectlist"].map((obj) =>
                            <div className="result_row">
                                <div className="subject_cell">{obj["subject"]}</div>
                                <div className="marks_cell">{obj["marks"][0]}</div>
                                <div className="marks_cell">{obj["marks"][1]}</div>
                                <div className="marks_cell">{obj["marks"][2]}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="percent_display">
                    <div className="col_heading">Percentage</div>
                    <div className="col_heading">{this.result[this.state.sem]["stat"].percentage}%</div>
                </div>
            </div>
        );
    }
}

export default ResultCard;
  /*
<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
{this.props.location.state.dataObject.skills.map((skill) => <div key={skill.key} style={{margin: '20px'}}><Col><SquareCard skillObject={skill} /></Col></div>)}
</div>
*/