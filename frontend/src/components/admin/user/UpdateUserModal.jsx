import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UpdateUserModal = ({ isOpen, onClose, onUpdate, userData }) => {
  const [formData, setFormData] = useState(userData);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onUpdate(formData);
  };

  useEffect(() => {
    return () => {
      if (previewAvatar) {
        URL.revokeObjectURL(previewAvatar);
      }
    };
  }, [previewAvatar]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="edit-fullname">Full name</Label>
              <Input
                id="edit-fullname"
                value={formData?.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            </div>

            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={formData?.userName || formData?.username || ""}
                onChange={(e) => handleChange("userName", e.target.value)}
              />
            </div>

            {/* Phone & Role */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={formData?.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={formData?.roleId === 1 ? "1" : "2"}
                  onValueChange={(value) => handleChange("roleId", value)}
                >
                  <SelectTrigger id="edit-role" className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Admin</SelectItem>
                    <SelectItem value="2">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Avatar (File) */}
            <div className="grid gap-2">
              <Label htmlFor="edit-avatar">Avatar</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  handleChange("avatar", file);
                  setPreviewAvatar(URL.createObjectURL(file));
                }}
              />
              {(previewAvatar || formData?.avatar) && (
                <img
                  className="mt-2 w-[40%] rounded"
                  src={
                    previewAvatar
                      ? previewAvatar
                      : `${import.meta.env.VITE_BASE_URL_BACKEND}/images/${
                          formData.avatar
                        }`
                  }
                  alt="Avatar"
                />
              )}
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData?.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
