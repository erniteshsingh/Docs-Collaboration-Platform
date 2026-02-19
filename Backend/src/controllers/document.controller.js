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

    const documents = await Document.find({ owner: userId }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.owner.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

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
    const id = req.params.id;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    if (document.owner.toString() !== userId) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const { title, content } = req.body;

    if (title === undefined && content === undefined) {
      return res.status(400).json({
        message: "Nothing to update",
      });
    }

    if (title !== undefined) {
      document.title = title;
    }
    if (content !== undefined) {
      document.content = content;
    }

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
    const id = req.params.id;
    const userId = req.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.owner.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await document.deleteOne();

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
