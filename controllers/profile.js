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
  const getAvatar = async (req, res) => {
    const { id } = req.params;
    try {
      const avatar = await db.Avatars.findOrCreate({
        where: {
          userId: id,
        },
      });
      res.send(avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAvatar = async (req, res) => {
    console.log(req.file);
    const { id } = req.params;
    try {
      const avatar = await db.Avatars.update(
        { photo: req.body.photo, link: req.file.location },
        {
          where: {
            userId: id,
          },
        }
      );
      res.send(avatar);
      console.log(avatar);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    findProfileDetails,
    updateDetails,
    getAvatar,
    uploadAvatar,
  };
}
