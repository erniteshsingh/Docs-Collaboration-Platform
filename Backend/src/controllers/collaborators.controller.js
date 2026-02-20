import { json } from "express";
import mongoose from "mongoose";
import Document from "../models/documents.model.js";
import User from "../models/user.model.js";

export const addCollaborators = async (req, res) => {
  try {
    const documentId = req.params.id;
    const ownerId = req.user.userId;

    const { collaboratorsEmail, collaboratorsRole } = req.body;

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    if (!collaboratorsEmail) {
      return res.status(400).json({
        message: "Collaborator email is required",
      });
    }

    const allowedRoles = ["editor", "viewer"];
    if (!collaboratorsRole || !allowedRoles.includes(collaboratorsRole)) {
      return res
        .status(400)
        .json({ message: "Role must be 'editor' or 'viewer'" });
    }

    const userToAdd = await User.findOne({
      email: collaboratorsEmail.toLowerCase().trim(),
    });

    if (!userToAdd) {
      return res
        .status(404)
        .json({ message: "User with the provided email not found" });
    }

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (document.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ message: "Only owner can add collaborators" });
    }

    const ownerDoc = await User.findById(ownerId).select("email");
    console.log("Owner Email:", ownerDoc.email);
    console.log("Collaborator Email:", collaboratorsEmail);

    if (collaboratorsEmail === ownerDoc.email) {
      return res
        .status(400)
        .json({ message: "Owner cannot be added as collaborator" });
    }

    const alreadyCollaborator = document.collaborators.find(
      (c) => c.user.toString() === userToAdd._id.toString(),
    );
    if (alreadyCollaborator) {
      return res
        .status(400)
        .json({ message: "User is already a collaborator" });
    }

    document.collaborators.push({
      user: userToAdd._id,
      role: collaboratorsRole,
      email: collaboratorsEmail,
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
