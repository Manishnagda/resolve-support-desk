import app from './app.js';
app.listen(process.env.PORT || 3001,()=>console.log('Resolve API: http://localhost:'+(process.env.PORT || 3001)));
