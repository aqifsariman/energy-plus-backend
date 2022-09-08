import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

// ----- MODELS ----- //
import usersModel from './users.mjs';
import userDetailsModel from './userDetails.mjs';
import vehiclesModel from './vehicles.mjs';
import walletsModel from './wallets.mjs';
import chargingPointsModel from './chargingPoints.mjs';
import avatarsModel from './avatar.mjs';
import chargingsModel from './chargings.mjs';
// import locationsModel from './locations.mjs';
// import notificationsModel from './notifications.mjs';
// import transactionsModel from './transactions.mjs';

const env = process.env.ENV || 'development';

const db = {};
let sequelize;

// If env is production, retrieve database auth details from the
// DATABASE_URL env var that Heroku provides us
// if (env === 'PRODUCTION') {
// // Break apart the Heroku database url and rebuild the configs we need
// const { DATABASE_URL } = process.env;
// const dbUrl = url.parse(DATABASE_URL);
// const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
// const password = dbUrl.auth.substr(
//   dbUrl.auth.indexOf(':') + 1,
//   dbUrl.auth.length
// );
// const dbName = dbUrl.path.slice(1);
// const host = dbUrl.hostname;
// const { port } = dbUrl;
// allConfig.host = host;
// allConfig.port = port;
sequelize = new Sequelize('energy_plus', 'postgres', 'default', allConfig);
// }

// If env is not production, retrieve DB auth details from the allConfig
// else {
//   sequelize = new Sequelize(
//     allConfig.database,
//     allConfig.username,
//     allConfig.password,
//     allConfig
//   );
// }

// ----- Models Relationship ----- //
db.User = usersModel(sequelize, Sequelize.DataTypes);
db.UserDetail = userDetailsModel(sequelize, Sequelize.DataTypes);
db.VehicleDetails = vehiclesModel(sequelize, Sequelize.DataTypes);
db.Wallet = walletsModel(sequelize, Sequelize.DataTypes);
db.ChargingPoint = chargingPointsModel(sequelize, Sequelize.DataTypes);
db.Avatars = avatarsModel(sequelize, Sequelize.DataTypes);
db.Charging = chargingsModel(sequelize, Sequelize.DataTypes);
// db.Notification = notificationsModel(sequelize, Sequelize.DataTypes);
// db.Transaction = transactionsModel(sequelize, Sequelize.DataTypes);

db.UserDetail.belongsTo(db.User);
db.User.hasMany(db.UserDetail);

db.VehicleDetails.belongsToMany(db.User, { through: 'user_vehicle' });
db.User.hasMany(db.VehicleDetails);

db.Wallet.belongsToMany(db.User, { through: 'user_wallet' });
db.User.hasMany(db.Wallet);

db.Avatars.belongsTo(db.User, { through: 'user_avatar' });
db.User.hasMany(db.Avatars);

db.Charging.belongsTo(db.User, { through: 'user_charging' });
db.User.hasMany(db.Charging);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
