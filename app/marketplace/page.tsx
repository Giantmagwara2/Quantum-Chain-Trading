import { Suspense } from "react"
import Marketplace from "@/components/Marketplace"

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div>Loading marketplace...</div>}>
      <Marketplace />
    </Suspense>
  )
}
