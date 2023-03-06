const saveData = (key, user) => {
  localStorage.setItem(key, JSON.stringify(user));
};

const getData = (key) => JSON.parse(localStorage.getItem(key));

export default {
  saveData,
  getData,
};
