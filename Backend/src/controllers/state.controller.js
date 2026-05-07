import User from "../models/user.model.js";
import Document from "../models/documents.model.js";

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const documents = await Document.countDocuments();

    res.status(200).json({ users, documents });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
