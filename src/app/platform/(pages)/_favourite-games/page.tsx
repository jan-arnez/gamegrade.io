import getSession from "@/lib/getSession";

const FavouriteGames = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        You need to be logged in to access this content.
      </div>
    );
  }
  return <div>Add after there is bunch of games</div>;
};

export default FavouriteGames;
