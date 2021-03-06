const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { updateOneContact } = require("@/models/userModels/userModelFunctions");

const editContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body,
      body: { firstName, lastName },
      currentUser,
    } = req;

    const targetCellphone = userPropsUtilities.makeCellphoneByObjectParam(body);

    const editedValues = { firstName, lastName };

    await updateOneContact(currentUser, targetCellphone, editedValues);

    res.checkDataAndResponse({
      editedContact: { ...targetCellphone, ...editedValues },
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
