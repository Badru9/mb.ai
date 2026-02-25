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
      <NavbarBrand>mb.ai</NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Link href='/'>Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/'>Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/'>Home</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
