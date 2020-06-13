import React, { Component } from 'react'

export default class home extends Component {
    constructor(props){
        super(props)
        this.state={
            recipeArr:localStorage.getItem('recipeArr') || []
        }
    }
    componentWillMount(){
        // console.log(this.state.recipeArr);
    }
    render() {
        var recipeArr = this.state.recipeArr;
        console.log(recipeArr);
        recipeArr= recipeArr.length?JSON.parse(recipeArr):[];
        console.log(recipeArr);

        var cardsArr = recipeArr.length ? recipeArr.map((item)=>{
            
            return(
                    <div className="col-lg-4">
                        <div className="card">
                            <img src={item.img} className="card-img-top" alt=""/>
                            <div className="card-body">
                                <h5 className="card-title text-center">{item.name}</h5>
                                <p className="card-text text-center">{item.description}</p>
                                <ul class="list-group list-group-flush">
                                    {  item.ing.map((ing)=>{
                                        return(
                                            <li className="list-group-item text-center"><strong>{ing.name}</strong> - {ing.quan}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
            )
        }):<div className="col-lg-12 text-center" >create some new Delicious recipe in Create Section</div>

        return (
            <div className="container-fluid" style={{marginTop:'5vh'}}>
                <div className="row">
                        {cardsArr}
    
                </div>
                <div className="container  w3-center"  style={{position:'relative',bottom:"-300px"}}>
                    {/* <!-- <footer> --> */}
                    <p class="text-center" style={{fontSize:'20px'}}>Crafted with
                    <i class="fas fa-heart " style={{color:'red'}}></i>
                    by Tony</p>
                    {/* <!-- </footer> --> */}
                </div>
            </div>
                
        )
    }
}
