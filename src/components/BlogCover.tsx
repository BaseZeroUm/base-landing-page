import type { BlogAuthor } from "@/lib/blog-content";
const dotsBar = { url: "/dots-bar.png" };


interface BlogCoverProps {
  src: string;
  alt: string;
  category: string;
  author: BlogAuthor;
  size?: "card" | "hero";
  priority?: boolean;
}

export function BlogCover({
  src,
  alt,
  category,
  author,
  size = "card",
  priority = false,
}: BlogCoverProps) {
  const hero = size === "hero";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-ink ${
        hero ? "[aspect-ratio:16/9]" : "[aspect-ratio:4/3]"
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-contain p-3 sm:p-5"
      />

      {/* Barra estilo janela, sobreposta na capa */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-black/45 px-3 py-2 backdrop-blur sm:px-4">
        <img
          src={dotsBar.url}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-auto opacity-90 sm:h-4"
        />
        <span className="mx-auto text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/85 sm:text-[0.7rem]">
          {category}
        </span>
        <span aria-hidden="true" className="w-6 sm:w-8" />
      </div>


      {/* Autor */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/45 py-1 pl-1 pr-3 backdrop-blur sm:bottom-4 sm:left-4">
        <img
          src={author.avatar}
          alt={author.name}
          loading="lazy"
          className={`rounded-full border-2 border-white object-cover object-[center_22%] ${
            hero ? "size-11 sm:size-14" : "size-10 sm:size-11"
          }`}
        />
        <span className="text-xs font-bold text-white sm:text-sm">{author.name}</span>
      </div>
    </div>
  );
}
