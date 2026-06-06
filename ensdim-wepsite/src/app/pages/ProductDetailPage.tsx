import { useParams, Link } from 'react-router';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { ConsultationForm } from '../components/ConsultationForm';
import { SEO } from '../components/SEO';

const productData: Record<string, {
  en: { title: string; for: string; outcome: string; problems: string[]; modules: string[]; results: string[] };
  ar: { title: string; for: string; outcome: string; problems: string[]; modules: string[]; results: string[] };
}> = {
  'clinics-workspace': {
    en: {
      title: 'Clinics Workspace',
      for: 'For clinics and healthcare centers',
      outcome: 'Fewer missed appointments and better patient experience.',
      problems: [
        'Appointments are booked manually and often missed',
        'Patient follow-up depends on staff memory',
        'No clear view of patient history or visit status',
        'Reminders are sent inconsistently or not at all',
      ],
      modules: ['Patient profile & history', 'Booking & scheduling flow', 'Automated reminders', 'Follow-up tracking', 'Documents & notes', 'Payment & invoice status', 'Management dashboard', 'AI assistance for scheduling'],
      results: ['Fewer missed appointments', 'Faster patient communication', 'Better staff visibility', 'Clearer daily operations', 'Scalable patient management'],
    },
    ar: {
      title: 'مساحة العيادات',
      for: 'للعيادات والمراكز الصحية',
      outcome: 'مواعيد أقل فواتاً وتجربة مريض أفضل.',
      problems: [
        'تُحجز المواعيد يدوياً وكثيراً ما تُفوَّت',
        'تعتمد متابعة المرضى على ذاكرة الموظفين',
        'لا توجد رؤية واضحة لتاريخ المريض أو حالة الزيارة',
        'تُرسل التذكيرات بشكل غير منتظم أو لا تُرسل أصلاً',
      ],
      modules: ['ملف المريض وسجله', 'مسار الحجز والجدولة', 'تذكيرات تلقائية', 'تتبع المتابعة', 'مستندات وملاحظات', 'حالة الدفع والفاتورة', 'لوحة إدارة', 'مساعدة ذكية للجدولة'],
      results: ['مواعيد أقل فواتاً', 'تواصل أسرع مع المرضى', 'رؤية أفضل للموظفين', 'عمليات يومية أوضح', 'إدارة مرضى قابلة للتوسع'],
    },
  },
  'real-estate-flow': {
    en: {
      title: 'Real Estate Flow',
      for: 'For real estate and property service businesses',
      outcome: 'No lost leads and clearer sales visibility.',
      problems: [
        'Leads come from multiple channels and get lost',
        'Follow-up depends on individual agents, not a system',
        'No view of lead status, stage, or history',
        'Proposals and documents scattered across tools',
      ],
      modules: ['Lead capture & profile', 'Property inquiry tracking', 'Follow-up flow & reminders', 'Proposal & document management', 'Sales pipeline view', 'Agent activity dashboard', 'Payment & commission tracking', 'WhatsApp integration'],
      results: ['No lost leads', 'Faster agent response', 'Clearer sales pipeline', 'Better proposal tracking', 'Easier team management'],
    },
    ar: {
      title: 'منظومة العقارات',
      for: 'لشركات العقارات وخدمات الممتلكات',
      outcome: 'لا ضياع للعملاء ووضوح في خط المبيعات.',
      problems: [
        'تأتي الفرص من قنوات متعددة وتضيع',
        'تعتمد المتابعة على الأفراد وليس على نظام',
        'لا رؤية لحالة العميل أو مرحلته أو تاريخه',
        'العروض والمستندات مشتتة بين أدوات مختلفة',
      ],
      modules: ['التقاط وملف العميل', 'تتبع استفسارات العقارات', 'مسار المتابعة والتذكيرات', 'إدارة العروض والمستندات', 'عرض خط المبيعات', 'لوحة نشاط الوكلاء', 'تتبع المدفوعات والعمولات', 'تكامل واتساب'],
      results: ['لا ضياع للعملاء', 'استجابة أسرع من الوكلاء', 'خط مبيعات أوضح', 'تتبع عروض أفضل', 'إدارة فريق أسهل'],
    },
  },
  'operations-workspace': {
    en: {
      title: 'Operations Workspace',
      for: 'For service businesses with daily requests and teams',
      outcome: 'Organized requests, visible teams, and easier growth.',
      problems: [
        'Requests arrive through multiple channels and get missed',
        'Team assignments and status unclear',
        'Manual scheduling wastes time daily',
        'No view of workload, performance, or progress',
      ],
      modules: ['Request intake & tracking', 'Team assignment & status', 'Scheduling & calendar', 'Customer follow-up flow', 'Documents & notes', 'Payment & billing', 'Operations dashboard', 'AI for task prioritization'],
      results: ['Organized daily requests', 'Clear team visibility', 'Less scheduling chaos', 'Better customer communication', 'Easier scaling of operations'],
    },
    ar: {
      title: 'مساحة التشغيل',
      for: 'للأعمال الخدمية التي تدير طلبات يومية وفرق عمل',
      outcome: 'طلبات منظمة، فرق واضحة، ونمو أسهل.',
      problems: [
        'تصل الطلبات عبر قنوات متعددة وتُفوَّت',
        'تعيينات الفريق وحالته غير واضحة',
        'الجدولة اليدوية تهدر وقتاً يومياً',
        'لا رؤية لعبء العمل أو الأداء أو التقدم',
      ],
      modules: ['استقبال الطلبات وتتبعها', 'تعيين الفريق والحالة', 'الجدولة والتقويم', 'مسار متابعة العميل', 'مستندات وملاحظات', 'المدفوعات والفواتير', 'لوحة تشغيل', 'ذكاء لأولوية المهام'],
      results: ['طلبات يومية منظمة', 'رؤية واضحة للفريق', 'فوضى جدولة أقل', 'تواصل أفضل مع العملاء', 'توسع أسهل للعمليات'],
    },
  },
};

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const product = productData[slug || ''];

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center">
        <p className="text-[#69717D]">{ar ? 'المنتج غير موجود' : 'Product not found'}</p>
        <Link to="/products" className="text-[#6D5DF6] mt-4 inline-block">{ar ? 'العودة للمنتجات' : 'Back to Products'}</Link>
      </div>
    );
  }

  const data = ar ? product.ar : product.en;

  return (
    <>
      <SEO
        title={`${data.title} | ENSDIM Products`}
        description={`${data.for}. ${data.outcome} Built for businesses in Egypt, Saudi Arabia, and UAE.`}
        keywords={`${data.title} Egypt, ${data.for.toLowerCase()}, business management software Middle East`}
        canonical={`/products/${slug}`}
      />
      <PageHero
        eyebrow={data.for}
        title={data.title}
        subtitle={data.outcome}
        primaryCTA={{ label: ar ? 'ابنِ هذا النظام لعملك' : 'Build this system for your business', href: '/book-consultation' }}
        secondaryCTA={{ label: ar ? 'عرض جميع المنتجات' : 'View all products', href: '/products' }}
        breadcrumbs={[
          { label: 'Products', labelAr: 'المنتجات', href: '/products' },
          { label: data.title, href: `/products/${slug}` },
        ]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Problems */}
            <ScrollReveal>
              <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ما تعاني منه هذه القطاعات' : 'What this sector struggles with'}</h2>
              <ul className="space-y-3">
                {data.problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#69717D]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D63A3A] mt-1.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Modules */}
            <ScrollReveal delay={0.1}>
              <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ما تنظمه إنسديم' : 'What ENSDIM organizes'}</h2>
              <ul className="space-y-2">
                {data.modules.map((m, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#69717D]">
                    <CheckCircle size={14} className="text-[#6D5DF6] flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Results */}
          <ScrollReveal delay={0.15} className="mt-12">
            <h2 className="text-xl font-bold text-[#101418] mb-6">{ar ? 'النتائج' : 'Outcomes'}</h2>
            <div className="flex flex-wrap gap-3">
              {data.results.map((r, i) => (
                <span key={i} className="px-4 py-2 bg-[#EEEAFE] border border-[#6D5DF6]/15 text-[#6D5DF6] text-sm font-semibold rounded-full">
                  {r}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <ConsultationForm
              title={ar ? 'طوّع هذا النظام لعملك.' : 'Adapt this system to your business.'}
              hiddenFields={{
                source_page: `/products/${slug}`,
                clicked_product: product ? (ar ? product.ar.title : product.en.title) : '',
                interest_type: 'product',
              }}
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
