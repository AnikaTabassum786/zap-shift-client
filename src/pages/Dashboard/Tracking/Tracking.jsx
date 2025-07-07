import React, { useState } from 'react';

import { format } from 'date-fns';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

  const handleSearch = async () => {
    if (!trackingId) return;

    try {
      setLoading(true);
      setError('');
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      setTrackingData(res.data);
    } catch (err) {
      console.error(err);
      setError('Tracking ID not found or server error.');
      setTrackingData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">Track Your Parcel</h2>

      <div className="flex gap-4">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter your tracking ID (e.g. PCL-20250707-FG52A)"
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary text-black">
          Search
        </button>
      </div>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {trackingData.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">Tracking History</h3>
          <ul className="timeline timeline-vertical">
            {trackingData.map((item, idx) => (
              <li key={idx}>
                <div className="timeline-start">{format(new Date(item.timestamp), 'PPPpp')}</div>
                <div className="timeline-middle bg-primary"></div>
                <div className="timeline-end text-base">
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Details:</strong> {item.details}</p>
                  <p><strong>Updated By:</strong> {item.updated_by}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {trackingData.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400">Enter a tracking ID to see updates.</p>
      )}
    </div>
  );
};

export default Tracking;
