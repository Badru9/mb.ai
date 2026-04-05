export default function About() {
  return (
    <section
      id='about'
      className='w-full flex flex-col items-center justify-center p-10 gap-5'
    >
      <h2 className='text-3xl font-bold tracking-tighter uppercase font-lexend'>
        [ Get To Know Me ]
      </h2>
      <p className='w-1/2 text-justify'>
        I&apos;m a Fullstack Developer with roughly 2 years of experience
        working across the stack — from building user interfaces with React and
        Next.js to setting up APIs and backend logic with Node.js, Express, and
        Laravel. I enjoy figuring out how things work, writing clean code, and
        shipping products that actually solve problems.
      </p>
    </section>
  );
}
