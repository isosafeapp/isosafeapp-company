"use client";

import {
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  Zap,
} from "lucide-react";
import { BillingInfo, CompanyProfile } from "@/definitions/company-profile";

const tierNames = {
  essential: "Essential",
  standard: "Standard",
  premium: "Premium",
};

const tierPrices = {
  essential: "R5,000",
  standard: "R15,000",
  premium: "R35,000",
};

const tierColors = {
  essential: "border-gray-200 bg-gray-50",
  standard: "border-blue-200 bg-blue-50",
  premium: "border-yellow-200 bg-yellow-50",
};

export function BillingTab({
  billing,
  profile,
}: {
  billing: BillingInfo | null | undefined;
  profile: CompanyProfile;
}) {
  if (!billing) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-6 sm:p-8 text-center">
        <p className="text-gray-500">Unable to load billing information</p>
      </div>
    );
  }

  const { subscription, invoices, paymentMethod } = billing;
  const statusColors = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    overdue: "bg-red-100 text-red-700",
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-ZA");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Subscription Card */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden">
        <div className={`p-4 sm:p-6 ${tierColors[subscription.tier]}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <CreditCard size={20} className="text-blue-500" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Current Subscription
              </h2>
            </div>
            {subscription.isActive ? (
              <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                <CheckCircle size={12} /> Active
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                <AlertCircle size={12} /> Inactive
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {tierNames[subscription.tier]}
              </p>
              <p className="text-sm text-gray-600">
                {tierPrices[subscription.tier]}/month
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Renewal Date</p>
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                {formatDate(subscription.expiryDate)}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Features Included:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subscription.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                >
                  <CheckCircle
                    size={12}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      {paymentMethod && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Payment Method
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <CreditCard size={24} className="text-gray-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                {paymentMethod.brand} •••• {paymentMethod.last4}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Invoices */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Billing History
        </h2>
        {invoices.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No invoices yet</p>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      {invoice.invoiceNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      Due: {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${statusColors[invoice.status]}`}
                  >
                    {invoice.status}
                  </span>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    R{invoice.amount.toLocaleString()}
                  </span>
                  {invoice.pdfUrl && (
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upgrade Prompt */}
      {profile.subscriptionTier !== "premium" && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-200 p-4 sm:p-6 text-center">
          <Zap size={24} className="text-yellow-500 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Upgrade Your Plan
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get more features and higher limits with our premium plans.
          </p>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            View Plans
          </button>
        </div>
      )}
    </div>
  );
}
