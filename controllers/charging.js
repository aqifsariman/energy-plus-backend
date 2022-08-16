export default function initChargingController(db) {
  const getChargingPorts = async (req, res) => {
    try {
      const chargePorts = await db.ChargingPoint.findAll();
      res.send(chargePorts);
    } catch (error) {
      console.log(error);
    }
  };
  return { getChargingPorts };
}
