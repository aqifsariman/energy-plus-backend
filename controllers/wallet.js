/* eslint-disable quotes */
export default function initWalletController(db) {
  const findWalletDetails = async (req, res) => {
    const userId = req.params.id;
    try {
      const walletDetails = await db.Wallet.findOrCreate({
        where: {
          userId,
        },
      });
      res.send(walletDetails);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  const updateWalletDetails = async (req, res) => {
    const userId = req.params.id;
    const { customerId } = req.body;
    try {
      const walletDetails = await db.Wallet.update(
        {
          customerId,
        },
        {
          where: {
            userId,
          },
        }
      );
      res.send(walletDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    findWalletDetails,
    updateWalletDetails,
  };
}
