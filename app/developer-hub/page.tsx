import { Suspense } from "react"
import DeveloperHub from "@/components/DeveloperHub"

export default function DeveloperHubPage() {
  return (
    <Suspense fallback={<div>Loading developer hub...</div>}>
      <DeveloperHub />
    </Suspense>
  )
}
