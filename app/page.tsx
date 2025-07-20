import { Suspense } from "react"
import Landing from "@/components/Landing"

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Landing />
    </Suspense>
  )
}
