import Document from "../models/documents.model.js";
import mongoose from "mongoose";

export const createDocument = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("owner id from token:", req.user.userId);

    const title = req.body.title || "Untitled Document";
    const content = req.body.content || "";

    const document = await Document.create({
      title,
      content,
      owner: req.user.userId,
    });

    res.status(201).json({
      message: "Document created successfully",
      document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllDocuments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
   
    const documents = await Document.find({
      $or: [{ owner: userId }, { "collaborators.user": userId }],
    })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title owner updatedAt collaborators");

    const total = await Document.countDocuments({
      $or: [{ owner: userId }, { "collaborators.user": userId }],
    });

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      documents,
    });
  } catch (error) {
    console.error("Get Documents Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleDocument = async (req, res) => {
  try {
    const document = req.document;
    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateDocument = async (req, res) => {
  try {
    const document = req.document; // DB already hit in middleware
    const { title, content } = req.body;

    if (!title && !content)
      return res.status(400).json({ message: "Nothing to update" });

    if (title) document.title = title;
    if (content) document.content = content;

    await document.save();

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = req.document;

    await document.deleteOne();

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
