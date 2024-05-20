import getSession from "@/lib/getSession";
import prisma from "@/prisma/db";
import DataForm from "./_components/data-form";

const DataSource = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        You need to be logged in to access this content.
      </div>
    );
  }

  const data = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      dataSource: true,
    },
  });

  return (
    <>
      <div className="container flex flex-col gap-y-6">
        <div className="text-4xl font-medium">Data Source</div>
        <DataForm user={user} dataSource={data?.dataSource!} />
      </div>
    </>
  );
};

export default DataSource;
