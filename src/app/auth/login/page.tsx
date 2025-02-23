"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Login() {
  return (
    <section className="h-svh flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col items-center gap-10 max-w-sm md:max-w-2xl lg:max-w-4xl">
        <Card className="w-[450px] border-t-4 rounded-t-none border-t-primary-300">
          <CardHeader>
            <CardTitle className="text-red-700">Login</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 space-y-2">
            <CardTitle>Staff Authentication</CardTitle>
            <CardDescription>
              Login with your staff email account to continue.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-muted-foreground">
            <Button className="w-full bg-primary-500 hover:bg-primary-700 hover:cursor-pointer">
              Login with Google
            </Button>
            <span className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="mailto:todayscarolinianusc@gmail.com"
                className="underline hover:text-black"
              >
                Contact us
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
