import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, MessageSquare, Database, Shield, Zap, BarChart3, Clock } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';

const exampleQuestionsEn = [
  'What sales did we achieve today?',
  'How many leads came from ads this week?',
  'Which sales team member has the most follow-ups pending?',
  'What payments are due?',
  'What projects are delayed?',
  "What are today's bookings?",
  'Which customers need follow-up?',
];

const exampleQuestionsAr = [
  'ما المبيعات التي حققناها اليوم؟',
  'كم عميلاً محتملاً جاء من الإعلانات هذا الأسبوع؟',
  'أي عضو في فريق المبيعات لديه أكثر متابعات معلقة؟',
  'ما المدفوعات المستحقة؟',
  'ما المشاريع المتأخرة؟',
  'ما الحجوزات المقررة اليوم؟',
  'أي العملاء يحتاجون إلى متابعة؟',
];

const dataSourcesEn = ['CRM & Lead database', 'Sales and revenue data', 'Project management systems', 'Payment records', 'Booking systems', 'Marketing performance data'];
const dataSourcesAr = ['CRM وقاعدة بيانات العملاء', 'بيانات المبيعات والإيرادات', 'أنظمة إدارة المشاريع', 'سجلات الدفعات', 'أنظمة الحجز', 'بيانات أداء التسويق'];

const benefitsEn = ['Faster decisions', 'Less waiting for reports', 'Clearer daily visibility', 'Easier management', 'Better follow-up'];
const benefitsAr = ['قرارات أسرع', 'انتظار أقل للتقارير', 'رؤية يومية أوضح', 'إدارة أسهل', 'متابعة أفضل'];

export function ManagementChatbotPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const exampleQuestions = ar ? exampleQuestionsAr : exampleQuestionsEn;
  const dataSources = ar ? dataSourcesAr : dataSourcesEn;
  const benefits = ar ? benefitsAr : benefitsEn;

  return (
    <>
      <SEO
        title={ar ? 'تشات بوت بيانات الإدارة | إنسديم' : 'Management Data Chatbot | ENSDIM'}
        description={ar
          ? 'تشات بوت إداري مرتبط ببيانات شركتك يساعد أصحاب القرار على معرفة المبيعات، العملاء المحتملين، التشغيل، المدفوعات، والأداء بسرعة.'
          : 'A management chatbot connected to your company data, helping decision-makers get quick answers about sales, leads, operations, payments, and performance.'}
        canonical="/services/management-data-chatbot"
        lang={ar ? 'ar' : 'en'}
      />
      <PageHero
        eyebrow={ar ? 'الخدمات' : 'Services'}
        title={ar ? 'اسأل بيانات عملك من واتساب.' : 'Ask your business data from WhatsApp.'}
        subtitle={ar
          ? 'تشات بوت إداري مرتبط ببيانات شركتك يساعد أصحاب القرار على معرفة المبيعات، العملاء المحتملين، التشغيل، المدفوعات، والأداء بسرعة.'
          : 'A management chatbot connected to your company data, helping decision-makers get quick answers about sales, leads, operations, payments, and performance.'}
        primaryCTA={{ label: ar ? 'احجز استشارة' : 'Book Consultation', href: '/book-consultation' }}
      />

      {/* What it does */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-6">
            {ar ? 'ما الذي يفعله' : 'What it does'}
          </h2>
          <p className="text-[#4F555E] text-lg leading-relaxed max-w-3xl">
            {ar
              ? 'تشات بوت إدارة البيانات هو مساعد ذكي يمكنه الوصول إلى بيانات شركتك والإجابة على أسئلة إدارية بوقت فعلي. يعمل من خلال واتساب — لا تطبيقات إضافية، لا لوحات تحكم معقدة، فقط اسأل وتحصل على الإجابة.'
              : 'The Management Data Chatbot is an intelligent assistant that can access your company data and answer management questions in real time. It works through WhatsApp — no extra apps, no complex dashboards, just ask and get the answer.'}
          </p>
        </div>
      </section>

      {/* Example questions */}
      <section className="py-16 bg-[#EEEAFE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#101418] mb-8">
            {ar ? 'أمثلة على الأسئلة' : 'Example questions'}
          </h2>
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            {/* Mockup header */}
            <div className="bg-[#101418] px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                <MessageSquare size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">ENSDIM Management Bot</p>
                <p className="text-[#EEEAFE]/55 text-xs">{ar ? 'متصل ببيانات الشركة' : 'Connected to company data'}</p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {exampleQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`flex-1 px-4 py-2.5 rounded-2xl text-sm ${i % 2 === 0 ? 'bg-[#EEEAFE] text-[#101418] ms-8' : 'bg-[#6D5DF6] text-white me-8'}`}>
                    {i % 2 === 0 ? q : (ar ? 'إليك التقرير الآن...' : 'Here is the data right now...')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#101418] mb-8">
            {ar ? 'مصادر البيانات التي يمكنه الاتصال بها' : 'Data sources it can connect to'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataSources.map((source, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-[#E5E5E5]">
                <Database size={18} className="text-[#6D5DF6] flex-shrink-0" />
                <span className="text-sm text-[#101418]">{source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[#101418]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-8">
            {ar ? 'الفوائد' : 'Benefits'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, i) => {
              const icons = [Zap, Clock, BarChart3, MessageSquare, ArrowRight];
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <Icon size={18} className="text-[#6D5DF6] flex-shrink-0" />
                  <span className="text-[#EEEAFE]/90 text-sm">{benefit}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-5 items-start max-w-3xl">
            <div className="w-12 h-12 bg-[#EEEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield size={22} className="text-[#6D5DF6]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#101418] mb-3">
                {ar ? 'الأمان والتحكم في الوصول' : 'Security and access control'}
              </h2>
              <p className="text-[#4F555E] leading-relaxed">
                {ar
                  ? 'يمكن ربط التشات بوت بأرقام واتساب محددة فقط وتحديد ما يمكنه الوصول إليه. لا يُشارك أي بيانات خارج الأشخاص المخولين. يتم تسجيل كل سؤال وإجابة للمراجعة.'
                  : 'The chatbot can be connected to specific WhatsApp numbers only and configured to access only what is relevant. No data is shared outside of authorized users. Every question and answer is logged for review.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#EEEAFE]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-4">
            {ar ? 'هل تريد أن تسأل بياناتك؟' : 'Want to start asking your data?'}
          </h2>
          <p className="text-[#4F555E] mb-6">
            {ar
              ? 'تحدث مع إنسديم لنرى كيف يمكن ربط التشات بوت ببيانات شركتك.'
              : 'Talk to ENSDIM and see how we can connect the chatbot to your company data.'}
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors font-medium"
          >
            {ar ? 'احجز استشارة' : 'Book Consultation'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
