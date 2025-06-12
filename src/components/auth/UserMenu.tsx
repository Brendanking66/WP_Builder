import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import AuthModal from './AuthModal';

interface UserMenuProps {
  user: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
  };

  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <User size={18} className="mr-2" />
          Sign In
        </button>
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">{user.email}</span>
      <button
        onClick={handleSignOut}
        className="btn-outline flex items-center py-1 px-3"
      >
        <LogOut size={18} className="mr-2" />
        Sign Out
      </button>
    </div>
  );
};

export default UserMenu;