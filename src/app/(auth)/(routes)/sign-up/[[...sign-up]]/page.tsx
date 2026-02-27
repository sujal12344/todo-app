import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      afterSignOutUrl={"/sign-in"}
      afterSignInUrl={"/"}
      afterSignUpUrl={"/sign-in"}
    />
  );
}
