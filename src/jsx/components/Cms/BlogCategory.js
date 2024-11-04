import React, { useReducer } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const tableData = [
    {sr: '1', title: 'Lifestyle'},
    {sr: '2', title: 'Fashion'},
    {sr: '3', title: 'Lifestyle'},
    {sr: '4', title: 'Fashion'},
    {sr: '5', title: 'Food'},
    {sr: '6', title: 'Sasa'},
    {sr: '7', title: 'Beautiy'},
    {sr: '8', title: 'Food'},
    {sr: '9', title: 'Fashion'},
    {sr: '10', title: 'Beautiy'},
    {sr: '11', title: 'Lifestyle'},
    {sr: '12', title: 'Test'},
];

const initialState = true;
const reducer = (state, action) =>{
    switch (action.type){
        case 'openCollapse1':
            return { ...state, openCollapse1: !state.openCollapse1 }
        case 'openCollapse2':
            return { ...state, openCollapse2: !state.openCollapse2 }
        default:
            return state	
    }	
}
const BlogCategory = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"#"}>CMS</Link></li>
                            <li className="breadcrumb-item"><Link to={"#"}>Blog Category</Link></li>
                            <li className="breadcrumb-item active">List</li>
                        </ol>
                    </div>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        <i className="fa-solid fa-file-lines me-1"></i>Add Blog Category
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"} 
                                            className={`SlideToolHeader ${state.openCollapse1 ? 'collapse' : 'expand' }`}
                                            onClick={()=>dispatch({type: 'openCollapse1'})}
                                        >
                                            <i className="fas fa-angle-up" />
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.openCollapse1}>
                                    <div className="cm-content-body  form excerpt">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label  className="form-label">Name</label>
                                                <input type="text" className="form-control" placeholder="Name" />
                                            </div>
                                            <div className="mb-3">
                                                    <label  className="form-label">Slug</label>
                                                    <input type="text" className="form-control" placeholder="Slug" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        <i className="fa-solid fa-file-lines me-1"></i>Blog List
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"} 
                                            className={`SlideToolHeader ${state.openCollapse2 ? 'collapse' : 'expand' }`}
                                            onClick={()=>dispatch({type: 'openCollapse2'})}
                                        >
                                            <i className="fas fa-angle-up" />
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.openCollapse2}>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped verticle-middle table-responsive-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No</th>
                                                            <th scope="col">name</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {tableData.map((item, ind)=>(
                                                            <tr key={ind}>
                                                                <td>{item.sr}</td>
                                                                <td>{item.title}</td>
                                                                <td>
                                                                    <div className="">
                                                                        <Link to={"#"}>Edit</Link>
                                                                        <span> |</span> {" "}
                                                                        <Link to={"#"}>Up</Link>
                                                                        <span> |</span>{" "}
                                                                        <Link to={"#"}>down</Link>
                                                                        <span> |</span>{" "}
                                                                        <Link to={"#"}>delete</Link>                                                                        
                                                                    </div>
                                                                </td>                                                        
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
};

export default BlogCategory;