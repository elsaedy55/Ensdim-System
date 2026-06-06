import { useParams, Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

const articles: Record<string, {
  titleEn: string; titleAr: string;
  introEn: string; introAr: string;
  pointsEn: string[]; pointsAr: string[];
  perspectiveEn: string; perspectiveAr: string;
}> = {
  'lose-leads-after-first-message': {
    titleEn: 'How service businesses lose leads after the first message',
    titleAr: 'كيف تخسر شركات الخدمات العملاء المحتملين بعد أول رسالة',
    introEn: 'Most service businesses respond to the first inquiry. Very few have a structured system for what happens next. That gap — between the first message and a closed deal — is where most leads are lost.',
    introAr: 'معظم شركات الخدمات تستجيب للاستفسار الأول. لكن القليل جداً منها يملك نظاماً منظماً لما يحدث بعد ذلك. هذه الفجوة — بين الرسالة الأولى وإغلاق الصفقة — هي حيث تُفقد معظم الفرص.',
    pointsEn: [
      'The follow-up window closes fast — most customers decide within 24 to 48 hours.',
      'Manual reminders fail because they depend on memory and goodwill, not systems.',
      'WhatsApp threads become unmanageable when volume exceeds 20 active leads.',
      'No CRM means no history — each conversation starts from zero.',
      'Teams lose accountability because there is no single source of truth.',
    ],
    pointsAr: [
      'نافذة المتابعة تُغلق بسرعة — معظم العملاء يتخذون قرارهم خلال 24 إلى 48 ساعة.',
      'التذكيرات اليدوية تفشل لأنها تعتمد على الذاكرة وليس على أنظمة.',
      'محادثات الواتساب تصبح غير قابلة للإدارة عند تجاوز 20 عميلاً نشطاً.',
      'غياب CRM يعني غياب التاريخ — كل محادثة تبدأ من الصفر.',
      'الفرق تفقد المساءلة لأنه لا يوجد مصدر موحد للحقيقة.',
    ],
    perspectiveEn: 'At ENSDIM, we build follow-up systems that work automatically — capturing every lead, scheduling reminders, and ensuring nothing slips through. The result is a conversion process that does not depend on who remembered to reply.',
    perspectiveAr: 'في إنسديم، نبني أنظمة متابعة تعمل تلقائياً — تلتقط كل عميل محتمل، وتجدول التذكيرات، وتضمن عدم ضياع أي شيء. النتيجة هي عملية تحويل لا تعتمد على من تذكر الرد.',
  },
  'whatsapp-alone-not-enough': {
    titleEn: 'Why WhatsApp alone is not enough to manage customers',
    titleAr: 'لماذا الواتساب وحده لا يكفي لإدارة العملاء',
    introEn: 'WhatsApp is where customers are. But it was designed for personal communication, not business operations. Using it as your only customer management tool creates serious gaps.',
    introAr: 'الواتساب هو المكان الذي يتواجد فيه العملاء. لكنه صُمّم للتواصل الشخصي، وليس لعمليات الأعمال. استخدامه كأداة إدارة عملاء وحيدة يخلق فجوات خطيرة.',
    pointsEn: [
      'No tracking: you cannot see which leads are active, cold, or closed.',
      'No history: messages get buried and context is lost.',
      'No automation: every response is manual.',
      'No visibility for management: no reports, no summaries.',
      'No integration: WhatsApp sits alone from your calendar, CRM, or dashboard.',
    ],
    pointsAr: [
      'لا تتبع: لا يمكنك رؤية أي الفرص نشطة أو باردة أو مغلقة.',
      'لا تاريخ: الرسائل تُطمر ويضيع السياق.',
      'لا أتمتة: كل رد يدوي.',
      'لا رؤية للإدارة: لا تقارير، لا ملخصات.',
      'لا تكامل: الواتساب منفصل عن التقويم وCRM ولوحة التحكم.',
    ],
    perspectiveEn: 'ENSDIM integrates WhatsApp into structured workflows — so every message becomes a trackable interaction, and management has full visibility.',
    perspectiveAr: 'إنسديم تدمج الواتساب في سير عمل منظمة — حتى تصبح كل رسالة تفاعلاً قابلاً للتتبع، وتحصل الإدارة على رؤية كاملة.',
  },
  'crm-vs-manual-follow-up': {
    titleEn: 'CRM vs manual follow-up: what growing businesses should know',
    titleAr: 'CRM مقابل المتابعة اليدوية: ما تحتاج معرفته كشركة نامية',
    introEn: 'Manual follow-up works at 10 leads. It breaks at 50. A CRM system is not just software — it is the difference between a business that scales and one that stays stuck.',
    introAr: 'المتابعة اليدوية تنجح مع 10 عملاء. تنهار مع 50. نظام CRM ليس مجرد برنامج — إنه الفرق بين شركة تتوسع وأخرى تبقى عالقة.',
    pointsEn: [
      'Manual follow-up depends entirely on individuals — when they are busy, leads wait.',
      'CRM systems create accountability and visibility across the entire team.',
      'Automation inside a CRM handles routine outreach so the team focuses on quality conversations.',
      'Data history helps you understand what works and what does not.',
      'The right CRM for your business is the one your team actually uses.',
    ],
    pointsAr: [
      'المتابعة اليدوية تعتمد كلياً على الأفراد — حين يكونون مشغولين، ينتظر العملاء.',
      'أنظمة CRM تخلق مساءلة ورؤية عبر الفريق بأكمله.',
      'الأتمتة داخل CRM تتولى التواصل الروتيني حتى يركز الفريق على المحادثات القيّمة.',
      'تاريخ البيانات يساعدك على فهم ما ينجح وما لا ينجح.',
      'أفضل CRM لعملك هو الذي يستخدمه فريقك فعلاً.',
    ],
    perspectiveEn: 'ENSDIM builds CRM systems configured around your specific business flow — not generic out-of-the-box tools that require your team to adapt to them.',
    perspectiveAr: 'إنسديم تبني أنظمة CRM مُعدّة وفق سير عملك التجاري الخاص — وليس أدوات جاهزة تطلب من فريقك التكيف معها.',
  },
};

const defaultArticle = {
  titleEn: 'Article', titleAr: 'مقال',
  introEn: 'This article explores practical business operations insights.', introAr: 'يستعرض هذا المقال رؤى عملية حول عمليات الأعمال.',
  pointsEn: ['Coming soon.'], pointsAr: ['قريباً.'],
  perspectiveEn: 'Contact ENSDIM to learn more.', perspectiveAr: 'تواصل مع إنسديم لمعرفة المزيد.',
};

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ar = language === 'ar';
  const article = (slug && articles[slug]) ? articles[slug] : defaultArticle;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${ar ? article.titleAr : article.titleEn} | ENSDIM Blog`}
        description={ar ? article.introAr : article.introEn}
        keywords="AI automation blog Egypt, business operations articles, CRM insights Middle East"
        canonical={`/blog/${slug}`}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: ar ? article.titleAr : article.titleEn,
          description: ar ? article.introAr : article.introEn,
          author: { '@type': 'Organization', name: 'ENSDIM' },
          publisher: { '@type': 'Organization', name: 'ENSDIM', logo: { '@type': 'ImageObject', url: 'https://ensdim.com/ensdim-logo.png' } },
          url: `https://ensdim.com/blog/${slug}`,
          inLanguage: ar ? 'ar' : 'en',
        }}
      />
      <div className="bg-[#101418] pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-[#EEEAFE]/50 mb-6">
            <Link to="/" className="hover:text-[#EEEAFE] transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#EEEAFE] transition-colors">{ar ? 'المدونة' : 'Blog'}</Link>
            <span>/</span>
            <span className="text-[#EEEAFE]/80 truncate max-w-[200px]">{ar ? article.titleAr : article.titleEn}</span>
          </nav>
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#EEEAFE]/60 hover:text-[#EEEAFE] text-sm mb-8 transition-colors">
            <ArrowLeft size={14} />
            {ar ? 'العودة إلى المدونة' : 'Back to Blog'}
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
            {ar ? article.titleAr : article.titleEn}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-lg text-[#69717D] leading-relaxed mb-10">
          {ar ? article.introAr : article.introEn}
        </p>

        <h2 className="text-xl font-bold text-[#101418] mb-5">
          {ar ? 'النقاط الرئيسية' : 'Key points'}
        </h2>
        <ul className="space-y-4 mb-10">
          {(ar ? article.pointsAr : article.pointsEn).map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 bg-[#EEEAFE] text-[#6D5DF6] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-[#101418] leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>

        <div className="bg-[#EEEAFE] rounded-2xl p-6 mb-10">
          <p className="text-xs font-semibold text-[#6D5DF6] uppercase tracking-wider mb-2">
            {ar ? 'منظور إنسديم' : 'ENSDIM perspective'}
          </p>
          <p className="text-[#101418] leading-relaxed">
            {ar ? article.perspectiveAr : article.perspectiveEn}
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors font-medium"
          >
            {ar ? 'احجز استشارة' : 'Book Consultation'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
