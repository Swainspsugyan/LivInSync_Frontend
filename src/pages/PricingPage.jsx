import Pricing from '../components/Pricing.jsx'

export default function PricingPage({ onSelect }) {
  return (
    <div className="pt-24 sm:pt-28 lg:pt-32">
      <Pricing onSelect={onSelect} />
    </div>
  )
}
