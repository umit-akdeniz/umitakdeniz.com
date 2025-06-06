import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">ÜA</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Ümit Akdeniz. Tüm hakları saklıdır.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/umit-akdeniz" 
            target="_blank" 
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}