import { PrismaClient, Role } from "../generated/prisma-admin";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  const password = await bcrypt.hash(
    "Admin@123",
    10
  );

  const admin = await prisma.user.create({
    data:{
      name:"Super Admin",
      email:"admin@visualytes.com",
      password,
      role:Role.ADMIN
    }
  });


  console.log("Admin created:", admin);

}

main()
.then(()=>{
  prisma.$disconnect();
})
.catch((e)=>{
  console.log(e);
  prisma.$disconnect();
});