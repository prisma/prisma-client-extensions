import { z } from "zod";

export type Avatar = z.infer<typeof Avatar>;
export const Avatar = z.object({
  url: z.string().url(),
  crop: z.object({
    top: z.number().min(0).max(1),
    right: z.number().min(0).max(1),
    bottom: z.number().min(0).max(1),
    left: z.number().min(0).max(1),
  }),
});

export type Address = z.infer<typeof Address>;
export const Address = z.object({
  street: z.string(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export type ContactInfo = z.infer<typeof ContactInfo>;
export const ContactInfo = z
  .object({
    email: z.string().email(),
    phone: z.string(),
    address: Address,
  })
  .partial();

export type SocialLinks = z.infer<typeof SocialLinks>;
export const SocialLinks = z
  .object({
    twitter: z.string().url(),
    github: z.string().url(),
    website: z.string().url(),
    linkedin: z.string().url(),
  })
  .partial();

export type Profile = z.infer<typeof Profile>;
export const Profile = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    avatar: Avatar,
    contactInfo: ContactInfo,
    socialLinks: SocialLinks,
  })
  .partial();
