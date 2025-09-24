// In-memory data structure for users
let users = [];
let nextUserId = 1;

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // In production, hash the password
  }
}

// Functions for user management
export const getAllUsers = () => {
  return users;
};

export const addUser = (name, email, password) => {
  const user = new User(nextUserId++, name, email, password);
  users.push(user);
  return user;
};

export const confirmLogin = (email, password) => {
  return users.find(user => user.email === email && user.password === password);
};

export default User;
