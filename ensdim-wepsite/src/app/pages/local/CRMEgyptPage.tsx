import { LocalSEOPage, LocalPageConfig } from '../LocalSEOPage';

const config: LocalPageConfig = {
  slug: 'crm-development-egypt',
  service: 'CRM Development',
  serviceAr: 'تطوير نظام CRM',
  country: 'Egypt',
  countryAr: 'مصر',
  city: 'Cairo',
  cityAr: 'القاهرة',
  geoRegion: 'EG',
  geoPlacename: 'Cairo, Egypt',
  latitude: '30.0444',
  longitude: '31.2357',
  seoTitle: 'CRM Development Egypt | Ensdim - Custom CRM Systems Cairo, Alexandria',
  seoDescription: 'Ensdim builds custom CRM systems for Egyptian businesses — lead management, sales pipelines, customer follow-up, and operational workflows in Arabic and English. Cairo-based team.',
  seoKeywords: 'CRM development Egypt, custom CRM Cairo, CRM system Egypt, customer management software Egypt, CRM for Egyptian businesses, Arabic CRM system, CRM agency Cairo',
  heroTitle: 'Custom CRM Development in Egypt — Built Around How You Manage Customers',
  heroSubtitle: 'Stop using generic CRM software that doesn\'t fit Egyptian business operations. Ensdim builds custom CRM systems around your actual workflows, lead management process, and customer journey.',
  quickAnswerQ: 'Who builds the best custom CRM systems in Egypt?',
  quickAnswerA: 'Ensdim builds custom CRM systems for Egyptian businesses — designed around your specific lead management, sales pipeline, customer follow-up, and operational workflows. Unlike off-the-shelf CRM software, Ensdim systems are built after studying how your business actually manages customers, not before.',
  benefits: [
    { en: 'Custom-built to fit Egyptian business workflows — not generic templates', ar: '' },
    { en: 'Arabic-first interface with English option for staff and management', ar: '' },
    { en: 'Designed for Egyptian market customer behavior and communication patterns', ar: '' },
    { en: 'Integrates with WhatsApp, email, and local Egyptian tools your team already uses', ar: '' },
    { en: 'Works for clinics, real estate, professional services, and operations across Egypt', ar: '' },
    { en: 'Built after the Diagnose and Map phases — no wasted features', ar: '' },
  ],
  serviceItems: [
    { title: 'Lead Management CRM', desc: 'Track every lead from first contact through follow-up to close. Arabic-language interface, WhatsApp integration, and status tracking designed for Egyptian service businesses.' },
    { title: 'Sales Pipeline Systems', desc: 'Custom pipelines that match how your team sells — not how Salesforce assumes you sell. Built for Egyptian real estate agencies, clinics, and professional services.' },
    { title: 'Customer Follow-Up Automation', desc: 'Automated follow-up sequences, reminder systems, and re-engagement flows that reduce manual WhatsApp messaging and missed leads for Egyptian businesses.' },
    { title: 'Operations & Workflow CRM', desc: 'Internal systems for managing tasks, assignments, client records, and project status — built for Egyptian construction, operations, and professional services firms.' },
  ],
  faqs: [
    { question: 'Does Ensdim build custom CRM systems in Egypt?', answer: 'Yes. Ensdim is a Cairo-based team that builds fully custom CRM systems for Egyptian businesses — designed around your specific lead management, sales, and customer follow-up workflows.' },
    { question: 'Is the CRM system in Arabic?', answer: 'Yes. All Ensdim CRM systems are built bilingual — Arabic and English. The Arabic interface is built-in by default, not a translation layer added on top.' },
    { question: 'Can Ensdim integrate the CRM with WhatsApp?', answer: 'Yes. Ensdim builds CRM systems with WhatsApp Business API integration — so your team can manage leads, send follow-ups, and track conversations directly from the CRM.' },
    { question: 'What types of Egyptian businesses need a custom CRM?', answer: 'Egyptian clinics and medical centers, real estate agencies, professional services firms, training centers, contracting companies, and any service business managing more than 20-30 active customer relationships monthly.' },
    { question: 'What is the difference between a custom CRM and off-the-shelf software like Salesforce?', answer: 'Off-the-shelf CRM assumes your business works a certain way. Ensdim custom CRM is built after studying how your business actually works — so every field, stage, and workflow matches how your team operates, not how a software vendor assumes you do.' },
    { question: 'How long does it take to build a custom CRM in Egypt?', answer: 'A focused CRM for one workflow (e.g., lead management for a real estate agency) typically takes 4-8 weeks. A full operational CRM with multiple modules and integrations takes 8-14 weeks.' },
  ],
};

export function CRMEgyptPage() {
  return <LocalSEOPage config={config} />;
}
