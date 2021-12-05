// const ALERT = (msg) => window.alert(msg)
import axios from 'axios';

axios.get('/api/users', (req, res) => {
  console.log(req.data);
  console.log(res.data);
  // let foo = req.data;
});
