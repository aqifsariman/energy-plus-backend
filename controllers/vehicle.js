/* eslint-disable quotes */
export default function initVehicleController(db) {
  const findVehicleDetails = async (req, res) => {
    const userId = req.params.id;
    try {
      const vehicleDetails = await db.VehicleDetails.findOrCreate({
        where: {
          userId,
        },
      });
      res.send(vehicleDetails);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  const updateVehicleDetails = async (req, res) => {
    const userId = req.params.id;
    try {
      const vehicleDetails = await db.VehicleDetails.update(
        {
          brand: req.body.brand,
          model: req.body.model,
          licensePlate: req.body.licensePlate,
          connector: req.body.connector,
        },
        {
          where: {
            userId,
          },
        }
      );
      console.log(vehicleDetails);
      res.send(vehicleDetails);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  return {
    findVehicleDetails,
    updateVehicleDetails,
  };
}
