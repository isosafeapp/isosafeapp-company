"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ICompany } from "@/definitions/company";
import CompanyRegisterForm from "./form";

const CompanyRegister = ({
  company,
  hasPassword,
}: {
  company: ICompany | null;
  hasPassword: boolean;
}) => {
  if (!company) {
    return (
      <div className="flex h-[98vh] items-center justify-center bg-white">
        <motion.main
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-black text-white shadow-2xl border border-gray-200 w-full max-w-md md:max-w-sm h-screen md:h-[600px] overflow-hidden"
        >
          <div className="absolute top-30 md:top-10 w-full flex flex-col items-center">
            <h3 className="font-mono text-3xl font-semibold tracking-wide text-white">
              Hazard Detect
            </h3>
          </div>
          <div className="absolute bottom-0 w-full bg-white text-black py-10 px-8">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="text-center text-sm text-gray-600">
                Invalid registration link. Please contact your administrator.
              </p>
              <Link
                href="/login"
                className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 mt-4"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </motion.main>
      </div>
    );
  }

  return (
    <div className="flex h-[98vh] items-center justify-center bg-white">
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl bg-black text-white shadow-2xl border border-gray-200 w-full max-w-md md:max-w-sm h-screen md:h-[650px] overflow-hidden"
      >
        <div className="absolute top-30 md:top-10 w-full flex flex-col items-center">
          <h3 className="font-mono text-3xl font-semibold tracking-wide text-white">
            Hazard Detect
          </h3>
          <p className="text-sm text-gray-300 mt-2">Company Portal</p>
        </div>

        <div className="absolute bottom-0 w-full bg-white text-black py-8 px-8 rounded-t-[40px]">
          <h3 className="font-mono text-xl mb-2 text-center">
            Welcome, {company.name}!
          </h3>
          <p className="text-center text-sm text-gray-500 mb-6">
            Create your admin account to get started
          </p>

          {hasPassword ? (
            <div className="bg-white border-l-4 border-gray-500 p-4" role="alert">
              <p className="text-center text-sm text-gray-600 mb-4">
                You already have an account. Please log in.
              </p>
              <Link
                href="/login"
                className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <CompanyRegisterForm
              companyId={company.id!}
              email={company.contactEmail}
              companyName={company.name}
            />
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default CompanyRegister;