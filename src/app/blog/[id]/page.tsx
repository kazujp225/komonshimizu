import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPost from '@/components/blog/BlogPost';
import { getBlogPostById, getBlogPosts } from '@/lib/mockData';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostById(params.id);
  
  if (!post) {
    return {
      title: 'ブログ記事が見つかりません',
    };
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: [post.seo.focusKeyword, ...post.seo.targetKeywords, ...post.tags],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        <BlogPost post={post} />
      </main>
      <Footer />
    </>
  );
}