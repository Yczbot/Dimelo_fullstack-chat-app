import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200 bg-base-100"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full px-4 py-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-base-content/80" />
          <span className="font-medium hidden lg:block text-base-content">
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-2 space-y-2 px-2">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-base-200/70 transition"
          >
            {/* Avatar skeleton */}
            <div className="mx-auto lg:mx-0">
              <div className="animate-pulse bg-base-300 size-12 rounded-full" />
            </div>

            {/* Info skeleton */}
            <div className="hidden lg:flex flex-col gap-2 flex-1 min-w-0">
              <div className="animate-pulse bg-base-300 h-4 w-3/4 rounded" />
              <div className="animate-pulse bg-base-300 h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
