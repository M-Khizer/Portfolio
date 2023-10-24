const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config();
console.log(process.env.TOKEN_KEY);

const app = express();
app.use(express.json())

const adminRoutes = require('./router/adminRouter');

app.use('/api',adminRoutes);

const PORT =  process.env.PORT || 5000;
const URI = 'mongodb+srv://muhammadkhizer:khizer123portfolio@portfolio.dzs0wtu.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
    // You can start your application logic here.
  });


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})




