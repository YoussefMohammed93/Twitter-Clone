import Image from "next/image";
import { SignInFlow } from "../types";
import React, { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import LoadingButton from "@/components/ui/loading-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);

  const onPsswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setErr("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="auth-card w-full h-full p-8">
      <CardHeader className="px-0 pt-0 flex flex-col items-center">
        <Image src="/twitter.png" alt="twitter" width={48} height={48} />
        <CardTitle className="text-xl">Log in to Twitter</CardTitle>
      </CardHeader>
      {!!err && (
        <div className="flex items-center gap-x-2 rounded-md text-sm text-destructive mb-5 bg-destructive/15 p-3">
          <TriangleAlert className="size-5 mr-1" />
          <p className="mt-1">{err}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPsswordSignIn} className="space-y-3">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
            required
            className="focus:border-[#1a8cd8]"
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
            required
            className="focus:border-[#1a8cd8]"
          />
          <LoadingButton
            type="submit"
            size="lg"
            loading={pending}
            disabled={pending}
            className="w-full bg-[#1a8cd8]/80 hover:bg-[#1a8cd8]/90"
          >
            Log in
          </LoadingButton>
        </form>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?
          <span>
            <button
              onClick={() => setState("signUp")}
              className="text-sky-700 hover:underline ml-2"
            >
              Sign up
            </button>
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
