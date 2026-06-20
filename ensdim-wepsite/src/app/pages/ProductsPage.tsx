import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';
import { QuickAnswer } from '../components/QuickAnswer';

const products = [
  {
    slug: 'clinics-workspace',
    en: {
      title: 'Clinics Workspace',
      for: 'For clinics and healthcare centers',
      desc: 'Booking, patient follow-up, reminders, CRM, and operational visibility in one system.',
      outcomes: ['Fewer missed appointments', 'Better patient follow-up', 'Clearer management'],
    },
    ar: {
      title: 'مساحة العيادات',
      for: 'للعيادات والمراكز الصحية',
      desc: 'الحجز، متابعة المرضى، التذكيرات، CRM، والرؤية التشغيلية في نظام واحد.',
      outcomes: ['مواعيد أقل فواتاً', 'متابعة أفضل للمرضى', 'إدارة أوضح'],
    },
    color: '#6D5DF6',
  },
  {
    slug: 'real-estate-flow',
    en: {
      title: 'Real Estate Flow',
      for: 'For real estate and property service businesses',
      desc: 'Lead tracking, property inquiries, follow-up, and sales visibility in one clear workflow.',
      outcomes: ['No lost leads', 'Faster follow-up', 'Sales clarity'],
    },
    ar: {
      title: 'منظومة العقارات',
      for: 'لشركات العقارات وخدمات الممتلكات',
      desc: 'تتبع العملاء المحتملين، استفسارات العقارات، المتابعة، ووضوح المبيعات في سير عمل واحد.',
      outcomes: ['لا ضياع للعملاء', 'متابعة أسرع', 'وضوح المبيعات'],
    },
    color: '#3B2A78',
  },
  {
    slug: 'operations-workspace',
    en: {
      title: 'Operations Workspace',
      for: 'For service businesses with daily requests and teams',
      desc: 'Requests, scheduling, team workflows, customer follow-up, and dashboards.',
      outcomes: ['Organized requests', 'Team visibility', 'Easier scaling'],
    },
    ar: {
      title: 'مساحة التشغيل',
      for: 'للأعمال الخدمية التي تدير طلبات يومية وفرق عمل',
      desc: 'الطلبات، الجدولة، سير عمل الفريق، متابعة العملاء، ولوحات التحكم.',
      outcomes: ['طلبات منظمة', 'رؤية الفريق', 'توسع أسهل'],
    },
    color: '#8B7BF7',
  },
];

export function ProductsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title="Products | ENSDIM - Clinics, Operations & Real Estate Workspace Systems"
        description="ENSDIM productized systems for clinics, service businesses, and real estate companies: CRM, booking, patient follow-up, workflow automation, dashboards, and operational visibility."
        keywords="clinic management system Egypt, real estate CRM Saudi Arabia, operations management software UAE, business automation products Middle East"
        canonical="/products"
      />
      <PageHero
        title={ar ? 'أنظمة منتجة لمشكلات تشغيلية متكررة.' : 'Productized systems for repeated business problems.'}
        subtitle={ar
          ? 'نحول المشكلات التشغيلية المتكررة إلى منتجات رقمية مركزة للأعمال الخدمية.'
          : 'We turn recurring operational problems into focused digital products for service-driven businesses.'}
        breadcrumbs={[{ label: 'Products', labelAr: 'المنتجات', href: '/products' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <QuickAnswer
        question={ar ? 'ما المنتجات التي تقدمها إنسديم؟' : 'What products does ENSDIM offer?'}
        answer={ar
          ? 'تقدم إنسديم ثلاثة منتجات رئيسية: مساحة العيادات (للعيادات والمراكز الصحية)، منظومة العقارات (لشركات العقارات)، ومساحة التشغيل (للأعمال الخدمية اليومية). كل منتج قابل للتخصيص حول طريقة عمل نشاطك.'
          : 'ENSDIM offers three core productized systems: Clinics Workspace (for healthcare), Real Estate Flow (for property businesses), and Operations Workspace (for daily service businesses). Every product is adaptable to your specific business operations.'}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {products.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.08}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group block border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 hover:border-[#6D5DF6] hover:shadow-md active:scale-[0.99] active:border-[#6D5DF6] transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-xs text-[#4F555E] mb-1">{ar ? p.ar.for : p.en.for}</p>
                      <h3 className="text-xl font-bold text-[#101418] mb-3">{ar ? p.ar.title : p.en.title}</h3>
                      <p className="text-sm text-[#4F555E] leading-relaxed mb-4">{ar ? p.ar.desc : p.en.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {(ar ? p.ar.outcomes : p.en.outcomes).map((o, j) => (
                          <span key={j} className="text-[10px] px-2.5 py-1 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-semibold">
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#101418] text-white rounded-xl group-hover:bg-[#1a1d24] transition-colors text-sm font-semibold self-start whitespace-nowrap">
                      {ar ? 'عرض المنتج' : 'View Product'}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-10 p-6 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl text-center">
            <p className="text-sm text-[#4F555E] mb-3">
              {ar
                ? 'هذه المنتجات قابلة للتكيف وتُبنى خصيصاً لعملك. إنها نقطة انطلاق، وليست قيداً.'
                : 'These are adaptable systems built for your business — a starting point, not a limitation.'}
            </p>
            <Link
              to="/book-consultation"
              className="inline-flex items-center gap-2 text-[#6D5DF6] text-sm font-semibold hover:underline"
            >
              {ar ? 'احجز استشارة لمناقشة احتياجاتك' : 'Book a consultation to discuss your needs'}
              <ArrowRight size={13} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة حول منتجات إنسديم' : 'Frequently Asked Questions About ENSDIM Products'}
        faqs={ar ? [
          { question: 'ما الفرق بين منتجات إنسديم وخدماتها المخصصة؟', answer: 'المنتجات هي أنظمة جاهزة للتكيف حول مشكلات متكررة في قطاعات محددة. الخدمات المخصصة تُبنى من الصفر حول احتياجاتك الخاصة. كثير من العملاء يبدأون بالمنتج ثم يضيفون تخصيصات إضافية.' },
          { question: 'هل مساحة العيادات مناسبة لعيادتي؟', answer: 'نعم إذا كنت تدير عيادة أو مركزاً صحياً يحتاج إلى: إدارة حجز المواعيد، متابعة المرضى، تذكيرات التواصل، ولوحة تحكم لرؤية الأداء.' },
          { question: 'هل منظومة العقارات تناسب جميع أحجام الشركات؟', answer: 'نعم. منظومة العقارات مناسبة لوكالات العقارات الصغيرة والمتوسطة التي تحتاج إلى تتبع العملاء المحتملين، إدارة العقارات، ومتابعة المبيعات بشكل أوضح.' },
          { question: 'هل يمكن تخصيص هذه المنتجات لنشاطي؟', answer: 'نعم. كل منتجات إنسديم قابلة للتكيف حول طريقة عمل نشاطك. نبدأ بتشخيص احتياجاتك الخاصة قبل التعديل على النظام.' },
        ] : [
          { question: 'What is the difference between ENSDIM products and custom services?', answer: 'Products are pre-configured systems adapted around recurring problems in specific sectors. Custom services are built from scratch around your unique needs. Many clients start with a product and add customizations as the system evolves.' },
          { question: 'Is Clinics Workspace suitable for my clinic?', answer: 'Yes, if you manage a clinic or healthcare center that needs: appointment booking management, patient follow-up, communication reminders, and a performance visibility dashboard.' },
          { question: 'Does Real Estate Flow work for all agency sizes?', answer: 'Yes. Real Estate Flow is suitable for small and medium real estate agencies that need clearer lead tracking, property management, and sales pipeline visibility.' },
          { question: 'Can these products be customized for my specific business?', answer: 'Yes. All ENSDIM products are adaptable to your business operations. We start with a diagnostic session to understand your specific workflows before making any customizations to the system.' },
          { question: 'What sectors do ENSDIM products serve?', answer: 'Current products target healthcare and clinics, real estate agencies, and general service businesses with daily operational requests and teams. Custom services cover all other sectors.' },
        ]}
      />
    </>
  );
}
