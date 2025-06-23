import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Nearby = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchNearby = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/food/nearby?lat=28.6139&lng=77.2090');
        setDonations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNearby();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Nearby Donations</h2>
      {donations.length === 0 ? (
        <p>No donations found nearby.</p>
      ) : (
        <div className="space-y-4">
          {donations.map((obj) => (
            <div key={obj._id} className="border p-4 rounded">
              <p><strong>{obj.foodType}</strong> • {obj.quantity}</p>
              <p>Pickup: {obj.address}</p>
              <p>Expires: {new Date(obj.expiryTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Nearby;
