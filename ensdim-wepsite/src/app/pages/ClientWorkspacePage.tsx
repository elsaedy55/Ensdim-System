import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FAQSection } from '../components/FAQSection';

export function ClientWorkspacePage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const includes = ar
    ? ['تقدم المشروع', 'المراحل', 'الملفات', 'الملاحظات', 'المدفوعات', 'العقود', 'طلبات التعديل']
    : ['Project progress', 'Stages', 'Files', 'Notes', 'Payments', 'Contracts', 'Change requests'];

  return (
    <>
      <SEO
        title={ar ? 'مساحة العميل | إنسديم' : 'Client Workspace | Ensdim'}
        description={ar
          ? 'مساحة عميل واضحة لمتابعة تقدم المشروع، الملفات، الملاحظات، المدفوعات، العقود، وطلبات التعديل.'
          : 'A clear client workspace to track project progress, files, notes, payments, contracts, and change requests.'}
        canonical="/client-workspace"
        lang={ar ? 'ar' : 'en'}
      />
      <PageHero
        eyebrow={ar ? 'مساحة العميل' : 'Client Workspace'}
        title={ar ? 'نؤمن أن الوضوح أثناء المشروع جزء من جودة الحل نفسه.' : 'We believe project clarity is part of the quality of the solution itself.'}
        subtitle={ar
          ? 'نوفر لعملائنا مساحة متابعة واضحة تساعدهم على رؤية تقدم المشروع، المراحل، الملفات، الملاحظات، المدفوعات، العقود، ونسبة الإنجاز. هذه ليست ميزة شكلية، بل جزء من فلسفة إنسديم القائمة على أن الوضوح يبني الثقة، ويقلل القلق، ويسرّع القرار.'
          : 'We provide clients with a clear workspace to track project progress, stages, files, notes, payments, contracts, and completion percentage. This is not a cosmetic feature. It reflects Ensdim’s belief that clarity builds trust, reduces anxiety, and speeds up decisions.'}
        primaryCTA={{ label: ar ? 'دخول مساحة العميل' : 'Client Workspace Login', href: 'https://app.ensdim.com/login' }}
        secondaryCTA={{ label: ar ? 'تواصل معنا' : 'Contact Ensdim', href: '/contact' }}
        breadcrumbs={[{ label: 'Client Workspace', labelAr: 'مساحة العميل', href: '/client-workspace' }]}
        lang={ar ? 'ar' : 'en'}
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#101418] mb-5">{ar ? 'ماذا تشمل مساحة العميل؟' : 'What the workspace includes'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includes.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                  <CheckCircle2 size={15} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-sm text-[#101418]">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection
        title={ar ? 'أسئلة شائعة عن مساحة العميل' : 'Frequently Asked Questions About the Client Workspace'}
        faqs={ar ? [
          { question: 'متى أحصل على مساحة عميل؟', answer: 'تُفعَّل مساحة العميل بعد اعتماد المشروع والبدء في التنفيذ، حتى تتابع تقدم العمل من أول مرحلة.' },
          { question: 'هل يمكن لأكثر من شخص في فريقي الدخول؟', answer: 'نعم، يمكن إضافة أكثر من مستخدم من جانبك لمتابعة المشروع حسب الحاجة.' },
          { question: 'هل المدفوعات والعقود تظهر داخل المساحة؟', answer: 'نعم، تشمل المساحة المدفوعات والعقود وحالة كل منها بجانب تقدم المشروع والملفات.' },
        ] : [
          { question: 'When do I get a client workspace?', answer: 'The client workspace is activated after project approval and the start of execution, so you can follow progress from the first stage.' },
          { question: 'Can more than one person from my team access it?', answer: 'Yes, additional users from your side can be added to follow the project as needed.' },
          { question: 'Do payments and contracts appear inside the workspace?', answer: 'Yes, the workspace includes payments and contracts alongside project progress and files.' },
        ]}
      />

      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'اطلب تفعيل مساحة العميل لمشروعك' : 'Request workspace activation for your project'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6">
            {ar ? 'شاركنا تفاصيل مشروعك وسنساعدك على البدء.' : 'Share your project details and we will help you get started.'}
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold"
          >
            {ar ? 'احجز استشارة' : 'Book a Consultation'} <ArrowRight size={15} />
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
