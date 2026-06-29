import { Hero } from "@/components/sections/hero";
import { Trustbar } from "@/components/sections/trustbar";
import { Problem } from "@/components/sections/problem";
import { Transformation } from "@/components/sections/transformation";
import { Method } from "@/components/sections/method";
import { Differential } from "@/components/sections/differential";
import { AboutNil } from "@/components/sections/about-nil";
import { SocialProof } from "@/components/sections/social-proof";
import { ForWho } from "@/components/sections/for-who";
import { NotForWho } from "@/components/sections/not-for-who";
import { Results } from "@/components/sections/results";
import { Offer } from "@/components/sections/offer";
import { Bonus } from "@/components/sections/bonus";
import { Guarantee } from "@/components/sections/guarantee";
import { FAQ } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Trustbar />
      <Problem />
      <Transformation />
      <Method />
      <Differential />
      <AboutNil />
      <SocialProof />
      <ForWho />
      <NotForWho />
      <Results />
      <Offer />
      <Bonus />
      <Guarantee />
      <FAQ />
      <FinalCta />
      <Footer />
    </>
  );
}
