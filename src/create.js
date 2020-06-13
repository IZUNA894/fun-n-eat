import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = '*******';
const CLOUDINARY_UPLOAD_URL = '************';
export default class create extends Component {
    constructor(props){
        super(props);
        this.state={
            recipe :{
                img:"",
                name:"n",
                description:"dd",
                ing:[]
            },
            recipeArr:JSON.parse(localStorage.getItem('recipeArr')) || [],
            uploadedFileCloudinaryUrl: ''
        }
    }

    componentWillMount(){
        var recipeArr ="";
        recipeArr = localStorage.getItem("recipeArr")?localStorage.getItem("recipeArr"):[];
        this.setState({recipeArr});
    }
    onImageDrop =(files)=>{
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
    }
    handleImageUpload=(file)=>{
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
        if (err) {
            console.error(err);
        }
    
        if (response.body.secure_url !== '') {
            this.setState({
            uploadedFileCloudinaryUrl: response.body.secure_url
            });
        }
    });
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        // console.log("submit");
        // console.log(e);
        // console.log(this.name,this.description,this.ingName,this.ingQuan);
        var img = this.state.uploadedFileCloudinaryUrl ;
        // console.log(img)
        var recipe ={};
        recipe = {
            img:img,
            name:this.name,
            description:this.description,
            ing:this.ing
        }
        console.log(recipe);
        this.nameInp.value="";
        this.descInp.value="";
        var recipeArr = this.state.recipeArr || [];
        recipeArr = recipeArr.length ? JSON.parse(recipeArr):[]
        console.log(recipeArr);
        recipeArr.push(recipe);
        recipeArr = JSON.stringify(recipeArr);
        console.log(recipeArr);
        window.localStorage.setItem('recipeArr',recipeArr);
        window.location.href="/"
    }

    handleName =(e)=>{
        console.log(e.target.value);
        this.name = e.target.value;

    }
    handleDescription =(e)=>{
        console.log(e.target.value);
        this.description = e.target.value;

    }
    setIngredients=(ing)=>{
        this.ing = ing;
    }
    
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-lg-12 text-center">
                        <h1 className="">Create A New Recipe</h1>
                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            accept="image/*"
                            multiple={false}>
                                {({getRootProps, getInputProps}) => {
                                return (
                                    <div style={{border: '5px dashed dimgrey',
                                                height: '30vh',
                                                width: '15vw',
                                                borderRadius: '5px'}}
                                    {...getRootProps()}
                                    >
                                    <input {...getInputProps()} />
                                    {
                                    <p>Try dropping some files here, or click to select files to upload.</p>
                                    }
                                    </div>
                                )
                            }}
                        </Dropzone>
                        <div>
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img src={this.state.uploadedFileCloudinaryUrl} height="100" width="150"/>
                            </div>}
                        </div>
                        <form onSubmit={this.handleSubmit} className="text-center">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input onChange={this.handleName} type="name" className="form-control" id="name" ref={(inp)=>this.nameInp = inp}/>
                                <small id="nameHelp" className="form-text text-muted">Give your recipe a Yummy name!</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <textarea onChange={this.handleDescription} className="form-control" id="FormControlTextarea" rows="3" ref={(inp)=>this.descInp = inp}/>
                            </div>
                            <Ingredients setIngredients={this.setIngredients}/>
                            
                            <button type="submit" className="btn btn-primary mt-4" style={{marginRight:'auto',marginLeft:'auto',display:'inline-block'}}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


class Ingredients extends Component {
    constructor(props){
        super(props);
        this.state ={
            ing:[]
        }
    }
    handleIngName =(e)=>{
        console.log(e.target.value);
        this.ingName = e.target.value;

    }
    handleIngQuan =(e)=>{
        console.log(e.target.value);
        this.ingQuan = e.target.value;

    }
    handleIngAdd =(e)=>{
        var ing = this.state.ing;
        ing.push({
            name:this.ingName,
            quan:this.ingQuan
        });
        this.setState({ing});
        console.log(ing);
        this.props.setIngredients(ing);
        this.nameInp.value ="";
        this.quanInp.value ="";
    }
    deleteIng=(ind)=>{
        var ing = this.state.ing;
        delete ing[ind];
        this.setState({ing})
        console.log(ing)
    }
    handleQuanDec = ()=>{
        var quan = document.getElementById('quan');
        quan.value = quan.value-1;
        this.ingQuan--;
    }
    handleQuanInc = ()=>{
        var quan = document.getElementById('quan');
        quan.value = quan.value+1;
        this.ingQuan++;
    }
    render() {
        console.log(this.state.ing);
        var ing = this.state.ing || [];
        var IngArry = ing&& ing.map((item,index)=>{
            return(
                <div className="alert alert-warning alert-dismissible fade show" role="alert" key={index}>
                    <strong>{item.name}</strong> {item.quan}
                    <button onClick={()=>this.deleteIng(index)} type="button" className="close" data-dismiss="alert" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        })
        return (
            <div>
                {IngArry}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Ingredient</span>
                    </div>
                    <input onChange={this.handleIngName}  type="text"  className="form-control" id="name" ref={(inp)=>this.nameInp = inp}/>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Quantity</span>
                    </div>
                    <input onChange={this.handleIngQuan} type="number"  className="form-control" id="quan" ref={(inp)=>this.quanInp = inp}/>
                    <div className="input-group-append" id="button-addon4">
                        <button onClick={this.handleQuanInc} className="btn btn-outline-secondary" type="button">+</button>
                        <button onClick={this.handleQuanDec} className="btn btn-outline-secondary" type="button">-</button>
                        <button onClick={this.handleIngAdd} className="btn btn-outline-secondary" type="button">Add</button>
                        {/* <button onClick={this.handleIngRem} className="btn btn-outline-secondary" type="button">Remove</button> */}

                    </div>

                </div>

            </div>
        )
    }
}
