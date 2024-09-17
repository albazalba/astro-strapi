let user = null;
const listeners = new Set();

export const userStore = {
  getUser: () => user,
  setUser: (newUser) => {
    console.log("🚀 ~ newUser:", newUser)
    user = newUser;
    listeners.forEach(listener => listener(user));
  },
  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  logout: () => {
    localStorage.removeItem('token');
    user = null;
    listeners.forEach(listener => listener(user));
  }
};

// Initialize user from localStorage if available
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    // You might want to validate the token or fetch user data here
    // userStore.setUser({ token });
  }
}
