const Notice = require("../models/noticeModel");

// Create a new notice
const createNotice = async (noticeData) => {
  const notice = new Notice(noticeData);
  await notice.save();
  return notice;
};

// Get all notices
const getAllNotices = async () => {
  return await Notice.find();
};

// Get a notice by ID
const getNoticeById = async (id) => {
  return await Notice.findById(id);
};

// Update a notice
const updateNotice = async (id, noticeData) => {
  return await Notice.findByIdAndUpdate(id, noticeData, { new: true });
};

// Delete a notice
const deleteNotice = async (id) => {
  return await Notice.findByIdAndDelete(id);
};

module.exports = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
