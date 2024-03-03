import { cn } from "@/lib/utils";

const Footer = ({
  className,
}: React.HTMLAttributes<HTMLElement>): JSX.Element => {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://twitter.com/nrmnqdds"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              @nrmnqdds
            </a>
            . All rights reserved {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
