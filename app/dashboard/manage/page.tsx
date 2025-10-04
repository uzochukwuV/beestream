"use client"

import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { ManageContent } from "@/components/manage/ManageContent"

export default function ManagePage() {
  return (
    <DashboardLayout>
      <ManageContent />
    </DashboardLayout>
  )
}
