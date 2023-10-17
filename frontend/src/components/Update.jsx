import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  // get single user data
  const getSingleUser = async () => {

    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      console.log("updated user ", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  // send updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const result = await response.json();
        console.log(result); // Log the entire result object when there's an error
        setError(result.error);
      }

      if (response.ok) {
        setError("");
        navigate("/all");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className='container my-2'>

      {error && <div className="alert alert-danger" role="alert">
        {error}
      </div>}

      <h2 className='text-center'>Edit the data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Update