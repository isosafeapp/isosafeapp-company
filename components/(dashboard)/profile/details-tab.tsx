"use client";

import { Edit2 } from "lucide-react";
import { CompanyProfile } from "@/definitions/company-profile";

export function CompanyDetailsTab({
  profile,
  onEdit,
}: {
  profile: CompanyProfile;
  onEdit: () => void;
}) {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    suspended: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs sm:text-sm font-medium text-gray-700">
        {label}
      </label>
      <p className="text-sm text-gray-600 break-words">{value || "—"}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Company Information
        </h2>
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition w-full sm:w-auto"
        >
          <Edit2 size={14} />
          Edit Details
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow label="Company Name" value={profile.name} />
          <div className="flex flex-col gap-1">
            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Status
            </label>
            <span
              className={`inline-block w-fit px-2 py-1 text-xs rounded-full ${statusColors[profile.status]}`}
            >
              {profile.status}
            </span>
          </div>
          <InfoRow
            label="Registration Number"
            value={profile.registrationNumber}
          />
          <InfoRow label="VAT Number" value={profile.vatNumber} />
          <InfoRow label="Contact Email" value={profile.contactEmail} />
          <InfoRow label="Contact Phone" value={profile.contactPhone} />
        </div>

        <div className="sm:col-span-2">
          <InfoRow label="Billing Address" value={profile.billingAddress} />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow
              label="Subscription Plan"
              value={profile.subscriptionTier?.toUpperCase()}
            />
            <InfoRow
              label="Subscription Expiry"
              value={
                profile.subscriptionExpiry
                  ? new Date(profile.subscriptionExpiry).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
