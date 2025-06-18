import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Pencil, Check, X } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(authUser.fullName);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleNameUpdate = async () => {
    if (!editedName.trim() || editedName === authUser.fullName) {
      setIsEditingName(false);
      return;
    }
    await updateProfile({ fullName: editedName });
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-xl bg-base-200 rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Your Profile</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your account info</p>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={selectedImg||authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full border-4 border-base-content shadow-md object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-4 h-4 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to change photo"}
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          {/* Full Name (Editable) */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2 mb-1">
              <User className="w-4 h-4" />
              Full Name
              {!isEditingName && (
                <button onClick={() => setIsEditingName(true)} className="ml-auto">
                  <Pencil className="w-4 h-4 text-zinc-400 hover:text-base-content" />
                </button>
              )}
            </label>

            {isEditingName ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="input input-sm input-bordered w-full bg-base-100"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button
                  onClick={handleNameUpdate}
                  className="btn btn-sm btn-success"
                  disabled={isUpdatingProfile}
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setEditedName(authUser.fullName);
                    setIsEditingName(false);
                  }}
                  className="btn btn-sm btn-error"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="bg-base-100 border rounded-lg px-4 py-2.5 text-sm">
                {authUser?.fullName}
              </div>
            )}
          </div>

          {/* Email (Not editable) */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <div className="bg-base-100 border rounded-lg px-4 py-2.5 text-sm">
              {authUser?.email}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-6 bg-base-100 rounded-xl border p-4 space-y-3">
          <h2 className="text-base font-medium text-base-content mb-2">Account Information</h2>
          <div className="text-sm flex justify-between border-b border-zinc-700 py-2">
            <span>Member Since</span>
            <span>{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="text-sm flex justify-between py-2">
            <span>Status</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

