
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './crudOperation.css';

function CrudOperation() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    username: '',
    password: '',
    age: 0,
    ssn: '',
    city: '',
    email: '',
    phone: '',
    balance: 0.0
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('http://localhost:8882/admin/getAll') // Changed endpoint to match the backend
      .then(response => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setLoading(false);
      });
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateCustomer = () => {
    axios.put(`http://localhost:8881/customers/update/${formData.id}`, formData)
      .then(() => {
        fetchCustomers(); // Fetch updated data
        setEditingCustomer(null);
        setFormData({
          id: '',
          name: '',
          address: '',
          username: '',
          password: '',
          age: 0,
          ssn: '',
          city: '',
          email: '',
          phone: '',
          balance: 0.0
        });
      })
      .catch(error => {
        console.error('Error updating customer:', error);
      });
  };

  const handleDeleteCustomer = (id) => {
    axios.delete(`http://localhost:8882/admin/delete/${id}`)
      .then(() => {
        fetchCustomers(); // Fetch updated data
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
      });
  };

  const handleAddCustomer = () => {
    // Implement logic to add customer
    axios.post('http://localhost:8882/admin/add', formData)
      .then(() => {
        fetchCustomers(); // Fetch updated data
        setFormData({
          id: '',
          name: '',
          address: '',
          username: '',
          password: '',
          age: 0,
          ssn: '',
          city: '',
          email: '',
          phone: '',
          balance: 0.0
        });
      })
      .catch(error => {
        console.error('Error adding customer:', error);
      });
  };

  return (
    <div className="App">
      <h1>Customer List</h1>
      <button onClick={() => setEditingCustomer({})}>Add Customer</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Username</th>
                <th>Password</th>
                <th>Age</th>
                <th>SSN</th>
                <th>City</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.username}</td>
                  <td>{customer.password}</td>
                  <td>{customer.age}</td>
                  <td>{customer.ssn}</td>
                  <td>{customer.city}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.balance}</td>
                  <td>
                    <button onClick={() => handleEditCustomer(customer)}>Edit</button>
                    <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingCustomer && (
            <div>
              <h2>{editingCustomer.id ? 'Edit Customer' : 'Add Customer'}</h2>
              <form>
                <div>
                  <label>ID: </label>
                  <input type="text" name="id" value={formData.id} disabled />
                </div>
                <div>
                  <label>Name: </label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Address: </label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Username: </label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Password: </label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Age: </label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                </div>
                <div>
                  <label>SSN: </label>
                  <input type="text" name="ssn" value={formData.ssn} onChange={handleInputChange} />
                </div>
                <div>
                  <label>City: </label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Email: </label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Phone: </label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <label>Balance: </label>
                  <input type="number" name="balance" value={formData.balance} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={editingCustomer.id ? handleUpdateCustomer : handleAddCustomer}>
                  {editingCustomer.id ? 'Update' : 'Add'}
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CrudOperation;
