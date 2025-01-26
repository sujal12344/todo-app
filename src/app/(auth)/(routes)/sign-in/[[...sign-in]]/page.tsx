import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn afterSignOutUrl={'/sign-in'} afterSignInUrl={'/'} afterSignUpUrl={'/sign-in'}/>;
}
