import { motion } from 'framer-motion'
import { ArrowUpRight, Bath, BedDouble, Maximize2 } from 'lucide-react'
import type { Property } from '../types/property'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function PropertyCard({ property }: { property: Property }) {
  return <motion.article className="property-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }} viewport={{ once: true, amount: .15 }}>
    <div className="property-image">
      <img src={property.image} alt={property.title} width={4} height={3} loading="lazy" decoding="async" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = '/resources/image-fallback.svg' }}/>
      <span>{property.type}</span>
    </div>
    <div className="property-details"><p className="property-price">{currency.format(property.price)}</p><div className="property-title"><div><h3>{property.title}</h3><p>{property.location}</p></div><a href="#contact" aria-label={`Inquire about ${property.title}`}><ArrowUpRight size={19}/></a></div><div className="specs"><span><BedDouble size={15}/>{property.bedrooms} Beds</span><span><Bath size={15}/>{property.bathrooms} Baths</span><span><Maximize2 size={14}/>{property.squareFeet.toLocaleString()} Sq Ft</span></div></div>
  </motion.article>
}
