import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseStudyDetail from '@/components/case-studies/CaseStudyDetail';
import { getCaseStudyById, getCaseStudies } from '@/lib/mockData';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const caseStudies = getCaseStudies();
  return caseStudies.map((study) => ({
    id: study.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = getCaseStudyById(params.id);
  
  if (!caseStudy) {
    return {
      title: 'ケーススタディが見つかりません',
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.subtitle,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.subtitle,
      type: 'article',
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.lastUpdated,
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = getCaseStudyById(params.id);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        <CaseStudyDetail caseStudy={caseStudy} />
      </main>
      <Footer />
    </>
  );
}