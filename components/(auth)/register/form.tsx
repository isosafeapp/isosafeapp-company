"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import InputValidated from "@/components/ui/input-validated";
import { SubmitButton } from "@/components/ui/buttons";
import { companyRegisterFormData } from "@/constants/auth";
import { startTransition, useActionState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterCompanyForm,
  registerCompanyFormSchema,
} from "@/validations/auth";
import { registerCompany } from "@/actions/auth";

const CompanyRegisterForm = ({
  companyId,
  email,
  companyName,
}: {
  companyId: string;
  email: string;
  companyName: string;
}) => {
  const initialState = {
    message: "",
    errors: {},
  };

  const registerWithId = registerCompany.bind(null, companyId);
  const [state, formAction, isPending] = useActionState(
    registerWithId,
    initialState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCompanyForm>({
    resolver: zodResolver(registerCompanyFormSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <motion.form
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(() => {
          const formData = new FormData(formRef.current!);
          startTransition(() => {
            formAction(formData);
          });
        })(evt);
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full"
    >
      <div className="w-full mb-4">
        {/* Email field - pre-filled and read-only */}
        <div className="flex flex-col mb-4">
          <label className="text-black text-sm mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 rounded-full bg-gray-100 text-gray-500 border border-gray-300"
          />
          <input type="hidden" {...register("email")} value={email} />
        </div>

        {/* Password fields */}
        {companyRegisterFormData.map((input) => (
          <InputValidated
            key={input.name}
            {...input}
            register={register}
            errors={errors}
            stateError={state.errors}
            isPending={isPending}
          />
        ))}
      </div>

      {state.message && (
        <p className="text-red-500 text-sm text-center mb-4">{state.message}</p>
      )}

      <SubmitButton name="Create Admin Account" isPending={isPending} />

      <p className="mt-5 text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-black underline">
          Login here
        </Link>
      </p>
    </motion.form>
  );
};

export default CompanyRegisterForm;
