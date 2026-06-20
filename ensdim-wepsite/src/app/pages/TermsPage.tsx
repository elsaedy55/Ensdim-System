import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';

const sectionsEn = [
  {
    title: 'Use of website',
    content: 'By accessing and using the ENSDIM website, you agree to use it for lawful purposes only. You may not use the site in any way that disrupts its operation or infringes on the rights of others.',
  },
  {
    title: 'Consultation requests',
    content: 'Submitting a consultation request does not constitute a formal agreement or commitment from either party. ENSDIM will review your request and follow up within a reasonable timeframe.',
  },
  {
    title: 'Client workspace access',
    content: 'Access to the ENSDIM client workspace is granted only to approved clients. Creating an account does not guarantee immediate access. Accounts are activated after client approval or project confirmation.',
  },
  {
    title: 'Project communication',
    content: 'All official project communication is conducted through the client workspace or designated channels. ENSDIM is not responsible for decisions made based on informal communications outside these channels.',
  },
  {
    title: 'Intellectual property',
    content: 'All content, designs, systems, and materials developed by ENSDIM remain the intellectual property of ENSDIM until full payment is received and ownership is formally transferred as specified in the project agreement.',
  },
  {
    title: 'Limitation of liability',
    content: 'ENSDIM is not liable for indirect or consequential damages arising from the use of our services or systems. Our liability is limited to the amount paid for the specific service in question.',
  },
  {
    title: 'Contact',
    content: 'For any questions about these terms, please contact us through the contact page or at the designated email address provided in your project agreement.',
  },
];

const sectionsAr = [
  {
    title: 'استخدام الموقع',
    content: 'بالوصول إلى موقع إنسديم واستخدامه، فأنت توافق على استخدامه للأغراض القانونية فقط. لا يجوز استخدام الموقع بأي طريقة تعطل عمله أو تنتهك حقوق الآخرين.',
  },
  {
    title: 'طلبات الاستشارة',
    content: 'تقديم طلب استشارة لا يشكل اتفاقاً رسمياً أو التزاماً من أي طرف. ستراجع إنسديم طلبك وستتابع معك في غضون وقت معقول.',
  },
  {
    title: 'الوصول إلى مساحة العميل',
    content: 'يُمنح الوصول إلى مساحة عميل إنسديم للعملاء المعتمدين فقط. إنشاء حساب لا يضمن الوصول الفوري. يتم تفعيل الحسابات بعد اعتماد العميل أو تأكيد المشروع.',
  },
  {
    title: 'التواصل المتعلق بالمشروع',
    content: 'يتم إجراء جميع المراسلات الرسمية المتعلقة بالمشروع من خلال مساحة العميل أو القنوات المخصصة. لا تتحمل إنسديم المسؤولية عن القرارات المتخذة بناءً على مراسلات غير رسمية خارج هذه القنوات.',
  },
  {
    title: 'الملكية الفكرية',
    content: 'تظل جميع المحتويات والتصاميم والأنظمة والمواد التي طورتها إنسديم ملكاً فكرياً لإنسديم حتى استلام الدفعة الكاملة ونقل الملكية رسمياً وفقاً لما هو محدد في اتفاقية المشروع.',
  },
  {
    title: 'تحديد المسؤولية',
    content: 'لا تتحمل إنسديم المسؤولية عن الأضرار غير المباشرة أو التبعية الناجمة عن استخدام خدماتنا أو أنظمتنا. تقتصر مسؤوليتنا على المبلغ المدفوع مقابل الخدمة المعنية.',
  },
  {
    title: 'التواصل',
    content: 'لأي أسئلة حول هذه الشروط، يرجى التواصل معنا من خلال صفحة الاتصال أو على عنوان البريد الإلكتروني المخصص المحدد في اتفاقية مشروعك.',
  },
];

export function TermsPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const sections = ar ? sectionsAr : sectionsEn;

  return (
    <>
      <SEO
        title="Terms of Service | ENSDIM"
        description="ENSDIM Terms of Service: governing use of our website, consultation requests, project communication, intellectual property, and service delivery."
        keywords="ENSDIM terms of service, terms and conditions"
        canonical="/terms-of-service"
        noIndex={false}
      />
      <PageHero
        eyebrow={ar ? 'قانوني' : 'Legal'}
        title={ar ? 'شروط الخدمة' : 'Terms of Service'}
        subtitle={ar
          ? 'الشروط الأساسية لاستخدام موقع وخدمات إنسديم.'
          : 'The basic terms for using ENSDIM website and services.'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="pb-8 border-b border-[#E5E5E5] last:border-0">
                <h2 className="text-lg font-bold text-[#101418] mb-3">{section.title}</h2>
                <p className="text-[#4F555E] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
