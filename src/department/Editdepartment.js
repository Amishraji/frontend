import axios from 'axios'
import React,{ useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Editdepartment() {
    let navigate=useNavigate()

    const {id} =useParams()

    const [department, setdepartment]=useState({
        deptName:"",
        description:""
    })

    const { deptName, description}= department
    useEffect(()=>{
        loaddepartment()
    },[]);

    const onInputChange=(e)=>{
        setdepartment({...department, [e.target.name]:e.target.value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();

        const token = sessionStorage.getItem('token');

        // Set token as Authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try{
        await axios.put(`http://backend2.route53testdemo.fun/department/${id}`,department, config)
        navigate("/Homedepartment")
        }catch (error) {
            console.error('An error occurred while updating employee:', error);
            if (error.response && error.response.status === 403) {
                // Unauthorized access
                alert("Unauthorized access");
            }
        }
    }

    const loaddepartment =async()=>{
        const token = sessionStorage.getItem('token');
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const result = await axios.get(`http://backend2.route53testdemo.fun/department/${id}`,config)
        setdepartment(result.data);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className="text-center m-4">Edit Department</h2>
        
            <form onSubmit={(e)=>onSubmit(e)}>

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
            <Link className='btn btn-outline-danger mx-2' to ="/Homedepartment">
                Cancel
            </Link>
            <Link className='btn btn-outline-danger mx-2' to="/Homedepartment">
                            Back
                        </Link>
            </form>
            </div>    
        </div>
    </div>
  )
}
