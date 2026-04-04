import { json } from "express";
import mongoose from "mongoose";
import Document from "../models/documents.model.js";
import User from "../models/user.model.js";

export const addCollaborators = async (req, res) => {
  try {
    const documentId = req.params.id;
    const ownerId = req.user.userId;

    const { email, permission } = req.body;

    console.log("email:", email);
    console.log("role:", permission);

    // Validate document ID
    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "Collaborator email is required" });
    }

    // Allowed roles
    const allowedRoles = ["viewer", "editor"];
    if (!permission || !allowedRoles.includes(permission)) {
      return res
        .status(400)
        .json({ message: "Role must be 'editor' or 'viewer'" });
    }

    // Find user to add
    const userToAdd = await User.findOne({ email: email.toLowerCase().trim() });
    if (!userToAdd) {
      return res
        .status(404)
        .json({ message: "User with the provided email not found" });
    }

    // Find document
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    console.log("Document Owner ID:", document.owner.toString());

    // Only owner can add collaborators
    if (document.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ message: "Only owner can add collaborators" });
    }

    const ownerDoc = await User.findById(ownerId).select("email");

    // Owner cannot be added
    if (email.toLowerCase().trim() === ownerDoc.email.toLowerCase().trim()) {
      return res
        .status(400)
        .json({ message: "Owner cannot be added as collaborator" });
    }

    // Check if user is already a collaborator
    const alreadyCollaborator = document.collaborators.find(
      (c) => c.user.toString() === userToAdd._id.toString(),
    );
    if (alreadyCollaborator) {
      return res
        .status(400)
        .json({ message: "User is already a collaborator" });
    }

    // Add collaborator
    document.collaborators.push({
      user: userToAdd._id,
      role: permission,
      email: email.toLowerCase().trim(),
    });

    await document.save();

    return res.status(200).json({
      success: true,
      message: "Collaborator added successfully",
      collaborators: document.collaborators,
    });
  } catch (error) {
    console.error("Add Collaborator Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const removeCollaborator = async (req, res) => {
  try {
    const documentId = req.params.id;
    const ownerId = req.user.userId;
    const { collaboratorEmail } = req.body;
    console.log("email to remove:", collaboratorEmail);

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ message: "Only owner can remove collaborators" });
    }

    const userToRemove = await User.findOne({ email: collaboratorEmail });

    if (!userToRemove) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToRemove._id.toString() === ownerId) {
      return res.status(400).json({ message: "Owner cannot be removed" });
    }

    const exists = document.collaborators.some(
      (c) => c.user.toString() === userToRemove._id.toString(),
    );

    if (!exists) {
      return res.status(400).json({ message: "User is not a collaborator" });
    }

    document.collaborators = document.collaborators.filter(
      (c) => c.user.toString() !== userToRemove._id.toString(),
    );

    await document.save();

    return res.status(200).json({
      success: true,
      message: "Collaborator removed successfully",
      collaborators: document.collaborators,
    });
  } catch (error) {
    console.error("Remove Collaborator Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
