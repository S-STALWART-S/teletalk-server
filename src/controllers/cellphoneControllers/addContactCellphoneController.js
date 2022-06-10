const { userProps } = require("@/classes/UserProps");

const {
  addContactToUserContacts,
} = require("@/models/userModels/userModelFunctions");

const addContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { body, currentUser } = req;
    const targetUserData = userProps.getContact(body);

    const { targetUser } = await addContactToUserContacts(
      currentUser,
      targetUserData
    );

    res.checkAndResponse({
      addedContact: {
        ...targetUserData,
        privateId: targetUser.privateId,
      },
    });
  } catch (error) {
    logger.log("addContactCellphoneController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { addContactCellphoneController };
