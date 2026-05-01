export const addCollaborators = async (req, res) => {
    try {
      const documentId = req.params.id;
      const ownerId = req.user.userId;
  
      const { email, permission } = req.body;
  
      console.log("email:", email);
      console.log("role:", permission);
  
      if (!mongoose.Types.ObjectId.isValid(documentId)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }
  
      if (!email) {
        return res
          .status(400)
          .json({ message: "Collaborator email is required" });
      }
  
      const allowedRoles = ["viewer", "editor"];
      if (!permission || !allowedRoles.includes(permission)) {
        return res
          .status(400)
          .json({ message: "Role must be 'editor' or 'viewer'" });
      }
  
      const userToAdd = await User.findOne({ email: email.toLowerCase().trim() });
      if (!userToAdd) {
        return res
          .status(404)
          .json({ message: "User with the provided email not found" });
      }
  
      const document = await Document.findById(documentId);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      console.log("Document Owner ID:", document.owner.toString());
  
      if (document.owner.toString() !== ownerId) {
        return res
          .status(403)
          .json({ message: "Only owner can add collaborators" });
      }
  
      const ownerDoc = await User.findById(ownerId).select("email");
  
      if (email.toLowerCase().trim() === ownerDoc.email.toLowerCase().trim()) {
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