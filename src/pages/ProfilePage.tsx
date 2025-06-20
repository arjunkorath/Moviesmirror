import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Heart, 
  Clock, 
  Star,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/UseAuth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleSave = () => {
    // Here you would typically update the user's profile
    console.log('Saving profile changes:', { name: editedName });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  // Mock data for demonstration
  const stats = [
    { label: 'Movies Watched', value: '127', icon: Star },
    { label: 'TV Shows', value: '23', icon: Clock },
    { label: 'Favorites', value: '45', icon: Heart },
    { label: 'Watch Time', value: '284h', icon: Calendar },
  ];

  const recentActivity = [
    { title: 'The Dark Knight', type: 'movie', action: 'watched', time: '2 hours ago' },
    { title: 'Breaking Bad', type: 'tv', action: 'added to favorites', time: '1 day ago' },
    { title: 'Inception', type: 'movie', action: 'rated 5 stars', time: '3 days ago' },
    { title: 'Stranger Things', type: 'tv', action: 'watched S4E1', time: '1 week ago' },
  ];

  return (
    <div className="container-custom py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <div className="liquid-glass-card rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full liquid-glass-strong flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="liquid-glass text-2xl font-bold sf-pro-display text-white bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg px-3 py-1"
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 liquid-glass rounded-xl apple-hover text-green-400"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 liquid-glass rounded-xl apple-hover text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold sf-pro-display text-white">
                      {user?.name || 'Movie Enthusiast'}
                    </h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 liquid-glass rounded-xl apple-hover text-white/70 hover:text-white"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-white/70 mb-4">
                <Mail className="w-4 h-4 mr-2" />
                <span className="sf-pro-text">{user?.email}</span>
              </div>
              
              <div className="flex items-center text-white/70">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="sf-pro-text">Member since December 2024</span>
              </div>
            </div>

            {/* Settings Button */}
            <motion.button
              className="liquid-glass-strong rounded-2xl p-3 apple-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="liquid-glass-card rounded-2xl p-6 text-center apple-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white sf-pro-display mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/70 sf-pro-text">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          className="liquid-glass-card rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold sf-pro-display text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between liquid-glass rounded-2xl p-4 apple-hover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 liquid-glass-strong rounded-xl flex items-center justify-center">
                    {activity.type === 'movie' ? (
                      <Star className="w-6 h-6 text-yellow-400" />
                    ) : (
                      <Clock className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold sf-pro-text">
                      {activity.title}
                    </div>
                    <div className="text-white/70 text-sm sf-pro-text">
                      {activity.action}
                    </div>
                  </div>
                </div>
                <div className="text-white/50 text-sm sf-pro-text">
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button className="liquid-glass-card rounded-2xl p-6 apple-hover text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <div className="text-white font-semibold sf-pro-text">My Favorites</div>
            <div className="text-white/70 text-sm sf-pro-text mt-1">View saved content</div>
          </button>
          
          <button className="liquid-glass-card rounded-2xl p-6 apple-hover text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-white font-semibold sf-pro-text">Watch Later</div>
            <div className="text-white/70 text-sm sf-pro-text mt-1">Continue watching</div>
          </button>
          
          <button className="liquid-glass-card rounded-2xl p-6 apple-hover text-center">
            <Settings className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <div className="text-white font-semibold sf-pro-text">Settings</div>
            <div className="text-white/70 text-sm sf-pro-text mt-1">Manage preferences</div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
