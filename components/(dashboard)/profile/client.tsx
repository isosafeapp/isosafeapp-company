"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Palette, CreditCard, Menu } from "lucide-react";
import CompanyModal from "@/components/ui/modal";
import CompanyForm from "./form";
import { CompanyProfile, BillingInfo } from "@/definitions/company-profile";
import { BrandingTab } from "./branding-tab";
import { BillingTab } from "./billing-tab";
import { CompanyDetailsTab } from "./details-tab";

export function CompanyProfileClient({
  profile,
  billing,
  companyId,
}: {
  profile: CompanyProfile;
  billing: BillingInfo | null | undefined;
  companyId: string;
}) {
  const [activeTab, setActiveTab] = useState<
    "details" | "branding" | "billing"
  >("details");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { id: "details" as const, label: "Company Details", icon: Building2 },
    { id: "branding" as const, label: "Branding", icon: Palette },
    // { id: "billing" as const, label: "Billing", icon: CreditCard },
  ];

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const companyForForm = {
    id: profile.id,
    name: profile.name,
    registrationNumber: profile.registrationNumber,
    contactEmail: profile.contactEmail,
    contactPhone: profile.contactPhone,
    billingAddress: profile.billingAddress,
    vatNumber: profile.vatNumber,
    status: profile.status,
    subscriptionTier: profile.subscriptionTier,
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Company Profile
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your company settings and branding
        </p>
      </div>

      {/* Mobile Tab Selector */}
      <div className="block lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2">
            {activeTab === "details" && (
              <Building2 size={18} className="text-blue-500" />
            )}
            {activeTab === "branding" && (
              <Palette size={18} className="text-blue-500" />
            )}
            {activeTab === "billing" && (
              <CreditCard size={18} className="text-blue-500" />
            )}
            <span className="font-medium text-gray-800">
              {tabs.find((t) => t.id === activeTab)?.label}
            </span>
          </div>
          <Menu size={18} className="text-gray-400" />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute z-10 mt-2 w-full max-w-[calc(100%-2rem)] bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:flex gap-1 bg-white rounded-xl border border-gray-200 p-1 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab + refreshKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "details" && (
          <CompanyDetailsTab
            profile={profile}
            onEdit={() => setIsEditModalOpen(true)}
          />
        )}
        {activeTab === "branding" && (
          <BrandingTab
            profile={profile}
            companyId={companyId}
            onUpdate={handleRefresh}
          />
        )}
        {activeTab === "billing" && (
          <BillingTab billing={billing} profile={profile} />
        )}
      </motion.div>

      {/* Edit Modal */}
      <CompanyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <CompanyForm
          company={companyForForm as any}
          onClose={() => {
            setIsEditModalOpen(false);
            handleRefresh();
          }}
        />
      </CompanyModal>
    </div>
  );
}
