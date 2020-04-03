import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

export const useRequestCarChargingPoints = () => {
  const [carChargingPoints, setCarChargingPoints] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      axios.get(API_URL)
        .then(res => {
            setLoading(false);
            setCarChargingPoints(res.data);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        })
    };
    if (!carChargingPoints) fetchData();
  });

  return [{ carChargingPoints, loading, error }];
};