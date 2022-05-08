const { cellphoneFinder } = require("@/functions/utilities/cellphoneFinder");
const {
  errorThrower,
  getErrorObject,
  getContact,
  getCellphone,
} = require("@/functions/utilities/utilsNoDeps");

const { UserMongoModel } = require("@/models/userModels/userMongoModel");

const {
  initialOptions: { userInitialOptions },
} = require("@/variables/constants/initialOptions/initialOptions");
const {
  userErrors: {
    properties: {
      BLACKLIST_ITEM_EXIST: { properties: BLACKLIST_ITEM_EXIST },
      BLACKLIST_ITEM_NOT_EXIST: { properties: BLACKLIST_ITEM_NOT_EXIST },
      CONTACT_ITEM_EXIST: { properties: CONTACT_ITEM_EXIST },
      CONTACT_ITEM_NOT_EXIST: { properties: CONTACT_ITEM_NOT_EXIST },
      TARGET_USER_NOT_EXIST: { properties: TARGET_USER_NOT_EXIST },
    },
  },
} = require("@/variables/errors/userErrors");

const userFinder = async (userData = userInitialOptions) => {
  try {
    errorThrower(!userData, "You should send me data to find your target");

    const currentUser = await UserMongoModel.findOne(userData);

    return currentUser;
  } catch (error) {
    logger.log("userFinder catch", error);
    throw error;
  }
};

const addCellphoneToUserBlacklist = async (
  currentUser = userInitialOptions,
  cellphone
) => {
  try {
    const { cellphone: existBlacklistItem } = cellphoneFinder(
      currentUser.blacklist,
      cellphone
    );

    errorThrower(existBlacklistItem, () =>
      getErrorObject(BLACKLIST_ITEM_EXIST, { targetUserData: cellphone })
    );

    const targetUser = await userFinder(cellphone);
    errorThrower(targetUser === null, () =>
      getErrorObject(TARGET_USER_NOT_EXIST, { targetUserData: cellphone })
    );

    const blacklistItem = getCellphone(cellphone);

    currentUser.blacklist.push(blacklistItem);
    await currentUser.updateOne({
      blacklist: currentUser.blacklist,
    });
  } catch (error) {
    logger.log("addCellphoneToUserBlacklist catch, error", error);
    throw error;
  }
};

const addContactToUserContacts = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
    const { cellphone: existContactItem } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(existContactItem, () =>
      getErrorObject(CONTACT_ITEM_EXIST, { targetUserData })
    );

    const targetUser = await userFinder(targetUserData);
    errorThrower(targetUser === null, () =>
      getErrorObject(TARGET_USER_NOT_EXIST, { targetUserData })
    );

    currentUser.contacts.push(
      getContact({ ...targetUserData, privateId: targetUser.privateId })
    );
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });

    return { targetUser, currentUser };
  } catch (error) {
    logger.log("addContactToUserContacts catch, error:", error);
    throw error;
  }
};

const updateOneContact = async (
  currentUser = userInitialOptions,
  targetCellphone,
  editedValues
) => {
  try {
    logger.log("currentUser.contacts", currentUser.contacts);

    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetCellphone
    );
    errorThrower(!contactItem, () => getErrorObject(CONTACT_ITEM_NOT_EXIST));

    currentUser.contacts.splice(cellphoneIndex, 1, {
      ...getContact(targetCellphone),
      firstName: editedValues.firstName,
      lastName: editedValues.lastName,
    });
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });

    return { currentUser };
  } catch (error) {
    logger.log("updateOneContact catch, error:", error);
    throw error;
  }
};

const getUserContacts = async (currentUser = userInitialOptions) => {
  try {
    return currentUser.contacts;
  } catch (error) {
    logger.log("getUserContacts catch, error:", error);
  }
};

const deleteBlacklistItem = async (currentUser, targetUserData) => {
  const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder(
    currentUser.blacklist,
    targetUserData
  );
  errorThrower(!blacklistItem, () => getErrorObject(BLACKLIST_ITEM_NOT_EXIST));

  currentUser.blacklist.splice(cellphoneIndex, 1);

  await currentUser.updateOne({
    blacklist: currentUser.blacklist,
  });
};

const removeContactItem = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
  try {
    const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder(
      currentUser.contacts,
      targetUserData
    );
    errorThrower(!contactItem, () =>
      getErrorObject(CONTACT_ITEM_NOT_EXIST, { targetUserData })
    );

    currentUser.contacts.splice(cellphoneIndex, 1);
    await currentUser.updateOne({
      contacts: currentUser.contacts,
    });
  } catch (error) {
    logger.log("removeContactItem catch, error:", error);
    throw error;
  }
};

const updateUserDataByPrivateId = async (userData) => {
  try {
    await UserMongoModel.findOneAndUpdate(
      { privateId: userData.privateId },
      userData
    );
  } catch (error) {
    logger.log("updateUserTokens catch, error:", error);

    throw error;
  }
};

const createNewNormalUser = async (userData) => {
  try {
    const newUser = new UserMongoModel(userData);
    await newUser.save();

    return true;
  } catch (error) {
    logger.log("createNewNormalUser catch, error:", error);
    throw error;
  }
};

const addTestUser = async (
  countryCode,
  countryName,
  phoneNumber,
  firstName,
  lastName,
  privateId,
  token
) => {
  try {
    await UserMongoModel.updateOne(
      { countryCode, countryName, phoneNumber },
      {
        tokens: [{ token }],
        privateId,
        firstName,
        lastName,
        contacts: [],
        blacklist: [],
        chats: [],
      },
      {
        upsert: true,
      }
    );

    const user = await userFinder({ countryCode, countryName, phoneNumber });

    return user;
  } catch (error) {
    logger.log("addTestUser catch, error:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  const users = await UserMongoModel.find();

  return users;
};

const removeTestUsers = async (length) => {
  for (let i = 0; i < length; i++) {
    await UserMongoModel.remove();
  }
};

module.exports = {
  addCellphoneToUserBlacklist,
  addContactToUserContacts,
  addTestUser,
  createNewNormalUser,
  deleteBlacklistItem,
  getAllUsers,
  getUserContacts,
  removeContactItem,
  removeTestUsers,
  updateOneContact,
  updateUserDataByPrivateId,
  userFinder,
};
