import React from 'react';

class ResultCard extends React.Component {
    constructor(props){
        super(props);
        this.menuRef = React.createRef();
        this.state={index:this.props.location.state.resultObject.length-2};
        this.lastIndex=this.props.location.state.resultObject.length-1;
    }

    updateReport(){
        //console.log("ind",this.menuRef.current.selectedIndex);
        this.setState({index:this.menuRef.current.selectedIndex});
    }
    render() {
        //console.log("new",this.props.location.state.resultObject[1]);
        if(this.props.location.state===undefined){
            this.props.history.goBack();
        }

        return (
            <div className="result_container">
                <div className="profile_card">
                    <div className="profile_col">
                        <div className="profile_row" >{this.props.location.state.resultObject[0].name}</div>
                        <div className="profile_row" >{this.props.location.state.resultObject[0].enrollmentno}</div>
                        <div className="profile_row" >Overall Percentage: {this.props.location.state.resultObject[this.lastIndex].percentage}%</div>
                    </div>
                </div>

                <select className="drop_menu" ref={this.menuRef} onChange={()=>this.updateReport()}>
                    {this.props.location.state.resultObject[this.lastIndex].subjects.map((sem) => <option className="result_row">{sem}</option>)}    
                </select>

                <div className='result_card'>
                    <div className="result_sub_col">
                        <div className="col_heading">Subjects</div>
                        {this.props.location.state.resultObject[this.state.index].subjects.map((sub) => <div className="result_row">{sub}</div>)}
                        
                    </div>

                    <div className="result_col">
                        <div className="col_heading">Internal</div>
                        {this.props.location.state.resultObject[this.state.index].internal.map((internal) => <div className="result_row">{internal}</div>)}
                        
                    </div>

                    <div className="result_col">
                        <div className="col_heading">External</div>
                        {this.props.location.state.resultObject[this.state.index].external.map((external) => <div className="result_row">{external}</div>)}
                        
                    </div>

                    <div className="result_col">
                        <div className="col_heading">Total</div>
                        {this.props.location.state.resultObject[this.state.index].subjectmarks.map((mark) => <div className="result_row">{mark}</div>)}
                    </div>
                </div>

                <div className="result_card">
                    <div className="col_heading">Percentage</div>
                    <div className="col_heading">{this.props.location.state.resultObject[this.state.index].percentage}%</div>
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