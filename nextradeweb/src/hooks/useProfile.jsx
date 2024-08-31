import { useState, useEffect } from 'react';
import ProfileService from '../service/profileService.jsx';

const useProfile = (userType, userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        let response;
        if (userType === 'client') {
          response = await ProfileService.getClientProfile(userId);
        } else if (userType === 'seller') {
          response = await ProfileService.getSellerProfile(userId);
        } else if (userType === 'supplier') {
          response = await ProfileService.getSupplierProfile(userId);
        }
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userType, userId]);

  return { profile, loading, error, setProfile };
};

export default useProfile;
