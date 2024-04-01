import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Adddepartment() {
    let navigate = useNavigate();

    const [department, setdepartment] = useState({
        deptName:"",
        description:""
    });

    const { deptName, description } = department;

    const onInputChange = (e) => {
        setdepartment({ ...department, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try{
        await axios.post("http://backend2.route53testdemo.fun/department", department, config);
        navigate("/Homedepartment");
        }catch (error) {
            console.error('An error occurred while updating employee:', error);
            if (error.response && error.response.status === 403) {
          
                alert("Unauthorized access");
            }
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className="text-center m-4">Register Department</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                        <label htmlFor='deptName' className='form-label'>Department Name</label>
                        <input type ={"text"} className='form-control' 
                        placeholder='Enter Department Name' name="deptName" 
                        value={deptName} onChange={(e)=>onInputChange(e)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <input type ={"text"} className='form-control' 
                        placeholder='Enter Description' name="description" 
                        value={description} onChange={(e)=>onInputChange(e)}/>
                    </div>
                        <button type="submit" className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/Homedepartment">
                            Cancel
                        </Link>
                        <Link className='btn btn-outline-secondary mx-2' to="/Homedepartment">
                            Back
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
