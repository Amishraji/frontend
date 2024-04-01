import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function AddEmployee() {
    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        dept: "",
        income: "",
        address: "",
        designation: "",
        gender: "",
        email:""
    });

    const { name, dept, income, address, designation, gender, email } = employee;

    const onInputChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
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
        await axios.post("http://backend.route53testdemo.fun/employee", employee, config);
        navigate("/Home");
        }catch (error) {
            console.error('An error occurred while updating employee:', error);
            if (error.response && error.response.status === 403) {
                // Unauthorized access
                alert("Unauthorized access");
            }
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className="text-center m-4">Register Employee</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Name' name="name"
                                value={name} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='dept' className='form-label'>Department</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Department' name="dept"
                                value={dept} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='income' className='form-label'>Income</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Income' name="income"
                                value={income} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='address' className='form-label'>Address</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Address' name="address"
                                value={address} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='designation' className='form-label'>Designation</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Designation' name="designation"
                                value={designation} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='gender' className='form-label'>Gender</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Gender' name="gender"
                                value={gender} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type="text" className='form-control'
                                placeholder='Enter Email' name="email"
                                value={email} onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/Home">
                            Cancel
                        </Link>
                        <Link className='btn btn-outline-danger mx-2' to="/Home">
                            Back
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
