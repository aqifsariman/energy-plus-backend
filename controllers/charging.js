export default function initChargingController(db) {
  const getChargingPorts = async (req, res) => {
    try {
      const chargePorts = await db.ChargingPoint.findAll();
      res.send(chargePorts);
    } catch (error) {
      console.log(error);
    }
  };

  const newCharge = async (req, res) => {
    const { id } = req.body;
    try {
      const chargeUpdate = await db.Charging.findOrCreate({
        where: {
          userId: id,
        },
        defaults: {
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      res.send(chargeUpdate);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const chargeInfo = async (req, res) => {
    const { userId } = req.params;
    try {
      const charge = await db.Charging.findAll({
        where: { userId },
      });
      res.send(charge);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const endOfCharge = async (req, res) => {
    const { electricityUsed, userId } = req.body;
    try {
      const chargeStop = await db.Charging.update(
        {
          status: false,
          electricityUsed,
          updatedAt: new Date(),
        },
        {
          where: {
            userId,
          },
        }
      );
      res.send(chargeStop);
    } catch (error) {
      console.log('Error', error);
    }
  };
  return { getChargingPorts, newCharge, chargeInfo, endOfCharge };
}
