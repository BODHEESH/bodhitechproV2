'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserCircle2,
  Mail,
  Phone,
  LogOut,
  Loader2,
  Calendar,
  BookOpen,
  Edit,
  Trash2,
  AlertCircle,
  Settings,
  Upload,
  Camera
} from 'lucide-react';
import toast from 'react-hot-toast';
import Switch from '../components/Switch';

interface Question {
  _id: string;
  title: string;
  difficulty: string;
  language: string;
  createdAt: string;
  description: string;
  answer?: string;
  tags?: string[];
  subQuestions?: Array<{
    question: string;
    answer: string;
  }>;
  userInfo?: {
    name: string;
    email: string;
  };
}

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
  bio?: string;
  preferences?: {
    emailNotifications: boolean;
    darkMode: boolean;
    language: string;
  };
  avatar?: string;
}

interface EditForm {
  name: string;
  bio: string;
  phoneNumber: string;
}

interface Settings {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('contributions');
  const [editForm, setEditForm] = useState<EditForm>({
    name: '',
    bio: '',
    phoneNumber: ''
  });
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: false,
    darkMode: false,
    language: ''
  });
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        bio: user.bio || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const data = await response.json();
      setUser(data.user);
      setQuestions(data.questions);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/auth/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete question');

      toast.success('Question deleted successfully');
      setQuestions(questions.filter(q => q._id !== questionId));
      setShowDeleteConfirm(null);
    } catch (error) {
      toast.error('Failed to delete question');
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setAvatarLoading(true);
      const base64 = await convertToBase64(file);
      
      const formData = new FormData();
      formData.append('avatar', base64 as string);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update avatar');
      
      setUser(prev => prev ? { ...prev, avatar: base64 as string } : null);
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Failed to update avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name || undefined,
          bio: editForm.bio || undefined
        })
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const data = await response.json();
      setUser(prev => ({ ...prev!, ...data.user }));
      toast.success('Profile updated successfully');
      setActiveTab('contributions');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordForm)
      });

      if (!response.ok) throw new Error('Failed to update password');

      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background pt-20 pb-10">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Profile Header with Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-8 rounded-2xl border border-border shadow-xl mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-primary">
                  <UserCircle2 className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                disabled={avatarLoading}
              />
              {avatarLoading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <button
                  onClick={() => setActiveTab('edit')}
                  className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </div>
                {user?.phoneNumber && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {user.phoneNumber}
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(user?.createdAt || '').toLocaleDateString()}
                </div>
                {user?.bio && (
                  <p className="text-muted-foreground mt-2">{user.bio}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('settings')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </motion.button>
            </div>
          </div>

          {/* Settings Tabs */}
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('contributions')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'contributions'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10'
                }`}
              >
                Contributions
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10'
                }`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10'
                }`}
              >
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Form */}
        {activeTab === 'edit' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-2xl border border-border shadow-xl mb-6"
          >
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 h-24"
                  placeholder="Tell us about yourself..."
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                  className="w-full p-2 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div> */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-primary text-primary-foreground"
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Settings Panel */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-2xl border border-border shadow-xl mb-6"
          >
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new questions and answers
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(checked) =>
                        setSettings({ ...settings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onChange={(checked) =>
                        setSettings({ ...settings, darkMode: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Security</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          currentPassword: e.target.value
                        })
                      }
                      className="w-full p-2 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value
                        })
                      }
                      className="w-full p-2 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value
                        })
                      }
                      className="w-full p-2 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePasswordUpdate}
                    className="px-6 py-2 rounded-xl bg-primary text-primary-foreground"
                  >
                    Update Password
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contributions Section */}
        {activeTab === 'contributions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-8 rounded-2xl border border-border shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Your Contributions
              </h2>
              <Link
                href="/add-question"
                className="px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-2"
              >
                Add Question
              </Link>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  You haven't contributed any questions yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <motion.div
                    key={question._id}
                    layout
                    className="p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/community-question/${question._id}`}
                          className="text-lg font-medium hover:text-primary transition-colors line-clamp-1"
                        >
                          {question.title}
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {question.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs">
                            {question.language}
                          </span>
                          <span className="px-2 py-1 rounded-lg bg-orange-500/10 text-orange-500 text-xs">
                            {question.difficulty}
                          </span>
                          {question.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-lg bg-muted text-muted-foreground text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          <span className="text-xs text-muted-foreground">
                            {new Date(question.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/edit-question/${question._id}`}
                          className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setShowDeleteConfirm(question._id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Delete Confirmation */}
                    <AnimatePresence>
                      {showDeleteConfirm === question._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-4 border-t border-border"
                        >
                          <p className="text-sm text-muted-foreground mb-4">
                            Are you sure you want to delete this question? This action cannot be undone.
                          </p>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(question._id)}
                              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
