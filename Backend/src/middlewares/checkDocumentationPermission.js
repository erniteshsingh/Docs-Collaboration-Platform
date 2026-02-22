import mongoose from "mongoose";
import Document from "../models/documents.model.js";


export const checkDocumentPermission = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const documentID = req.params.id;
      const userId = req.user.userId;

      if (!mongoose.Types.ObjectId.isValid(documentID)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }

      const document = await Document.findById(documentID);

      if (!document) {
        return res.status(404).json({
          message: "Document not found",
        });
      }

      if (document.owner.toString() === userId) {
        req.document = document;
        return next();
      }

      

      const collaborator = document.collaborators.find(
        (collab) => collab.user.toString() === userId,
      );

      if (!collaborator) {
        res.status(404).json({
          message: "Access denied, you are not a collaborator of this document",
        });
      }

      const rolePriority = {
        viewer: 1,
        editor: 2,
        owner: 3,
      };
      const userRoleLevel = rolePriority[collaborator.role];
      const requiredRoleLevel = rolePriority[requiredRole];

      if (userRoleLevel < requiredRoleLevel) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      req.document = document;
      next();
    } catch (error) {
      console.error("Permission Middleware Error:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
};
