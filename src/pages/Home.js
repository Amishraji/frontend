import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

export default function Home() {

    const [employees, setEmployees] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        loadEmployees();
    },[]);

    const loadEmployees = async()=>{
      const token = sessionStorage.getItem('token');
        
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
        const result = await axios.get("http://backend.route53testdemo.fun/employees",config);
        setEmployees(result.data);
    };

   
    const deleteEmployee = async(id)=>{
      const token = sessionStorage.getItem('token');

      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
      try{
        await axios.delete(`http://backend.route53testdemo.fun/employee/${id}`,config)
        loadEmployees();
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
      <th scope="col">Name</th>
      <th scope="col">Department</th>
      <th scope="col">Income</th>
      <th scope="col">Address</th>
      <th scope="col">Designation</th>
      <th scope="col">Gender</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  
    {
        employees.map((employee, index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{employee.name}</td>
            <td>{employee.dept}</td>
            <td>{employee.income}</td>
            <td>{employee.address}</td>
            <td>{employee.designation}</td>
            <td>{employee.gender}</td>
            <td>{employee.email}</td>

            <td>
                 
                <Link className='btn btn-outline-primary mx-2'
                to={`/editemployee/${employee.id}`}>Edit</Link>
                <button className='btn btn-danger mx-2'
                onClick = {() => deleteEmployee(employee.id)}
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
