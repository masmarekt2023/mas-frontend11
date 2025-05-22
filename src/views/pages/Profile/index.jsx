import React from 'react';
import { Box } from '@mui/material';
import Profile from './Profile';
import UserProfileTabs from './Tabs';
import TopBar from '../../../layouts/TopBar/TopBar';

export default function UserProfile() {
  return (
    <Box>
      <TopBar />
      <Profile />
      <UserProfileTabs />
    </Box>
  );
}