// role.js
let role = "";

// role.js
export function setRole(role) {
  localStorage.setItem("usertype", role);
}

export function getRole() {
  // Retrieve the role from localStorage
  const role = localStorage.getItem("usertype");

  // Return the role or null if not found
  return role ? role : null;
}
