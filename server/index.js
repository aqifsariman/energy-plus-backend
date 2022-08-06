import db from '../models/index.mjs';
import express from 'express';
import initUserController from '../controllers/userAuth.mjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import initProfileController from '../controllers/profile.js';
import initVehicleController from '../controllers/vehicle.js';
import initWalletController from '../controllers/wallet.js';
import initStripeController from '../controllers/payment.js';
import 'dotenv/config';

// import initLocationsController from '../controllers/locations.mjs';
// import initNotificationsController from '../controllers/notifications.mjs';
// import initChargingController from '../controllers/charging.mjs';

const UsersController = initUserController(db);
const ProfileController = initProfileController(db);
const VehicleController = initVehicleController(db);
const WalletController = initWalletController(db);
const StripeController = initStripeController();
// const LocationsController = initLocationsController(db);
// const NotificationsController = initNotificationsController(db);
// const ChargingController = initChargingController(db);

const PORT = process.env.PORT || 3004;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
const YOUR_DOMAIN = 'http://localhost:3004';
// AUTHORIZATION
app.post('/register', UsersController.createUser);
app.post('/login', UsersController.login);
app.delete('/logout', UsersController.logout);
// USER DETAILS CHANGES
app.get('/profile/:id/get-details', ProfileController.findProfileDetails);
app.post('/profile/:id/user-details', ProfileController.updateDetails);
// VEHICLES CHANGES
app.get('/profile/:id/get-vehicles', VehicleController.findVehicleDetails);
app.post('/profile/:id/user-vehicles', VehicleController.updateVehicleDetails);
// WALLET CHANGES
app.get('/wallet-details/:id', WalletController.findWalletDetails);
app.post('/wallet-details/:id', WalletController.updateWalletDetails);
// STRIPE CHANGES
app.get('/payment/:customerId', StripeController.getCustomer);
app.post('/payment/customer/:username', StripeController.createCustomer);
app.post('/payment/:customerName', StripeController.payment);
app.post('/card-update/:customerId', StripeController.updateCard);
app.get('/get-card/:customerId', StripeController.getCard);

// Listening on port
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
