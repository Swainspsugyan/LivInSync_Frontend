import { useI18n } from '../lib/i18n.jsx'
import { asset } from '../lib/asset.js'
import Wipe from './Wipe.jsx'

const ITEMS = [
  { key: 'security.rbac', image: 'security-rbac.png' },
  { key: 'security.auth', image: 'security-auth.png' },
  { key: 'security.data', image: 'security-data.png' },
  { key: 'security.encrypt', image: 'security-encrypt.png' },
  { key: 'security.audit', image: 'security-audit.png' },
  { key: 'security.device', image: 'security-device.png' },
  { key: 'security.monitor', image: 'security-monitor.png' },
]

export default function Security() {
  const { t } = useI18n()

  return (
    <section className="security-overlay section-pad" aria-labelledby="security-features-heading">
      <Wipe as="h3" side="header" id="security-features-heading">
        {t('security.featuresTitle')}
      </Wipe>
      {ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          className="item"
          style={{ backgroundImage: `url("${asset(item.image)}")` }}
        >
          <span>{t(item.key)}</span>
        </button>
      ))}
    </section>
  )
}
