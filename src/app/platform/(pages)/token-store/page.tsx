import purchaseTokens from "@/action/purchaseTokens";
import tokens100 from "@/assets/images/100-tokens.jpg";
import tokens1000 from "@/assets/images/1000-tokens.jpg";
import tokens250 from "@/assets/images/250-tokens.jpg";
import tokens500 from "@/assets/images/500-tokens.jpg";
import StatusButton from "@/components/global/status-button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";

const TokenStore = () => {
  return (
    <div className="container flex h-max w-full flex-col items-center justify-center gap-y-12 pb-6">
      <div className="text-4xl font-medium">Token Store</div>
      <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <TokenCard image={tokens100} price={10} tokensAmount={100} />
        <TokenCard image={tokens250} price={25} tokensAmount={250} />
        <TokenCard image={tokens500} price={35} tokensAmount={500} />
        <TokenCard image={tokens1000} price={60} tokensAmount={1000} />
      </div>
    </div>
  );
};

const TokenCard = ({
  tokensAmount,
  price,
  image,
}: {
  tokensAmount: number;
  price: number;
  image: StaticImageData;
}) => (
  <Card>
    <div className="relative aspect-square w-full overflow-hidden rounded-t-md bg-white/20">
      <Image src={image} alt="" fill className="object-cover" />
    </div>
    <CardHeader className="w-full text-center">
      <CardTitle>{tokensAmount} tokens</CardTitle>
    </CardHeader>
    <CardFooter>
      <form action={purchaseTokens} className="w-full">
        <Input type="hidden" name="tokens-amount" value={tokensAmount} />
        <Input type="hidden" name="price" value={price} />
        <StatusButton
          className="w-full"
          defaultText={`Purchase for ${price}€`}
          pendingText="Redirecting...."
        />
      </form>
    </CardFooter>
  </Card>
);

export default TokenStore;
