const generateId = () => {

  let id = "";
  let characters = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM";

  while(id.length < 20){
    const idx = Math.floor(Math.random() * characters.length);
    id += characters[idx];
  }

  return id;
};

export default generateId;