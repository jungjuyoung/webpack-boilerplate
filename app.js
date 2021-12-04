import axios from 'axios';
// const ALERT = (msg) => window.alert(msg)

// const foo = '';
// console.log(foo);

document.addEventListener('DOMContentLoaded', async () => {
  const res = await axios.get('/api/users');
  console.log(res);
});
