/* eslint-disable quotes */
export default function initProfileController(db) {
  const findProfileDetails = async (req, res) => {
    const userId = req.params.id;
    try {
      const userDetails = await db.UserDetail.findOrCreate({
        where: {
          userId,
        },
      });
      res.send(userDetails);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  const updateDetails = async (req, res) => {
    const userId = req.params.id;
    try {
      const userDetails = await db.UserDetail.update(
        {
          nickname: req.body.nickname,
          address: req.body.address,
          handphone: req.body.handphone,
        },
        {
          where: {
            userId,
          },
        }
      );
      console.log(userDetails);
      res.send(userDetails);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  return {
    findProfileDetails,
    updateDetails,
  };
}
