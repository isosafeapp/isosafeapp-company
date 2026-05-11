"use client";

import { useRef, startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import { CompanyProfile } from "@/definitions/company-profile";
import { updateBrandingAction } from "@/actions/branding";
import { BrandingHeader } from "./branding/header";
import { LogoUploader } from "./branding/logo-uploader";
import { ColorPicker } from "./branding/color-picker";
import { BrandPreview } from "./branding/brand-preview";
import { SaveButton } from "./branding/save-button";

interface BrandingFormData {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
}

const brandingFormSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  logo: z.string().optional(),
});

export function BrandingTab({
  profile,
  companyId,
  onUpdate,
}: {
  profile: CompanyProfile;
  companyId: string;
  onUpdate: () => void;
}) {
  const initialState = { message: "", errors: {} };

  const updateWithId = updateBrandingAction.bind(null, companyId);
  const [state, formAction, isPending] = useActionState(
    updateWithId,
    initialState,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BrandingFormData>({
    resolver: zodResolver(brandingFormSchema),
    defaultValues: {
      primaryColor: profile.branding.primaryColor,
      secondaryColor: profile.branding.secondaryColor,
      logo: profile.branding.logo || "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const primaryColor = watch("primaryColor");
  const secondaryColor = watch("secondaryColor");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = handleSubmit(() => {
    const formData = new FormData(formRef.current!);
    startTransition(() => {
      formAction(formData);
      if (state.success) {
        onUpdate();
      }
    });
  });

  return (
    <motion.form
      ref={formRef}
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <BrandingHeader />

      <input type="hidden" {...register("primaryColor")} />
      <input type="hidden" {...register("secondaryColor")} />
      <input type="hidden" {...register("logo")} />

      <LogoUploader
        logoPreview={watch("logo") || null}
        onLogoUpload={handleLogoUpload}
      />

      <ColorPicker
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onPrimaryColorChange={(color) => setValue("primaryColor", color)}
        onSecondaryColorChange={(color) => setValue("secondaryColor", color)}
      />

      <BrandPreview
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      <SaveButton isPending={isPending} />
    </motion.form>
  );
}
