import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

const team = [
  { name: 'Shenouda Z Zaki', en: 'CEO', ar: 'الرئيس التنفيذي', image: '/team/shenouda-zaki.jpg' },
  { name: 'Ahmed Elsayed', en: 'Project Manager', ar: 'مدير مشروع', image: '/team/ahmed-elsayed.jpg' },
  { name: 'Ahmed Omran', en: 'Business Developer', ar: 'مطور أعمال', image: '/team/ahmed-omran.jpg' },
  { name: 'Radwa Mustafa', en: 'Marketing', ar: 'تسويق', image: '/team/radwa-mustafa.jpg' },
  { name: 'Fouad Mamdouh', en: 'Data Engineer', ar: 'مهندس بيانات', image: '/team/fouad-mamdouh.jpg' },
  { name: 'Eng. Mina Magdy', en: 'Cyber Security', ar: 'أمن سيبراني', image: '/team/mina-magdy.jpg' },
  { name: 'Mahmoud Khater', en: 'AI Engineer', ar: 'مهندس ذكاء اصطناعي', image: '/team/mahmoud-khater.jpg' },
  { name: 'Beshoy Ashref', en: 'AI Automation Specialist', ar: 'متخصص أتمتة بالذكاء الاصطناعي', image: '/team/beshoy-ashref.jpg' },
  { name: 'Abdullah Badawy', en: 'Backend', ar: 'باك إند', image: '/team/abdullah-badawy.jpg' },
  { name: 'Aya Nour', en: 'Frontend', ar: 'فرونت إند', image: '/team/aya-nour.png' },
  { name: 'Maya Al-Hussein', en: 'Flutter', ar: 'Flutter', image: '/team/maya-alhussein.jpg' },
  { name: 'Ziad Salah', en: 'Flutter', ar: 'Flutter', image: '/team/ziad-salah.jpg' },
  { name: 'Shaimaa Elsayed', en: 'UI/UX', ar: 'UI/UX', image: '/team/shaimaa-elsayed.jpg' },
  { name: 'Ahmed Ragab', en: 'UI/UX', ar: 'UI/UX', image: '/team/ahmed-ragab.jpg' },
];

function initials(name: string) {
  const parts = name.replace(/^Eng\.\s*/i, '').split(' ').filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
}

function TeamCard({ member, ar }: { member: { name: string; en: string; ar: string; image?: string }; ar: boolean }) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#6D5DF6] hover:shadow-md transition-all duration-200 h-full">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-20 h-20 rounded-full object-cover flex-shrink-0 mb-3"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6D5DF6] to-[#3B2A78] flex items-center justify-center text-white text-base font-bold flex-shrink-0 mb-3">
          {initials(member.name)}
        </div>
      )}
      <p className="text-sm font-semibold text-[#101418] leading-snug">{member.name}</p>
      <p className="text-xs text-[#4F555E] mt-1">{ar ? member.ar : member.en}</p>
    </div>
  );
}

const coverageAreas = [
  { en: 'Delivery management', ar: 'إدارة التنفيذ' },
  { en: 'User experience', ar: 'تجربة المستخدم' },
  { en: 'Engineering and development', ar: 'الهندسة والتطوير' },
  { en: 'Data and dashboards', ar: 'البيانات ولوحات المتابعة' },
  { en: 'Security and permissions', ar: 'الأمان والصلاحيات' },
  { en: 'Automation and AI', ar: 'الأتمتة والذكاء الاصطناعي' },
  { en: 'Specialized advisory support when needed', ar: 'استشارات متخصصة عند الحاجة' },
];

export function TeamPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <>
      <SEO
        title={ar ? 'فريق إنسديم | الفريق الذي يحوّل الفهم إلى تكنولوجيا' : 'ENSDIM Team | The Team That Turns Understanding Into Technology'}
        description={ar
          ? 'وراء إنسديم فريق يعمل على فهم التحدي قبل بناء الحل. نجمع بين التفكير في البزنس، تجربة المستخدم، الهندسة، البيانات، الأمان، والذكاء الاصطناعي.'
          : 'Behind ENSDIM is a team that works to understand the challenge before building the solution. We bring together business thinking, user experience, engineering, data, security, and AI.'}
        canonical="/team"
        lang={ar ? 'ar' : 'en'}
      />

      {/* Hero */}
      <section className="pt-24 pb-14 sm:pt-32 sm:pb-20 relative overflow-hidden bg-[#0f0d19] text-white">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(59,42,120,0.22) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-xs text-white/50 flex items-center gap-1">
            <Link to="/" className="hover:text-white/80 transition-colors">{ar ? 'الرئيسية' : 'Home'}</Link>
            <span className="opacity-40">/</span>
            <Link to="/company" className="hover:text-white/80 transition-colors">{ar ? 'الشركة' : 'Company'}</Link>
            <span className="opacity-40">/</span>
            <span className="text-white/70 font-medium">{ar ? 'الفريق' : 'Team'}</span>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider bg-[#6D5DF6]/15 border border-[#6D5DF6]/20 text-[#EEEAFE]/80">
            {ar ? 'فريق إنسديم' : 'ENSDIM Team'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
            {ar ? 'الفريق الذي يحوّل الفهم إلى تكنولوجيا قابلة للاستخدام.' : 'The team that turns understanding into usable technology.'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3 text-[#EEEAFE]/75">
            {ar
              ? 'وراء إنسديم فريق يعمل على فهم التحدي قبل بناء الحل. نجمع بين التفكير في البزنس، تجربة المستخدم، الهندسة، البيانات، الأمان، والذكاء الاصطناعي لتحويل المشكلات التشغيلية والأفكار الرقمية إلى حلول واضحة قابلة للاستخدام والقياس.'
              : 'Behind ENSDIM is a team that works to understand the challenge before building the solution. We bring together business thinking, user experience, engineering, data, security, and artificial intelligence to turn operational problems and digital ideas into clear, usable, and measurable solutions.'}
          </p>
          <p className="text-sm text-[#EEEAFE]/55">
            {ar ? 'فهم أعمق. تنفيذ منظم. تكنولوجيا تخدم العائد.' : 'Deeper understanding. Organized delivery. Technology built for return.'}
          </p>
        </div>
      </section>

      {/* How we think as a team */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'لا نبني الحل من زاوية واحدة.' : 'We do not build from one angle only.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'كل مشروع في إنسديم يبدأ من فهم الواقع: ما الذي يحدث داخل العمل؟ أين يتردد العميل؟ أين تضيع المتابعة؟ وما الذي تحتاجه الإدارة لتتخذ قرارًا أوضح؟'
                : 'Every ENSDIM project starts by understanding what is really happening inside the business: where customers hesitate, where follow-up gets lost, and what leadership needs to make clearer decisions.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'بعد ذلك نربط بين المنتج، التصميم، الهندسة، البيانات، والأمان؛ حتى لا يكون الحل مجرد كود، بل تكنولوجيا تخدم التشغيل والعائد.'
                : 'Then we connect product, design, engineering, data, and security so the outcome is not just code, but technology that supports operations and return.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418]">
              {ar ? 'الفريق الذي يربط الفكرة بالتنفيذ.' : 'The team that connects ideas to execution.'}
            </h2>
          </ScrollReveal>

          {/* Leadership — alone in their own row */}
          <div className="grid grid-cols-2 max-w-sm sm:max-w-md mx-auto gap-4 mb-4">
            {team.slice(0, 2).map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.04}>
                <TeamCard member={member} ar={ar} />
              </ScrollReveal>
            ))}
          </div>

          {/* Rest of the team — 4 per row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {team.slice(2).map((member, i) => (
              <ScrollReveal key={member.name} delay={Math.min(i * 0.04, 0.4)}>
                <TeamCard member={member} ar={ar} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-xs text-[#4F555E]/80 max-w-2xl mx-auto text-center leading-relaxed">
              {ar
                ? 'لا نعرض كل الخبرات المرتبطة بكل مشروع داخل هذه الصفحة. حسب طبيعة المشروع، نستعين بخبرات واستشارات متخصصة في مجالات مثل علم السلوك، تجربة المستخدم، الأمن السيبراني، البنية التقنية، البيانات، أو النمو؛ عندما يكون وجودها مؤثرًا في جودة القرار ونتيجة التنفيذ.'
                : 'This page does not show every expertise involved in every project. Depending on the project, ENSDIM may involve specialized advisory expertise in areas such as behavioral science, user experience, cybersecurity, technical architecture, data, or growth when that expertise improves decision quality and execution outcomes.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How we cover expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'كل مشروع يحتاج تركيبة خبرات مختلفة.' : 'Every project needs a different mix of expertise.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-4">
              {ar
                ? 'لا نتعامل مع كل مشروع بنفس الفريق أو بنفس الأولويات. بعض المشاريع تحتاج تركيزًا أكبر على تجربة المستخدم، وبعضها يحتاج بيانات وأمان، وبعضها يحتاج أتمتة وذكاء اصطناعي، وبعضها يحتاج إدارة تنفيذ دقيقة أكثر من أي شيء آخر.'
                : 'We do not approach every project with the same team structure or priorities. Some projects need stronger focus on user experience, others need data and security, others need automation and AI, and others need sharper delivery management.'}
            </p>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-7">
              {ar
                ? 'لذلك نحدد تركيبة العمل حسب الهدف، المخاطر، حجم التنفيذ، وما يحتاجه العميل فعلًا؛ حتى لا يحصل على فريق أكبر من اللازم أو أقل مما يحتاجه المشروع.'
                : 'That is why we shape the working setup around the goal, risks, project size, and what the client truly needs.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {coverageAreas.map((area, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-[#EEEAFE] text-[#6D5DF6] rounded-full font-medium">
                  {ar ? area.ar : area.en}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Specialized expertise when needed */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101418] mb-5 leading-tight">
              {ar ? 'نوسّع دائرة الخبرة عندما يحتاج المشروع ذلك.' : 'We extend the expertise when the project needs it.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed">
              {ar
                ? 'بعض المشاريع تحتاج دعمًا متخصصًا بجانب الفريق الأساسي، سواء في فهم السلوك، تحسين تجربة المستخدم، مراجعة الأمان، بناء البيانات، أو قراءة فرص النمو. لذلك نحتفظ بنموذج عمل مرن يسمح بإضافة الخبرة المناسبة عندما يكون لها أثر واضح على جودة الحل ونتيجة المشروع.'
                : 'Some projects need specialized support beside the core team, whether in behavior, user experience improvement, security review, data design, or growth opportunities. We keep a flexible model that allows the right expertise to support the project when it clearly improves the quality of the solution and the project outcome.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Join ENSDIM */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101418] mb-3">
              {ar ? 'نبحث عن أشخاص يفكرون قبل أن ينفذوا.' : 'We look for people who think before they execute.'}
            </h2>
            <p className="text-sm text-[#4F555E] leading-relaxed mb-6">
              {ar
                ? 'نرحب بالمواهب التي تجمع بين الجدية، التعلم، الفضول، والقدرة على بناء حلول مفيدة فعلًا. إذا كنت ترى التكنولوجيا كطريقة لفهم البشر وتحسين العمل، فقد تكون إنسديم المكان المناسب لك.'
                : 'We welcome talent with seriousness, learning ability, curiosity, and the ability to build useful solutions. If you see technology as a way to understand people and improve work, ENSDIM may be the right place for you.'}
            </p>
            <Link to="/careers" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D5DF6] text-white rounded-xl hover:bg-[#5d4de6] transition-colors text-sm font-semibold">
              {ar ? 'استكشف فرص العمل' : 'Explore Careers'} <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-[#EEEAFE] border border-[#DDD8FB] rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#101418] mb-3">
            {ar ? 'تعرّف على طريقة إنسديم في بناء الحلول.' : 'Discover how ENSDIM builds solutions.'}
          </h2>
          <p className="text-sm text-[#4F555E] mb-6 max-w-xl mx-auto">
            {ar
              ? 'الفريق هو جزء من الصورة. الأهم هو الطريقة التي نستخدم بها خبراتنا لفهم التحدي، تصميم المسار، وبناء التكنولوجيا المناسبة.'
              : 'The team is part of the picture. What matters most is how we use our expertise to understand the challenge, design the path, and build the right technology.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/solutions" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D63A3A] text-white rounded-xl hover:bg-[#c23030] active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'استكشف الحلول' : 'Explore Solutions'} <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#6D5DF6]/30 text-[#3B2A78] hover:border-[#6D5DF6] hover:bg-white active:scale-[0.98] transition-all duration-200 text-sm font-semibold">
              {ar ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
