import { lazy, Suspense } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })))
const FeaturedProperties = lazy(() => import('./components/FeaturedProperties').then(m => ({ default: m.FeaturedProperties })))
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })))
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })))
const jsonLd = { '@context':'https://schema.org', '@graph':[{'@type':'RealEstateAgent','name':'AURA Real Estate','url':'https://aurarealestate.example','telephone':'+44-20-7946-0228','address':{'@type':'PostalAddress','streetAddress':'18 Grosvenor Square','addressLocality':'London','postalCode':'W1K 6LF','addressCountry':'GB'}},{'@type':'SingleFamilyResidence','name':'Villa Lumière','address':{'@type':'PostalAddress','addressLocality':'Cap d’Antibes','addressCountry':'FR'},'numberOfBedrooms':6,'floorSize':{'@type':'QuantitativeValue','value':8420,'unitCode':'FTK'}}] }
export default function App() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/><Header/><main><HeroSection/><Suspense fallback={null}><AboutSection/><FeaturedProperties/><ContactSection/></Suspense></main><Suspense fallback={null}><Footer/></Suspense></> }
