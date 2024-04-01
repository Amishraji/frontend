import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbardept';

export default function Home() {

    const [department, setdepartment] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        loaddepartment();
    },[]);

    const loaddepartment = async()=>{
      const token = sessionStorage.getItem('token');
        
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
        const result = await axios.get("http://backend2.route53testdemo.fun/departments");
        setdepartment(result.data);
    };

    const deletedepartment = async(id)=>{
      const token = sessionStorage.getItem('token');
    
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
        try{
        await axios.delete(`http://backend2.route53testdemo.fun/department/${id}`,config)
        loaddepartment();
        }catch (error) {
          console.error('An error occurred while updating employee:', error);
          if (error.response && error.response.status === 403) {
              // Unauthorized access
              alert("Unauthorized access");
          }
    }
  }

  return (
    <>
        <Navbar />
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">Sno.</th>
      <th scope="col">Department Name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {
        department.map((department, index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{department.deptName}</td>
            <td>{department.description}</td>
            <td>
               
                <Link className='btn btn-outline-primary mx-2'
                to={`/editdepartment/${department.id}`}>Edit</Link>
                <button className='btn btn-danger mx-2'
                onClick = {() => deletedepartment(department.id)}
                >Delete</button>
            </td>
          </tr>
        ))
    }
  
  </tbody>
</table>
 </div>
  </div>
  <Link className='btn btn-outline-primary mx-2' to="../">
                            Back
          </Link>
  <Link className='btn btn-outline-danger mx-2' to="/..">
                           Logout
                        </Link>
    </>
  )
}
