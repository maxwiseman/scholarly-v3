import { type Metadata } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
import { UnsplashImage } from "./image";
import { SignIn } from "./sign-in";

export const metadata: Metadata = {
  title: `Sign In - Scholarly`,
};

export default async function LoginPage(): Promise<React.ReactElement> {
  return (
    <div className="flex min-h-screen max-w-[100vw] flex-row">
      <div className="flex max-w-[100vw] grow flex-col items-center justify-center overflow-y-scroll rounded-lg p-8 lg:min-w-[500px]">
        <div className="flex min-h-max max-w-[400px] flex-col gap-0">
          <h1 className="mb-5 mt-0 text-4xl font-bold leading-tight">
            Welcome back to Scholarly
          </h1>
          <p className="text-muted-foreground">
            Let&lsquo;s get you signed in. Please enter your details. If you
            don&lsquo;t have an account, you can make one.
          </p>
        </div>
        <Tabs className="min-h-max w-[min(100%,400px)]" defaultValue="login">
          <TabsList className="mb-4 mt-4 w-[100%]">
            <TabsTrigger className="grow" value="login">
              Sign in
            </TabsTrigger>
            <TabsTrigger className="grow" value="signup">
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SignIn />
          </TabsContent>
          <TabsContent value="signup">
            <p>Sign up</p>
          </TabsContent>
        </Tabs>
      </div>
      <UnsplashImage className="relative hidden max-h-[100%] w-0 lg:block lg:w-[75vw]" />
    </div>
  );
}
