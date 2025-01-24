const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier l'heure
app.use((req, res, next) => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const hour = currentDate.getHours();
  
  // Vérifier si nous sommes pendant les heures ouvrables (du lundi au vendredi de 9h à 17h)
  if (day >= 1 && day <= 5 && hour >= 7 && hour < 17) {
    next(); // L'heure est valide, continuer le traitement de la requête
  } else {
    res.send("L'application est disponible uniquement pendant les heures ouvrables (9h-17h, du lundi au vendredi).");
  }
});

// Définir le moteur de vue
app.set('view engine', 'ejs');

// Servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Affiche la page d'accueil
});

app.get('/services', (req, res) => {
  res.render('services'); // Affiche la page des services
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Affiche la page de contact
});

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
