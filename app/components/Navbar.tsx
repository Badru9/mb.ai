import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';

export default function NavbarComponent() {
  return (
    <Navbar maxWidth='full'>
      <NavbarBrand>
        <Link href='/'>mb.ai</Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Link href='/'>Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/projects'>Projects</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about'>About Me</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Signup</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color='primary'
            href='#'
            radius='full'
            className='text-white'
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
