import Pricing from '../components/Pricing.jsx'

export default function PricingPage({ onSelect }) {
  return (
    <div className="pt-16">
      <Pricing onSelect={onSelect} />
    </div>
  )
}
