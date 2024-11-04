import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown,Modal} from 'react-bootstrap';
import {nanoid} from 'nanoid';
import swal from "sweetalert";

//Images
import user from './../../../../images/card/user.jpg';
import card1 from './../../../../images/card/1.jpg';
import card2 from './../../../../images/card/2.jpg';
import card3 from './../../../../images/card/3.jpg';
import card4 from './../../../../images/card/4.jpg';

const CardListBlog = [
	{image: card1, subTitle:'Primary', bankName:'ABC Bank'		,},
	{image: card2, subTitle:'Secondary', bankName:'PQR Bank'	,},
	{image: card3, subTitle:'Primary', bankName:'XYZ Bank'		,},
	{image: card4, subTitle:'Secondary', bankName:'LMN Bank'	,},
];

const CardsList = () => {
	const [country1, setCountry1] = useState("Newest");
	
	//Modal box
	const [addCard, setAddCard] = useState(false);
	
	const [contacts, setContacts] = useState(CardListBlog);
	
	// delete data  
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];    
        const index = contacts.findIndex((contact)=> contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }
	
	//Add data 
    const [addFormData, setAddFormData ] = useState({
        bankName:'',
        subTitle:'',
		image:'',
    }); 
    
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';
        if(addFormData.bankName === ""){
            error = true;
			errorMsg = 'Please fill bank name';
        }else if(addFormData.subTitle === ""){
            error = true;
			errorMsg = 'Please fill sub title.';
        }
        else if(addFormData.image === ""){
            error = true;
			errorMsg = 'Please add image.';
        }
        if(!error){
            const newContact = {
                id: nanoid(),
                bankName: addFormData.bankName,
                subTitle:  addFormData.subTitle,
				image: addFormData.image,
			};
            const newContacts = [...contacts, newContact];
            setContacts(newContacts);
            setAddCard(false);
            swal('Good job!', 'Successfully Added', "success");
            addFormData.bankName  = addFormData.subTitle = addFormData.image = '';         
            
        }else{
			swal('Oops', errorMsg, "error");
		}
    };
	
	//Edit start 
	const [editModal, setEditModal] = useState(false);	
	// Edit function editable page loop
    const [editContactId, setEditContactId] = useState(null);
   
    // Edit function button click to edit
    const handleEditClick = ( event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues = {
            bankName: contact.bankName,
            subTitle: contact.subTitle,  
            image: contact.image,  
        }
        setEditFormData(formValues);
        setEditModal(true);
    };
    
    
    // edit  data  
    const [editFormData, setEditFormData] = useState({
        bankName:'',
        subTitle:'',
        image:'',
    })
    
    //update data function
    const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    
    // edit form data submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
            id: editContactId,
            bankName: editFormData.bankName,
            subTitle: editFormData.subTitle,
            image: editFormData.image,

        }
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact)=> contact.id === editContactId);
        newContacts[index] = editedContact;
        setContacts(newContacts);
        setEditContactId(null);
        setEditModal(false);
        
    }
	
	//For Image upload in ListBlog
	const [file, setFile] = React.useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
		setTimeout(function(){
			var src = document.getElementById("saveImageFile").getAttribute("src");
			addFormData.image = src; 
		}, 200);
    }
	
	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block border-0 pb-0">
					<div className="me-auto mb-sm-0 mb-4">
						<h4 className="fs-20 text-black">Card List</h4>
						<span className="fs-12">Lorem ipsum dolor sit amet, consectetur</span>
					</div>
					<Link to={"#"} className="btn btn-primary btn-rounded btn-md me-3" onClick={()=> setAddCard(true)}>+ Add New Card</Link>
					<Modal className="modal fade"  show={addCard} onHide={setAddCard} >
						<div className="" role="document">
							<div className="">
								<form >
									<div className="modal-header">
										<h4 className="modal-title fs-20">Add Contact</h4>
										<button type="button" className="btn-close" onClick={()=> setAddCard(false)} data-dismiss="modal"><span></span></button>
									</div>
									<div className="modal-body">
										<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
										<div className="add-contact-box">
											<div className="add-contact-content">
												<div className="image-placeholder">	
													<div className="avatar-edit">
														<input type="file" onChange={fileHandler} id="imageUpload" 															
														/> 					
														<label htmlFor="imageUpload" name=''  ></label>
													</div>
													<div className="avatar-preview">
														<div id="imagePreview">
															<img id="saveImageFile" src={file? URL.createObjectURL(file) : user} 
																alt={file? file.name : null}
															/>
														</div>
													</div>
												</div> 
												 <div className="form-group">
													<label className="text-black font-w500">Customer Id</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="bankName" required="required"
															onChange={handleAddFormChange}
															placeholder="bankname"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												<div className="form-group">
													<label className="text-black font-w500">Deadline Date</label>
													<div className="contact-name">
														<input type="text"  className="form-control"  autocomplete="off"
															name="subTitle" required="required"
															onChange={handleAddFormChange}
															placeholder="subtitle"
														/>
														<span className="validation-text"></span>
													</div>
												</div>
												
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>   
										<button type="button" onClick={()=> setAddCard(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
									</div>
								</form>
								
							</div>
						</div>
					</Modal>
					<Modal className="modal fade"  show={editModal} onHide={setEditModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Add Contact</h4>
									<button type="button" className="btn-close" onClick={()=> setEditModal(false)} data-dismiss="modal"><span></span></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
									<div className="add-contact-box">
										<div className="add-contact-content">
                                           
											<div className="form-group">
												<label className="text-black font-w500">Customer Id</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="bankName" required="required"
                                                        value={editFormData.bankName}
                                                        onChange={handleEditFormChange}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group">
												<label className="text-black font-w500">Deadline Date</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="subTitle" required="required"
                                                        value={editFormData.subTitle}
                                                        onChange={handleEditFormChange}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                          
										</div>
									</div>
								</div>
								<div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={handleEditFormSubmit}>Save</button>  
                                    <button type="button" onClick={()=> setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
								</div>
							</form>
                            
						</div>
					</div>
				</Modal>
					<Dropdown className="d-inline-block">
						<Dropdown.Toggle variant="" as="div" className="btn btn-outline-primary btn-rounded btn-md ">{country1}</Dropdown.Toggle>
						<Dropdown.Menu >
							<Dropdown.Item onClick={() => setCountry1("Newest")}>Newest</Dropdown.Item>
							<Dropdown.Item onClick={() => setCountry1("Oldest")}>Oldest</Dropdown.Item>
							<Dropdown.Item onClick={() => setCountry1("Neweset")}>Newest</Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="card-body pb-0">
					{contacts.map((contact,index)=>(
						<div className="d-flex mb-3 border-bottom justify-content-between flex-wrap align-items-center" key={index}>
							<div className="d-flex pb-3 align-items-center">
							
								<img src={contact.image} alt="" className="rounded me-3 card-list-img" width="130" /> 
								<div className="me-3">
									<p className="fs-14 mb-1">Card Type</p>
									<span className="text-black font-w500">{contact.subTitle}</span>
								</div>
							</div>
							<div className="me-3 pb-3">
								<p className="fs-14 mb-1">Bank</p>
								<span className="text-black font-w500">{contact.bankName}</span>
							</div>
							<div className="me-3 pb-3">
								<p className="fs-14 mb-1">Card Number</p>
								<span className="text-black font-w500">**** **** **** 2256</span>
							</div>
							<div className="me-3 pb-3">
								<p className="fs-14 mb-1">Namein Card</p>
								<span className="text-black font-w500">Franklin Jr.</span>
							</div>
							<Link to={"#"} className="fs-14 btn-link me-3 pb-3">See Number</Link>
							<Dropdown className="dropdown pb-3">
								<Dropdown.Toggle variant="" as="div" className="btn-link i-false" >	
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757"   ></path>
										<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757"   ></path>
										<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757"   ></path>
									</svg>
								</Dropdown.Toggle>	
								<Dropdown.Menu className="dropdown-menu-right" >
									<Dropdown.Item className="text-danger" onClick={()=>handleDeleteClick(contact.id)}
										>Delete 
									</Dropdown.Item>
									<Dropdown.Item 
										onClick={(event) => handleEditClick(event, contact)}
										>Edit 
									</Dropdown.Item>		
								</Dropdown.Menu>			
							</Dropdown>
						</div>
					))}
				</div>
			</div>	
		</>
	)
}
export default CardsList;	
		