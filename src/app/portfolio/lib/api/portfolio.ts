export interface Portfolio {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export async function getPortfolio(): Promise<Portfolio[]> {

  const res = await fetch(
    "http://localhost:3000/api/admin/portfolio",
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }


  return res.json();

}