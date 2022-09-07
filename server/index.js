import db from '../models/index.mjs';
import express from 'express';
import initUserController from '../controllers/userAuth.mjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import initProfileController from '../controllers/profile.js';
import initVehicleController from '../controllers/vehicle.js';
import initWalletController from '../controllers/wallet.js';
import initStripeController from '../controllers/payment.js';
import initChargingController from '../controllers/charging.js';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3-v2';
import multer from 'multer';
import 'dotenv/config';

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});
// set the name of the upload directory here
const multerUpload = multer({
  storage: multerS3({
    s3,
    bucket: 'energy-plus-avatar',
    acl: 'public-read',
    metadata: (request, file, callback) => {
      callback(null, { fieldName: file.fieldname });
    },
    key: (request, file, callback) => {
      callback(null, Date.now().toString());
    },
  }),
});

const UsersController = initUserController(db);
const ProfileController = initProfileController(db);
const VehicleController = initVehicleController(db);
const WalletController = initWalletController(db);
const StripeController = initStripeController();
const ChargingController = initChargingController(db);
// const LocationsController = initLocationsController(db);
// const NotificationsController = initNotificationsController(db);

const PORT = process.env.PORT || 3004;

const app = express();
const corsOptions = {
  origin: 'https://supercharger-8f8ac.web.app',
  credentials: true,
};
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOptions));
app.use(express.static('uploads'));

// AUTHORIZATION
app.post('/register', UsersController.createUser);
app.post('/login', UsersController.login);
app.delete('/logout', UsersController.logout);
app.get('/avatar/:id', ProfileController.getAvatar);
app.post(
  '/avatar-upload/:id',
  multerUpload.single('photo'),
  ProfileController.uploadAvatar
);

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
app.post('/card-update/:customerId', StripeController.updateCard);
app.get('/get-card/:customerId', StripeController.getCard);
app.get(
  '/payment-method/:customerId',
  StripeController.retrieveCustomerPaymentMethod
);
app.post('/payment-saved-card', StripeController.existingCardPayment);

//CHARGING ACTIVITIES
app.get('/get-charging-ports', ChargingController.getChargingPorts);
app.post('/new-charge', ChargingController.newCharge);
app.get('/charge-info/:userId', ChargingController.chargeInfo);
app.put('/end-charge', ChargingController.endOfCharge);

// Listening on port
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
