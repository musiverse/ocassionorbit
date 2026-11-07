"use client";
import { useSearchParams } from "next/navigation";
import { InquiryForm } from "./InquiryForm";
import { enquiryPrefills } from "@/lib/enquiry";
export function BookingInquiry() {
  const params = useSearchParams();
  const values = enquiryPrefills(params);
  return <InquiryForm key={params.toString()} kind="event" {...values} />;
}
