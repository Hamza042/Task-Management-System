import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useGetUserProfileQuery, useSetUserProfileMutation } from '../redux/api/userApi';
import { UserProfileSchema } from '../Schemas/UserProfileSchema';
import { setUserProfile } from '../redux/slices/UserSlice';

const defaultAvatar = '/path/to/default/avatar.png'; // Path to your default avatar image

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.user.id);
  const username = useAppSelector((state: RootState) => state.user.username);
  const email = useAppSelector((state: RootState) => state.user.email);
  const { data: userProfile, error, isLoading } = useGetUserProfileQuery(userId || '');
  const [updateUserProfile] = useSetUserProfileMutation();
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (userProfile) {
      dispatch(setUserProfile(userProfile));
      setSelectedTeam(userProfile.teamId || null);
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsData = [
        { id: 1, name: 'Team A' },
        { id: 2, name: 'Team B' },
        { id: 3, name: 'Team C' },
      ];
      setTeams(teamsData);
    };

    fetchTeams();
  }, []);

  const handleUpdateProfile = async (updatedProfile: Partial<UserProfileSchema>) => {
    try {
      const result = await updateUserProfile({ userId: userId!, ...updatedProfile }).unwrap();
      dispatch(setUserProfile(result));
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = parseInt(event.target.value, 10);
    setSelectedTeam(teamId);
    handleUpdateProfile({ teamId });
  };

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching user profile</div>;

  return (
    <div className="flex flex-col md:flex-row container mx-auto  p-6  bg-gray-100 rounded-lg shadow-lg">
      {/* Left Side - User Details Card */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0">
        <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
        <p className="mb-2"><strong>Name:</strong> {username}</p>
        <p className="mb-2"><strong>Email:</strong> {email}</p>
        <p className="mb-2"><strong>Phone:</strong> {userProfile?.phoneNumber || 'N/A'}</p>
        
        <div className="mb-4">
          <label htmlFor="team-select" className="block mb-2 text-gray-700 font-medium">Choose a team:</label>
          <select 
            id="team-select" 
            value={selectedTeam || ''} 
            onChange={handleTeamChange}
            className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a team</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Side - Profile Picture and Name */}
      <div className="flex-none md:w-2/3 flex flex-col items-center">
        <img 
          src={userProfile?.profilePictureUrl || defaultAvatar} 
          alt="Profile" 
          className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md mb-4" 
        />
        <h1 className="text-3xl font-semibold text-gray-800">{username}</h1>
      </div>
    </div>
  );
};

export default Profile;
