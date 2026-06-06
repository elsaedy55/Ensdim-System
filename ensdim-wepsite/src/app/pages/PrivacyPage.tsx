import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

export function PrivacyPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const sections = ar ? [
    { title: 'البيانات التي نجمعها', body: 'نجمع المعلومات التي تقدمها عند ملء النماذج أو التواصل معنا، بما تشمل الاسم والبريد الإلكتروني والشركة وتفاصيل المشروع.' },
    { title: 'كيف نستخدم البيانات', body: 'نستخدم بياناتك للتواصل معك، وتقديم خدماتنا، وتحسين تجربتك. لا نبيع بياناتك لأي طرف ثالث.' },
    { title: 'بيانات مساحة العميل', body: 'تُخزَّن بيانات المشاريع والعقود والمدفوعات الخاصة بالعملاء بشكل آمن ولا يمكن الوصول إليها إلا من قِبل أصحاب الحسابات المعتمدة.' },
    { title: 'بيانات التواصل', body: 'تُستخدم رسائل البريد الإلكتروني والنماذج وتواصل واتساب فقط لأغراض العمل ولا تُشارك خارجياً.' },
    { title: 'ملفات تعريف الارتباط والتحليلات', body: 'قد نستخدم ملفات تعريف الارتباط لتحسين تجربة الموقع وتحليل الأداء. يمكنك إلغاء الاشتراك في أي وقت عبر إعدادات المتصفح.' },
    { title: 'أمان البيانات', body: 'نتبع ممارسات معيارية للصناعة لحماية البيانات من الوصول غير المصرح به.' },
    { title: 'تواصل معنا', body: 'لأي أسئلة تتعلق بسياسة الخصوصية، تواصل معنا على hello@ensdim.com' },
  ] : [
    { title: 'Data we collect', body: 'We collect information you provide through forms and communications, including name, email, company, and project details.' },
    { title: 'How we use data', body: 'We use your data to communicate with you, deliver our services, and improve your experience. We do not sell your data to third parties.' },
    { title: 'Client workspace data', body: 'Client project data, contracts, and payment information is stored securely and accessible only to authorized account holders.' },
    { title: 'Communication data', body: 'Emails, forms, and WhatsApp communication are used for business purposes only and are not shared externally.' },
    { title: 'Cookies and analytics', body: 'We may use cookies to improve site experience and analyze performance. You can opt out at any time through browser settings.' },
    { title: 'Data security', body: 'We follow industry-standard practices to protect data from unauthorized access.' },
    { title: 'Contact us', body: 'For any privacy-related questions, contact us at hello@ensdim.com' },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy | ENSDIM"
        description="ENSDIM Privacy Policy: how we collect, use, and protect your data. We do not sell data to third parties. Client project data is stored securely."
        keywords="ENSDIM privacy policy, data protection"
        canonical="/privacy"
        noIndex={false}
      />
      <PageHero
        title={ar ? 'سياسة الخصوصية' : 'Privacy Policy'}
        subtitle={ar
          ? 'كيف تتعامل إنسديم مع البيانات والتواصل ومعلومات العملاء.'
          : 'How ENSDIM handles data, communication, and client information.'}
        variant="light"
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
          {sections.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <h2 className="text-base font-bold text-[#101418] mb-2">{s.title}</h2>
              <p className="text-sm text-[#69717D] leading-relaxed">{s.body}</p>
            </ScrollReveal>
          ))}
          <ScrollReveal delay={0.4}>
            <p className="text-xs text-[#69717D]/50 pt-4 border-t border-[#E5E5E5]">
              {ar ? 'آخر تحديث: يونيو 2026' : 'Last updated: June 2026'}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
