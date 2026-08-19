// Frontend demo participants utility matching server definitions
export const demoParticipants = [
  { id: 'demo-1', name: 'Rahul Sharma', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-2', name: 'Priya Patel', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-3', name: 'Arjun Mehta', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-4', name: 'Sneha Kapoor', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-5', name: 'Aman Khan', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-6', name: 'Neha Gupta', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-7', name: 'Rohan Verma', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-8', name: 'Anjali Singh', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-9', name: 'Karan Patel', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-10', name: 'Pooja Shah', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-11', name: 'Vikram Malhotra', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-12', name: 'Divya Nair', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-13', name: 'Sameer Joshi', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-14', name: 'Kavita Reddy', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-15', name: 'Aditya Roy', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-16', name: 'Meera Iyer', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-17', name: 'Deepak Choudhary', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-18', name: 'Shweta Tiwari', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-19', name: 'Manish Pandey', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-20', name: 'Ritu Sen', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-21', name: 'Siddharth Rao', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-22', name: 'Tanvi Deshmukh', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-23', name: 'Gaurav Bhatia', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-24', name: 'Ishita Banerjee', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-25', name: 'Naveen Kumar', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-26', name: 'Swati Kulkarni', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-27', name: 'Harsh Vardhan', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-28', name: 'Payal Agarwal', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-29', name: 'Alok Mishra', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-30', name: 'Rashmi Saxena', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-31', name: 'Abhishek Chatterjee', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-32', name: 'Komal Chauhan', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-33', name: 'Tarun Mathur', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-34', name: 'Sunita Ghosh', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-35', name: 'Rajesh Nambiar', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-36', name: 'Bhavna Goswami', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-37', name: 'Varun Grover', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-38', name: 'Pallavi Jain', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true },
  { id: 'demo-39', name: 'Kunal Trivedi', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: false },
  { id: 'demo-40', name: 'Aakriti Sharma', role: 'participant', isDemo: true, isAudioMuted: true, isVideoMuted: true }
];

export const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const AVATAR_COLORS = [
  'from-blue-600 to-indigo-600',
  'from-purple-600 to-pink-600',
  'from-emerald-600 to-teal-600',
  'from-amber-600 to-orange-600',
  'from-rose-600 to-red-600',
  'from-cyan-600 to-blue-600',
  'from-violet-600 to-purple-600',
];

export const getAvatarColor = (name) => {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};
