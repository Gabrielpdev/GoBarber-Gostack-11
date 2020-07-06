import React from 'react';
import { View } from 'react-native';

import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
};

export default Dashboard;
