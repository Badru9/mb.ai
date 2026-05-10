export const Hero = () => {
  return (
    <section className='flex min-h-svh flex-col items-center justify-center px-4 pb-12 pt-24 sm:p-8'>
      <div className='flex w-full max-w-7xl flex-col items-center text-center'>
        <p className='mb-4 max-w-[18rem] text-[0.68rem] font-semibold uppercase leading-5 tracking-[0.22em] text-muted sm:max-w-none sm:text-sm sm:tracking-[0.45em]'>
          Frontend Developer · Fullstack Developer
        </p>

        <h1 className='text-[clamp(2.45rem,13vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.08em] sm:leading-[0.85]'>
          MOH BADRUJAMAN
        </h1>

        <div className='mt-6 max-w-4xl space-y-4 sm:mt-8'>
          <h2 className='text-balance text-xl font-semibold leading-snug tracking-[-0.03em] sm:text-4xl sm:leading-tight md:text-5xl'>
            Frontend-focused Fullstack Developer with 2+ years of professional
            experience.
          </h2>

          <p className='mx-auto max-w-3xl text-pretty text-sm leading-7 text-muted sm:text-lg sm:leading-8'>
            Building production web applications with ReactJS, Next.js,
            TypeScript, TailwindCSS, Laravel, and ExpressJS — from responsive UI
            implementation and API integration to booking flows, payment
            modules, reporting dashboards, and production bug resolution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
