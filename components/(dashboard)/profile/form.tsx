"use client";

import { useRef, startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { updateCompanyProfileAction } from "@/actions/company-profile";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import { CompanyFormData, companyFormSchema } from "@/validations/company";
import { companyInputFormData } from "@/constants/company";
import { ICompany } from "@/definitions/company";

interface CompanyFormProps {
  company?: ICompany | null;
  onClose?: () => void;
}

const CompanyForm = ({ company, onClose }: CompanyFormProps) => {
  type ActionState = {
    message: string;
    errors: Record<string, string | string[]>;
  };
  const initialState: ActionState = { message: "", errors: {} };

  const isEditing = !!company?.id;

  const [state, formAction, isPending] = useActionState(
    updateCompanyProfileAction,
    initialState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name || "",
      registrationNumber: company?.registrationNumber || "",
      contactEmail: company?.contactEmail || "",
      contactPhone: company?.contactPhone || "",
      billingAddress: company?.billingAddress || "",
      vatNumber: company?.vatNumber || "",
    },
  });

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        registrationNumber: company.registrationNumber,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
        billingAddress: company.billingAddress,
        vatNumber: company.vatNumber || "",
      });
    }
  }, [company, reset]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = handleSubmit(() => {
    const formData = new FormData(formRef.current!);
    startTransition(() => {
      formAction(formData);
      if (onClose) onClose();
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl w-full p-6 shadow-lg max-h-[90vh] overflow-y-auto"
    >
      {" "}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        Edit Company Details
      </h2>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:gap-4"
      >
        {companyInputFormData.map((input) => (
          <InputValidated
            key={input.name}
            {...input}
            register={register}
            errors={errors}
            stateError={state?.errors}
            isPending={isPending}
          />
        ))}

        <div className="text-xs text-gray-500 -mt-2">
          Registration number cannot be changed after creation
        </div>

        <SubmitButton name="Update Company Details" isPending={isPending} />
      </form>
    </motion.div>
  );
};

export default CompanyForm;
