import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Logindept = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="text-center mb-4">Select Management Type</h3>
              <div className="form-group">
              <Link className=" btn btn-outline"to ="/Homedepartment">Department Management</Link>
              <Link className=" btn btn-outline"to ="/Home">Employee Management</Link> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logindept;
